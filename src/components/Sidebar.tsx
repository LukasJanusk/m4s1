import type { Channel } from 'server/channels';
import Avatar from './Avatar';
import ServerLogo from './ServerLogo';
import { Settings } from '@/types';

interface Props {
  channels: Channel[];
  settings: Settings;
  setSettings: (settings: Settings) => void;
}

export default function Sidebar({ channels, settings, setSettings }: Props) {
  return (
    <div className="text-amber-50 left-0 top-0 bg-discord-black min-w-96 h-[calc(100vh-2rem)] flex flex-col flex-[1]">
      <div className="flex min h-full">
        <div className="min-w-18 flex flex-col gap-2 items-center">
          <ServerLogo />
          <ServerLogo />
        </div>
        <div className="min-w-74 border-s-1 border-t-1 border-l-discord-dark border-t-discord-dark rounded-t-2xl rounded-r-none">
          <div className="flex flex-col self-start border-b-1 border-discord-dark min-h-8">
            <select className="pl-2 pt-2 pr-2">
              <option>Option1</option>
              <option>Option2</option>
              <option>Option3</option>
              <option>Option4</option>
            </select>
          </div>
        </div>
      </div>
      <div className="bg-discord-darker min-h-20 border-1 border-discord-dark rounded-2xl m-2 flex items-center">
        <Avatar
          isOnline={true}
          settings={settings}
          setSettings={setSettings}
        ></Avatar>
      </div>
    </div>
  );
}
