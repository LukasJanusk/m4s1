import { Settings } from '@/types';
import ChannelHeader from './ChannelHeader';
import { Channel } from 'server/channels';

interface Props {
  channels: Channel[];
  settings: Settings;
  onChannelSelect: (index: number) => void;
}
export default function ChannelList({
  channels,
  settings,
  onChannelSelect,
}: Props) {
  return (
    <div>
      <ChannelHeader name={`Channels`} />
      {channels.map((c, index) => (
        <div key={index} onClick={() => onChannelSelect(index)}>
          <span className="text-discord-gray text-2xl pl-2 pr-2"> #</span>{' '}
          <span
            className={`hover:text-discord-gray ${settings.isMobile ? 'text-2xl' : 'text-xl'}`}
          >
            {c.name}
          </span>
        </div>
      ))}
    </div>
  );
}
