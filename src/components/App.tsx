import { useState, useEffect } from 'react';
import { socket } from '@/libs/socket';
import Sidebar from './Sidebar/Sidebar';
import Headbar from './Headbar';
import Chatroom from './Chatroom/Chatroom';
import { Settings } from '@/types';
import { Channel } from 'server/channels';
import { Message } from 'server/messages';
import LoginForm from './LoginForm';
import { Session } from 'server/sessions';
import { deleteSession, getSession, storeSession } from '@/storage';
import UserBar from './UserBar';

function App() {
  const [isConnected, setIsConnected] = useState<boolean>(socket.connected);
  const [user, setUser] = useState<Session>();
  const [selectedChannel, setSelectedChannel] = useState<number>(0);
  const [channels, setChannels] = useState<Channel[]>([]);
  const [users, setUsers] = useState<Partial<Session>[]>([]);
  const [settings, setSettings] = useState<Settings>({
    microphoneOn: true,
    headphonesOn: true,
    isMobile: true,
    sidebarOpen: false,
    showSystemMessages: true,
  });

  useEffect(() => {
    const onConnect = () => {
      setIsConnected(true);
    };
    const onDisconnect = () => {
      setUser(undefined);
      setIsConnected(false);
    };
    const onChannels = (c: Channel[]) => setChannels(c);
    const onUsers = (u: Session[]) => setUsers(u);
    const onSession = (s: Session) => {
      storeSession({
        sessionId: s.sessionId,
        username: s.username,
        avatar: s.avatar,
      });
      setUser(s);
    };
    const onMessageReceived = (channel: string, message: Message) => {
      setChannels(prev =>
        prev.map(c =>
          c.name === channel ? { ...c, messages: [...c.messages, message] } : c
        )
      );
    };
    const onUserDisconnect = (u: Partial<Session>) => {
      setUsers(prev =>
        prev.map(s => (s.userId === u.userId ? { ...s, connected: false } : s))
      );
    };
    const onUserConnect = (u: Partial<Session>) => {
      setUsers(prev =>
        prev.map(s => (s.userId === u.userId ? { ...s, connected: true } : s))
      );
    };
    const onUserJoin = (user: Session) => {
      const systemMessage = {
        id: `sys-${Date.now()}`,
        userId: 'system',
        username: user.username,
        message: `has joined the server`,
        timestamp: new Date().toISOString(),
      };
      setChannels(prev =>
        prev.map(c => {
          return c.name === 'welcome'
            ? { ...c, messages: [...c.messages, systemMessage] }
            : c;
        })
      );
    };
    const onUserLeave = (user: Session) => {
      const systemMessage = {
        id: `sys-${Date.now()}`,
        userId: 'system',
        username: user.username,
        message: `has left the server`,
        timestamp: new Date().toISOString(),
      };
      setChannels(prev =>
        prev.map(c => {
          return c.name === 'welcome'
            ? { ...c, messages: [...c.messages, systemMessage] }
            : c;
        })
      );
      setUsers(prev => prev.filter(s => s.userId !== user.userId));
    };

    socket.on('connect', onConnect);
    socket.on('disconnect', onDisconnect);
    socket.on('channels', onChannels);
    socket.on('message:channel', onMessageReceived);
    socket.on('users', onUsers);
    socket.on('session', onSession);
    socket.on('user:disconnect', onUserDisconnect);
    socket.on('user:connect', onUserConnect);
    socket.on('user:join', onUserJoin);
    socket.on('user:leave', onUserLeave);

    return () => {
      socket.off('connect', onConnect);
      socket.off('disconnect', onDisconnect);
      socket.off('channels', onChannels);
      socket.off('message:channel', onMessageReceived);
      socket.off('users', onUsers);
      socket.off('session', onSession);
      socket.off('user:join', onUserJoin);
      socket.off('user:disconnect', onUserDisconnect);
      socket.off('user:connect', onUserConnect);
      socket.off('user:leave', onUserLeave);
      socket.off('user:join', onUserJoin);
    };
  }, [setChannels, setUser, setUsers]);
  useEffect(() => {
    const handleResize = () => {
      setSettings(prev => ({
        ...prev,
        isMobile: window.innerWidth <= 768,
        sidebarOpen: prev.sidebarOpen ? true : window.innerWidth >= 768,
      }));
    };
    window.addEventListener('resize', handleResize);
    handleResize();
    return () => window.removeEventListener('resize', handleResize);
  }, []);
  const handleLogout = () => socket.disconnect();
  const handleSocketConnect = (username: string, avatar: string) => {
    const session = getSession();
    try {
      socket.auth = { username, avatar, sessionId: session?.sessionId };
      socket.connect();
    } catch (error) {
      alert(
        error instanceof Error
          ? `Server error occured: ${error.message}`
          : 'Unknown server error occured'
      );
      return;
    }
  };
  const handleChannelSelect = (index: number) => {
    setSelectedChannel(index);
    if (settings.isMobile)
      setSettings(prev => ({ ...prev, sidebarOpen: false }));
  };

  const handleSendMessage = (channel: string, message: string) => {
    socket.emit('message:channel:send', channel, message.trim());
  };

  const handleServerLeave = () => {
    socket.emit('user:leave');
    setIsConnected(false);
    setUser(undefined);
    deleteSession();
  };
  return user ? (
    <div>
      <Headbar
        name={'Discord'}
        logo={new URL('@/assets/discord-logo.png', import.meta.url).href}
      ></Headbar>
      <div className="flex max-h-[calc(100vh-2rem)]">
        {settings.sidebarOpen && (
          <Sidebar
            user={user}
            channels={channels}
            settings={settings}
            setSettings={setSettings}
            isConnected={isConnected}
            handleLogout={handleLogout}
            handleChannelSelect={handleChannelSelect}
            handleServerLeave={handleServerLeave}
          ></Sidebar>
        )}
        <Chatroom
          users={users}
          settings={settings}
          setSettings={setSettings}
          channel={channels[selectedChannel]}
          sendMessage={handleSendMessage}
        ></Chatroom>
        <UserBar users={users} isMobile={settings.isMobile}></UserBar>
      </div>
    </div>
  ) : (
    <div className=" bg-discord-black h-[100vh] flex flex-col items-center justify-center">
      <div className="bg-discord-darker rounded-2xl text-discord-white">
        <LoginForm onSubmit={handleSocketConnect}></LoginForm>
      </div>
    </div>
  );
}

export default App;
