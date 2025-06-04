import { useEffect, useRef, useState } from 'react';
import ServerLogo from '@/components/Sidebar/ServerToggle/ServerLogo';

interface Props {
  onClick: () => void;
  isActive: boolean;
}

export default function ServerToggle({ onClick, isActive }: Props) {
  const [isHovering, setIsHovering] = useState(false);
  const serverRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const node = serverRef.current;
    if (!node) return;

    const handleEnter = () => setIsHovering(true);
    const handleLeave = () => setIsHovering(false);

    node.addEventListener('mouseenter', handleEnter);
    node.addEventListener('mouseleave', handleLeave);

    return () => {
      node.removeEventListener('mouseenter', handleEnter);
      node.removeEventListener('mouseleave', handleLeave);
    };
  }, []);
  return (
    <div className="h-10 flex gap-2 items-center flex-row ">
      <div>
        <div
          className={`relative w-1 bg-discord-white transition-all duration-100 rounded-r-2xl ${
            isHovering ? 'h-6' : 'h-2'
          } ${isActive && 'h-8'}`}
        ></div>
      </div>
      <div ref={serverRef} onClick={onClick} className="aspect-square w-1/2">
        <ServerLogo isActive={isActive}></ServerLogo>
      </div>
    </div>
  );
}
