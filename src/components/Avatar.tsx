import { Settings } from '@/types';
import Widgets from './Widgets';
import { useEffect, useRef, useState } from 'react';
import LoginForm from './LoginForm';
import Close from '@/assets/close.svg?react';

interface Props {
  isConnected: boolean;
  settings: Settings;
  setSettings: React.Dispatch<React.SetStateAction<Settings>>;
  handleLogin: (username: string) => void;
  handleLogout: () => void;
}
export default function Avatar({
  isConnected,
  settings,
  setSettings,
  handleLogin,
  handleLogout,
}: Props) {
  const status = () => {
    return isConnected ? 'bg-discord-green' : 'bg-discord-gray';
  };
  const [modalOpen, setModalOpen] = useState(false);
  const login = (username: string) => () => {
    setModalOpen(false);
    handleLogin(username);
  };
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
      {modalOpen &&
        (isConnected ? (
          <div
            ref={modalRef}
            className=" flex flex-col absolute left-2 bottom-24  bg-discord-dark border-1  border-discord-dark-gray rounded-2xl h-fit w-fit z-1 items-center justify-center gap-2 p-2"
          >
            <Close
              className="h-5 w-5 absolute right-2 top-2 text-discrd-dark-gray fill-current hover:text-discord-red"
              onClick={() => setModalOpen(() => false)}
            ></Close>
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
        ) : (
          <div
            ref={modalRef}
            className={`absolute left-2 bottom-24 bg-discord-dark border-1 border-discord-dark-gray rounded-2xl h-fit w-fit z-1`}
          >
            <Close
              className="h-5 w-5 absolute right-2 top-2 text-discrd-dark-gray fill-current hover:text-discord-red"
              onClick={() => setModalOpen(() => false)}
            ></Close>
            <LoginForm onSubmit={login}></LoginForm>
          </div>
        ))}
      <div
        onClick={() => {
          setModalOpen(prev => !prev);
        }}
        className="hover:bg-discord-dark flex-[2] rounded ml-2 rounded-l-full p-1"
      >
        <div className="relative max-h-10 max-w-10">
          <div>
            {` `}
            <img
              className="w-full h-full rounded-full"
              src="src/assets/avatar-default.png"
              alt="avatar"
            ></img>
            <div
              className={`absolute bottom-0 right-[-3px] ${status()} border-2 border-discord-darker h-4 w-4 rounded-full`}
            ></div>
            <span className="absolute bottom-0 left-12 text-discord-gray text-sm">
              {isConnected ? 'Online' : 'Offline'}
            </span>
          </div>
        </div>
      </div>
      <Widgets settings={settings} setSettings={setSettings}></Widgets>
    </div>
  );
}
