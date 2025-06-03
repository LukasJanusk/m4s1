import { useEffect, useRef, useState } from 'react';
import ServerLogo from './ServerLogo';
import CloseButton from './CloseButton';

interface Props {
  handleServerLeave: () => void;
}

export default function ServerToggle({ handleServerLeave }: Props) {
  const [isHovering, setIsHovering] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const serverRef = useRef<HTMLDivElement | null>(null);
  const modalRef = useRef<HTMLDivElement>(null);
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
  useEffect(() => {
    const adjustModalPosition = () => {
      const modal = modalRef.current;
      if (modal) {
        const rect = modal.getBoundingClientRect();
        if (rect.top < 0) {
          modal.style.top = `${Math.max(0, window.scrollY)}px`;
        }
      }
    };

    if (modalOpen) {
      adjustModalPosition();
    }
  }, [modalOpen]);
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (modalRef.current && !modalRef.current.contains(e.target as Node)) {
        setModalOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);
  return (
    <div
      className="h-10 flex gap-2 items-center flex-row"
      onClick={() => setModalOpen(prev => !prev)}
    >
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
      {modalOpen && (
        <div
          ref={modalRef}
          className=" flex flex-col absolute left-16 bg-discord-darker border-1 min-h-20 min-w-50 max-w-50 border-discord-dark-gray rounded-2xl h-fit w-fit z-1 items-center justify-center gap-2 p-2"
        >
          <div className="mt-4">Server Options placeholder</div>
          <CloseButton onClick={() => setModalOpen(false)}></CloseButton>
          <button
            onClick={handleServerLeave}
            className={` w-full mb-2 bg-discord-dark-red rounded-xl p-2  border-2  border-discord-darker-red hover:border-discord-red transform-border duration-200`}
          >
            Leave Server
          </button>
        </div>
      )}
    </div>
  );
}
