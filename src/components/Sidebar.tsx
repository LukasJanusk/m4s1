import type { Channel } from 'server/channels';
import Avatar from './Avatar';
import { Settings } from '@/types';
import ServerToggle from './ServerToggle';

interface Props {
  channels: Channel[];
  settings: Settings;
  isConnected: boolean;
  setSettings: React.Dispatch<React.SetStateAction<Settings>>;
  handleLogin: (username: string) => void;
  handleLogout: () => void;
}

export default function Sidebar({
  channels,
  settings,
  setSettings,
  isConnected,
  handleLogin,
  handleLogout,
}: Props) {
  // const handleChannelSelect = index => {};
  return (
    <div className="text-discord-white left-0 top-0 bg-discord-black min-w-96 h-[calc(100vh-2rem)] flex flex-col flex-[1]">
      <div className="flex min h-full">
        <div className="min-w-18 flex flex-col gap-3 items-center">
          <ServerToggle />
        </div>
        <div className="min-w-74 border-s-1 border-t-1 border-l-discord-dark border-t-discord-dark rounded-t-2xl rounded-r-none">
          {isConnected && (
            <div>
              <div className="flex flex-col self-start border-b-1 border-discord-dark min-h-8">
                <select className="pl-2 pt-2 pr-2">
                  <option>Option1</option>
                  <option>Option2</option>
                  <option>Option3</option>
                  <option>Option4</option>
                </select>
              </div>
              {channels.map((c, index) => (
                <div key={index}>
                  <span className="text-discord-gray text-2xl pl-2 pr-2">
                    {' '}
                    #
                  </span>{' '}
                  <span className="hover:text-discord-gray">{c.name}</span>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
      <div className="bg-discord-darker min-h-20 border-1 border-discord-dark rounded-2xl m-2 flex items-center">
        <Avatar
          isConnected={isConnected}
          settings={settings}
          setSettings={setSettings}
          handleLogin={handleLogin}
          handleLogout={handleLogout}
        ></Avatar>
      </div>
    </div>
  );
}
