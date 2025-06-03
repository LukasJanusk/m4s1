import { Settings } from '@/types';
import { useState, useEffect, useRef } from 'react';
import Gear from '@/assets/gear.svg?url';
import CloseButton from './CloseButton';
import MircophoneToggle from './MicrophoneToggle';
import HeadphonesToggle from './HeadphonesToggle';

interface Props {
  settings: Settings;
  setSettings: React.Dispatch<React.SetStateAction<Settings>>;
}

export default function Widgets({ settings, setSettings }: Props) {
  const [optionsOpen, setOptionsOpen] = useState(false);
  const setHeadphonesOn = () =>
    setSettings((prev: Settings) => ({
      ...prev,
      headphonesOn: !prev.headphonesOn,
    }));
  const setMicrophoneOn = () =>
    setSettings((prev: Settings) => ({
      ...prev,
      microphoneOn: !prev.microphoneOn,
    }));

  const modalRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (modalRef.current && !modalRef.current.contains(e.target as Node)) {
        setOptionsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <div className="flex-[1] flex flex-row justify-center items-center gap-2 mr-2 ">
      <HeadphonesToggle
        isActive={settings.headphonesOn}
        onClick={setHeadphonesOn}
      ></HeadphonesToggle>
      <MircophoneToggle
        isActive={settings.microphoneOn}
        onClick={setMicrophoneOn}
      ></MircophoneToggle>
      <div className=" hover:bg-discord-dark rounded">
        <img
          onClick={() => setOptionsOpen(prev => !prev)}
          className="h-7 w-7 p-1 rounded transition-transform duration-500 hover:rotate-120"
          src={Gear}
          alt="options"
        ></img>
      </div>
      {optionsOpen && (
        <div
          ref={modalRef}
          className=" flex flex-col absolute left-44 bottom-24  bg-discord-darker border-1 min-h-20 min-w-50 max-w-50 border-discord-dark-gray rounded-2xl h-fit w-fit z-1 items-center justify-center gap-2 p-2"
        >
          <CloseButton onClick={() => setOptionsOpen(false)} />
          <div>This is options content</div>
        </div>
      )}
    </div>
  );
}
