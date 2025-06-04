/* eslint-disable no-undef */
import express from 'express';
import http from 'http';
import { Server, ExtendedError, Socket } from 'socket.io';
import generateRandomId from './utils.js';
import s, { Session } from './sessions.js';
import c, { DMChannel } from './channels.js';
import m from './messages.js';

interface CustomSocket extends Socket {
  sessionId?: string;
  userId?: string;
  username?: string;
  avatar?: string;
}
const app = express();

const server = http.createServer(app);
const port = process.env.PORT || 8181;

const io = new Server(server, {
  cors: {
    origin: [
      'http://localhost:5173',
      'http://localhost:4173',
      'https://piehost.com',
    ],
  },
});

const CHANNEL_NAMES = ['welcome', 'general', 'react', 'learners', 'casual'];
const WELCOME_CHANNEL = 'welcome';

const sessions = s.initializeStore();
const channels = CHANNEL_NAMES.map(channel => c.initializeChannel(channel));
const dmChannels: DMChannel[] = [];

// Custom middleware to prepare the session.
io.use((socket: CustomSocket, next: (err?: ExtendedError) => void) => {
  (async () => {
    const sessionId = socket.handshake.auth.sessionId;

    if (sessionId) {
      const session = sessions.getSessionById(sessionId);

      if (session) {
        socket.sessionId = sessionId;
        socket.userId = session.userId;
        socket.username = session.username;
        socket.avatar = session.avatar;

        next();
        return;
      }
    }

    const username =
      socket.handshake.auth.username || `anonymous_${generateRandomId(2)}`;
    const avatar =
      socket.handshake.auth.avatar || 'src/assets/avatar-default.png';
    socket.sessionId = generateRandomId();
    socket.userId = generateRandomId();
    socket.username = username;
    socket.avatar = avatar;

    next();
  })().catch(next);
});

io.on('connection', (socket: CustomSocket) => {
  const userSession = sessions.getSessionByUserId(socket.userId);

  const currentSession = {
    sessionId: socket.sessionId!,
    userId: socket.userId!,
    username: socket.username!,
    avatar: socket.avatar!,
    connected: true,
  };
  console.log('Session connected: ' + currentSession.sessionId);

  sessions.setSession(socket.sessionId, currentSession);
  socket.emit('session', currentSession);

  channels.forEach(channel => socket.join(channel.name));
  dmChannels.forEach(channel => {
    if (channel.participants.some(p => p.userId === socket.userId)) {
      socket.join(channel.name);
      socket.emit('DMChannel', channel);
    }
  });

  socket.join(currentSession.userId);

  if (!userSession) {
    // Announce when user joins the server for the first time
    socket.in(WELCOME_CHANNEL).emit('user:join', {
      userId: currentSession.userId,
      username: currentSession.username,
      avatar: currentSession.avatar,
      connected: true,
    });
  }

  socket.emit('channels', channels);
  const users = sessions.getAllUsers();
  socket.emit('users', users);
  socket.broadcast.emit('user:connect', {
    userId: currentSession.userId,
    username: currentSession.username,
    avatar: currentSession.avatar,
    connected: true,
  });
  socket.on('user:leave', () => {
    socket.in(WELCOME_CHANNEL).emit('user:leave', {
      userId: currentSession.userId,
      username: currentSession.username,
      avatar: currentSession.avatar,
      connected: false,
    });

    sessions.deleteSession(socket.sessionId!);
    socket.disconnect();
  });

  socket.on('message:channel:send', (channel: string, message: string) => {
    const registeredChannel = channels.find(it => it.name === channel);

    if (!registeredChannel) return;

    const builtMessage = m.buildMessage(
      currentSession as unknown as Session,
      message
    );

    registeredChannel.messages.push(builtMessage);

    socket.to(channel).emit('message:channel', channel, builtMessage);
    socket.emit('message:channel', channel, builtMessage); // Send to the sender as well
  });

  socket.on('message:user:send', (to: string, message: string) => {
    const sender = sessions.getSessionByUserId(socket.userId!);
    const receiver = sessions.getSessionByUserId(to);

    if (!sender || !receiver) return;
    const builtMessage = m.buildMessage(sender, message);
    let dmChannel = dmChannels.find(
      c =>
        c.participants.some(p => p.userId === socket.userId!) &&
        c.participants.some(p => p.userId === to)
    );
    if (!dmChannel) {
      dmChannel = c.initializeDmChannel(
        `${sender.username}, ${receiver.username}`,
        [
          { userId: socket.userId!, username: sender.username },
          { userId: to, username: receiver.username },
        ]
      );
      dmChannel.messages.push(builtMessage);
      dmChannels.push(dmChannel);
      io.to(to).socketsJoin(dmChannel.name);
      io.to(sender.userId).socketsJoin(dmChannel.name);
      socket.to(to).emit('DMChannel', dmChannel);
      socket.emit('DMChannel', dmChannel);
      return;
    }
    dmChannel.messages.push(builtMessage);
    socket.to(dmChannel.name).emit('dm', dmChannel.name, builtMessage);
    socket.emit('dm', dmChannel.name, builtMessage);
  });

  socket.on('disconnect', () => {
    const session = sessions.getSessionById(socket.sessionId!);

    if (!session) return;

    sessions.setSession(socket.sessionId, {
      ...session,
      connected: false,
    });

    socket.broadcast.emit('user:disconnect', {
      userId: session.userId,
      username: session.username,
      avatar: session.avatar,
      connected: false,
    });
  });
});

server.listen(port, () => {
  console.log('Server listening at port %d', port);
});
