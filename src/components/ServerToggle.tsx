import { useEffect, useRef, useState } from 'react';
import ServerLogo from './ServerLogo';

export default function ServerToggle() {
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
    <div className="h-10 flex gap-2 items-center flex-row">
      <div>
        <div
          className={`relative w-1 bg-discord-white transition-all duration-100 rounded-r-2xl ${
            isHovering ? 'h-6' : 'h-2'
          }`}
        ></div>
      </div>
      <div ref={serverRef} className="aspect-square w-1/2 ">
        <ServerLogo></ServerLogo>
      </div>
    </div>
  );
}
