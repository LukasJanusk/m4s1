import type { Channel } from 'server/channels';
import SideBarControlls from './SidebarControlls/SidebarControlls';
import { Settings } from '@/types';
import ServerToggle from './ServerToggle/ServerToggle';
import { Session } from 'server/sessions';

interface Props {
  user: Session;
  channels: Channel[];
  settings: Settings;
  isConnected: boolean;
  setSettings: React.Dispatch<React.SetStateAction<Settings>>;
  handleLogout: () => void;
  handleChannelSelect: (index: number) => void;
  handleServerLeave: () => void;
}

export default function Sidebar({
  user,
  channels,
  settings,
  setSettings,
  isConnected,
  handleLogout,
  handleChannelSelect,
  handleServerLeave,
}: Props) {
  return (
    <div className="text-discord-white left-0 top-0 bg-discord-black min-w-96 h-[calc(100vh-2rem)] flex flex-col flex-[1]">
      <div className="flex min h-full">
        <div className="min-w-18 flex flex-col gap-3 items-center">
          <ServerToggle handleServerLeave={handleServerLeave} />
        </div>
        <div className="min-w-74 border-s-1 border-t-1 border-l-discord-dark border-t-discord-dark rounded-t-2xl rounded-r-none">
          {isConnected && (
            <div>
              <div className="flex flex-col self-start border-b-1 border-discord-dark min-h-8">
                <div className="pl-2 pt-2 pr-2">
                  <span className="text-xl">Channels</span>
                </div>
              </div>
              {channels.map((c, index) => (
                <div key={index} onClick={() => handleChannelSelect(index)}>
                  <span className="text-discord-gray text-2xl pl-2 pr-2">
                    {' '}
                    #
                  </span>{' '}
                  <span
                    className={`hover:text-discord-gray ${settings.isMobile ? 'text-2xl' : 'text-xl'}`}
                  >
                    {c.name}
                  </span>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
      <div className="bg-discord-darker min-h-20 border-1 border-discord-dark rounded-2xl m-2 flex items-center">
        <SideBarControlls
          user={user}
          isConnected={isConnected}
          settings={settings}
          setSettings={setSettings}
          handleLogout={handleLogout}
        ></SideBarControlls>
      </div>
    </div>
  );
}
