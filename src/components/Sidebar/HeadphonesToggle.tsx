import HeadphonesOff from '@/assets/headphones-off.svg?react';
import Headphones from '@/assets/headphones.svg?react';

interface Props {
  onClick: () => void;
  isActive: boolean;
}
export default function HeadphonesToggle({ onClick, isActive }: Props) {
  return isActive ? (
    <div className="rounded-md hover:bg-discord-dark">
      <Headphones
        className={`h-7 w-7 p-1 transition-transform duration-500 hover:rotate-15
                 fill-current text-discord-gray`}
        onClick={onClick}
      />
    </div>
  ) : (
    <div className="rounded-md bg-discord-darker-red hover:bg-discord-dark-red">
      <HeadphonesOff
        onClick={onClick}
        className="h-7 w-7 p-1 transition-transform duration-500 hover:rotate-15 rounded-md  text-discord-red"
      />
    </div>
  );
}
