import { Settings } from '@/types';
import { Session } from 'server/sessions';
import { useEffect, useRef, useState } from 'react';
import Avatar from '@/components/Reusable/Avatar';
import CloseButton from '@/components/Reusable/CloseButton';
import Widgets from './Widgets';

interface Props {
  user: Session;
  isConnected: boolean;
  settings: Settings;
  setSettings: React.Dispatch<React.SetStateAction<Settings>>;
  handleLogout: () => void;
}
export default function SidebarControlls({
  user,
  isConnected,
  settings,
  setSettings,
  handleLogout,
}: Props) {
  const [modalOpen, setModalOpen] = useState(false);
  const modalRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (modalRef.current && !modalRef.current.contains(e.target as Node)) {
        setModalOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);

    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <div className="flex w-full">
      {modalOpen && (
        <div
          ref={modalRef}
          className=" flex flex-col absolute left-2 bottom-24  bg-discord-darker border-1  border-discord-dark-gray rounded-2xl h-fit w-fit z-1 items-center justify-center gap-2 p-2"
        >
          <CloseButton onClick={() => setModalOpen(false)}></CloseButton>
          <div className="mt-4 p-2">
            Logged in settings and options placeholder
          </div>
          <button
            onClick={handleLogout}
            className={` w-full mb-2 bg-discord-dark-red rounded-xl p-2  border-2  border-discord-darker-red hover:border-discord-red transform-border duration-200`}
          >
            Logout
          </button>
        </div>
      )}
      <div
        onClick={() => {
          setModalOpen(prev => !prev);
        }}
        className="hover:bg-discord-dark flex-[2] rounded ml-2 rounded-l-full p-1"
      >
        <Avatar
          isConnected={isConnected}
          avatar={user.avatar}
          showStatus={true}
          showName={true}
          showIndicator={true}
          name={user.username}
        />
      </div>
      <Widgets settings={settings} setSettings={setSettings}></Widgets>
    </div>
  );
}
