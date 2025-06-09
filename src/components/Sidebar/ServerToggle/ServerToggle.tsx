import { useEffect, useRef, useState } from 'react';
import ServerLogo from './ServerLogo';
import CloseButton from '@/components/Reusable/CloseButton';
import classNames from 'classnames';

interface Props {
  handleServerLeave: () => void;
  onServerSelect: () => void;
  isActive: boolean;
}

export default function ServerToggle({
  handleServerLeave,
  onServerSelect,
  isActive,
}: Props) {
  const [isHovering, setIsHovering] = useState(false);
  const [settingsOpen, setSettingsOpen] = useState(false);
  const serverRef = useRef<HTMLDivElement | null>(null);
  const modalRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const node = serverRef.current;
    if (!node) return;

    const handleEnter = () => {
      setIsHovering(true);
    };
    const handleLeave = () => setIsHovering(false);

    node.addEventListener('mouseenter', handleEnter);
    node.addEventListener('mouseleave', handleLeave);

    return () => {
      node.removeEventListener('mouseenter', handleEnter);
      node.removeEventListener('mouseleave', handleLeave);
    };
  }, []);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (modalRef.current && !modalRef.current.contains(e.target as Node)) {
        setSettingsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const baseSideBarStyles = `relative w-1 bg-discord-white transition-all duration-100 rounded-r-2xl`;
  const sideBarStyles = classNames(
    isHovering ? 'h-6' : 'h-2',
    isActive && 'h-8',
    baseSideBarStyles
  );

  return (
    <div className="h-10 flex gap-2 items-center flex-row">
      <div>
        <div className={sideBarStyles}></div>
      </div>
      <div
        ref={serverRef}
        onClick={() => {
          onServerSelect();
        }}
        className="aspect-square w-1/2 "
      >
        <ServerLogo
          imgUrl={new URL('@/assets/turing-logo.png', import.meta.url).href}
        ></ServerLogo>
      </div>
      {settingsOpen && (
        <div
          ref={modalRef}
          className="flex flex-col absolute left-16 bg-discord-darker border-1 min-h-20 min-w-50 max-w-50 border-discord-dark-gray rounded-2xl h-fit w-fit z-1 items-center justify-center gap-2 p-2"
        >
          <CloseButton onClick={() => setSettingsOpen(false)}></CloseButton>
          <div className="mt-4">Server options placeholder</div>
          <button
            onClick={handleServerLeave}
            className={`w-full mb-2 bg-discord-dark-red rounded-xl p-2  border-2  border-discord-darker-red hover:border-discord-red transform-border duration-200`}
          >
            Leave Server
          </button>
        </div>
      )}
    </div>
  );
}
