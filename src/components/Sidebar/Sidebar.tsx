import type { Channel, DMChannel } from 'server/channels';
import SideBarControlls from './SidebarControlls/SidebarControlls';
import { Settings } from '@/types';
import ServerToggle from './ServerToggle/ServerToggle';
import { Session } from 'server/sessions';
import ChannelList from './ChannelList';
import DMchannels from '../DircetMessages/DMChannels';
import DMToggle from '../DircetMessages/DMToggle';

interface Props {
  user: Session;
  users: Session[];
  channels: Channel[];
  dmChannels: DMChannel[];
  selectedDmChannel: number;
  settings: Settings;
  isConnected: boolean;
  dmActive: boolean;
  toggleDmActive: () => void;
  setSettings: React.Dispatch<React.SetStateAction<Settings>>;
  handleLogout: () => void;
  handleChannelSelect: (index: number) => void;
  handleDmChannelSelect: (index: number) => void;
  handleServerLeave: () => void;
  handleDmChannelDelete: (index: number) => void;
}

export default function Sidebar({
  user,
  users,
  channels,
  dmChannels,
  settings,
  dmActive,
  selectedDmChannel,
  toggleDmActive,
  setSettings,
  isConnected,
  handleLogout,
  handleChannelSelect,
  handleDmChannelSelect,
  handleServerLeave,
  handleDmChannelDelete,
}: Props) {
  const onServerSelect = () => {
    toggleDmActive();
  };
  return (
    <div className="text-discord-white left-0 top-0 bg-discord-black min-w-96 h-[calc(100vh-2rem)] flex flex-col flex-[1]">
      <div className="flex min h-full">
        <div className="min-w-18 flex flex-col gap-3 items-center">
          <DMToggle
            onClick={() => toggleDmActive()}
            isActive={dmActive}
          ></DMToggle>
          <ServerToggle
            handleServerLeave={handleServerLeave}
            onServerSelect={onServerSelect}
            isActive={!dmActive}
          />
        </div>
        <div className="min-w-74 border-s-1 border-t-1 border-l-discord-dark border-t-discord-dark rounded-t-2xl rounded-r-none">
          {dmActive ? (
            <DMchannels
              dmChannels={dmChannels}
              selectedDmChannel={selectedDmChannel}
              user={user}
              users={users}
              onDmChannelSelect={handleDmChannelSelect}
              handleDmChannelDelete={handleDmChannelDelete}
            ></DMchannels>
          ) : (
            <ChannelList
              channels={channels}
              settings={settings}
              onChannelSelect={handleChannelSelect}
            />
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
          handleServerLeave={handleServerLeave}
        ></SideBarControlls>
      </div>
    </div>
  );
}
