import { Settings } from '@/types';
import Widgets from './Widgets';

interface Props {
  isOnline: boolean;
  settings: Settings;
  setSettings: (settings: Settings) => void;
}
export default function Avatar({ isOnline, settings, setSettings }: Props) {
  const status = () => {
    return isOnline ? 'bg-discord-green' : 'bg-discord-gray';
  };
  return (
    <div className="flex w-full">
      <div className="hover:bg-discord-dark flex-[2] rounded ml-2 rounded-l-full p-1">
        <div className="relative max-h-10 max-w-10">
          <div>
            {' '}
            <img
              className="w-full h-full rounded-full"
              src="src/assets/avatar-default.png"
              alt="avatar"
            ></img>
            <div
              className={`absolute bottom-0 right-[-3px] ${status()} border-2 border-discord-darker h-4 w-4 rounded-full`}
            ></div>
            <span className="absolute bottom-0 left-12 text-discord-gray text-sm">
              {isOnline ? 'Online' : 'Offline'}
            </span>
          </div>
        </div>
      </div>
      <Widgets settings={settings} setSettings={setSettings}></Widgets>
    </div>
  );
}
