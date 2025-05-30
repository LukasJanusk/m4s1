import { Settings } from '@/types';
import Comment from './Comment';
import Bars from '@/assets/bars.svg?react';
import { Channel } from 'server/channels';

interface Props {
  isConnected: boolean;
  channel: Channel;
  settings: Settings;
  setSettings: React.Dispatch<React.SetStateAction<Settings>>;
}

export default function Chatroom({
  isConnected,
  settings,
  setSettings,
}: Props) {
  const handleCommentSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
  };
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
          <span className="text-discord-white">
            <span className="text-2xl text-discord-gray">#</span> ChatRoom
            header
          </span>
        </div>
      </div>
      <div className="flex-1 overflow-y-auto p-2">
        {' '}
        {Array.from({ length: 50 }).map((_, i) => (
          <Comment key={i}>
            Comment #{i + 1}: This is a placeholder comment for testing scroll
            and layout.
          </Comment>
        ))}
      </div>
      <form
        onSubmit={handleCommentSubmit}
        className="relative bg-discord-dark border border-discord-dark rounded-2xl p-2 m-4 min-h-20 flex items-center"
      >
        <textarea
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
