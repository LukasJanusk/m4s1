import Close from '@/assets/close.svg?react';

interface Props {
  onClick: () => void;
}
export default function CloseButton({ onClick }: Props) {
  return (
    <button
      onClick={e => {
        e.stopPropagation();
        onClick();
      }}
    >
      {' '}
      <Close className="h-5 w-5 absolute right-2 top-2  fill-current text-discord-gray hover:text-discord-red transition-all duration-150"></Close>
    </button>
  );
}
