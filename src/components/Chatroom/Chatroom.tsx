import { Settings } from '@/types';
import Comment from './Comment';
import Bars from '@/assets/bars.svg?react';
import { Channel } from 'server/channels';
import { Session } from 'server/sessions';
import { useEffect, useRef } from 'react';

interface Props {
  users: Partial<Session>[];
  channel: Channel;
  settings: Settings;
  setSettings: React.Dispatch<React.SetStateAction<Settings>>;
  sendMessage: (channel: string, message: string) => void;
}

export default function Chatroom({
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
  }, [channel.messages]);
  const handleCommentSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const target = event.target as typeof event.target & {
      message: { value: string };
    };
    const message = target.message.value.trim();
    if (message) {
      sendMessage(channel.name, message);
      target.message.value = '';
    }
  };

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Enter') {
        e.preventDefault();
        const message = textAreaRef.current?.value;
        if (message && message.length > 0) {
          sendMessage(channel.name, message);
          textAreaRef.current.value = '';
        }
      }
    };
    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [channel.name, sendMessage]);
  return (
    <div className="bg-discord-darker flex-[3] h-[calc(100vh-2rem)] text-discord-gray border-t-1 border-discord-dark flex flex-col">
      <div className="border-discord-dark border-b-1 max-w-full min-h-8 ml-4">
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
      <form
        onSubmit={handleCommentSubmit}
        className="relative bg-discord-dark border border-discord-dark rounded-2xl p-2 m-4 min-h-20 flex items-center"
      >
        <textarea
          ref={textAreaRef}
          name="message"
          className="bg-transparent w-full text-white outline-none focus:outline-none focus:ring-0 pr-10 resize-none overflow-y-auto"
          rows={3}
        />
        <button
          className="absolute right-0 top-0 h-full w-12 hover:bg-discord-dark-gray px-2 py-1 rounded rounded-r-2xl hover:text-discord-white"
          type="submit"
        >
          {'→'}
        </button>
      </form>
    </div>
  );
}
