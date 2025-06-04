import MicrophoneOn from '@/assets/microphone.svg?react';
import MicrophoneOff from '@/assets/microphone-off.svg?react';

interface Props {
  onClick: () => void;
  isActive: boolean;
}
export default function MircophoneToggle({ onClick, isActive }: Props) {
  return isActive ? (
    <div className="rounded-md hover:bg-discord-dark">
      <MicrophoneOn
        onClick={onClick}
        className="h-7 w-7 p-1 ransition-transform duration-500 hover:rotate-15 rounded-md hover:bg-discord-dark text-discord-gray fill-current"
      />
    </div>
  ) : (
    <div className="rounded-md bg-discord-darker-red hover:bg-discord-dark-red">
      <MicrophoneOff
        onClick={onClick}
        className="h-7 w-7 p-1 transition-transform duration-500 hover:rotate-15 rounded-md text-discord-red"
      />
    </div>
  );
}
