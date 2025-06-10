import { Settings } from '@/types';
import Comment from './Comment';
import Bars from '@/assets/bars.svg?react';
import type { Channel, DMChannel } from 'server/channels';
import { Session } from 'server/sessions';
import { useEffect, useRef } from 'react';
import Chatbox from './Chatbox';

interface Props {
  isDm: boolean;
  user: Session;
  users: Partial<Session>[];
  channel?: Channel | DMChannel;
  settings: Settings;
  setSettings: React.Dispatch<React.SetStateAction<Settings>>;
  sendMessage: (to: string, message: string) => void;
}

export default function Chatroom({
  isDm,
  user,
  users,
  channel,
  settings,
  setSettings,
  sendMessage,
}: Props) {
  const textAreaRef = useRef<HTMLTextAreaElement>(null);
  const messageEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    messageEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [channel?.messages]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Enter') {
        e.preventDefault();
        const message = textAreaRef.current?.value;
        if (message && message.length > 0 && channel) {
          sendMessage(channel.name, message);
          textAreaRef.current.value = '';
        }
      }
    };
    document.addEventListener('keydown', handleKeyDown);

    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [channel, sendMessage]);

  const messageReceiver = () => {
    if (isDm && channel && 'participants' in channel) {
      const to = channel.participants.find(
        p => p.userId !== user.userId
      )?.userId;
      if (to) return to;
    } else if (!isDm && channel) {
      return channel.name;
    }
  };

  return (
    <div
      className={`bg-discord-darker flex-[3] h-[calc(100vh-2rem)] text-discord-gray border-t-1 border-discord-dark flex flex-col`}
    >
      <div className={`border-discord-dark border-b-1 max-w-full min-h-8 ml-4`}>
        <div className="flex flex-row gap-2 items-center align-middle">
          {settings.isMobile && (
            <Bars
              onClick={() =>
                setSettings({
                  ...settings,
                  sidebarOpen: !settings.sidebarOpen,
                })
              }
              className="h-6 w-6 fill-current text-discord-white hover:text-discord-gray"
            />
          )}
          <span className="text-discord-white text-xl">
            <span className="text-2xl text-discord-gray">#</span>{' '}
            {channel && channel.name}
          </span>
        </div>
      </div>
      {channel && (
        <div className="flex-1 overflow-y-auto p-2 w-full break-words">
          {channel.messages.map(m => (
            <Comment
              key={m.id}
              users={users}
              message={m}
              isSystem={m.userId === 'system'}
              settings={settings}
            ></Comment>
          ))}
          <div ref={messageEndRef} />
        </div>
      )}
      {channel && (
        <Chatbox onSubmit={sendMessage} to={messageReceiver()}></Chatbox>
      )}
    </div>
  );
}
