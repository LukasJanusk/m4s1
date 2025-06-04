import { Settings } from '@/types';
import { useState, useEffect, useRef } from 'react';
import Gear from '@/assets/gear.svg?url';
import CloseButton from '../../Reusable/CloseButton';
import MircophoneToggle from '../MicrophoneToggle';
import HeadphonesToggle from '../HeadphonesToggle';
import Toggle from '@/components/Reusable/Toggle';

interface Props {
  settings: Settings;
  setSettings: React.Dispatch<React.SetStateAction<Settings>>;
  handleServerLeave: () => void;
}

export default function Widgets({
  settings,
  setSettings,
  handleServerLeave,
}: Props) {
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
  const setSystemMessage = () => {
    setSettings(prev => ({
      ...prev,
      showSystemMessages: !prev.showSystemMessages,
    }));
  };
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
          className=" flex flex-col absolute left-44 bottom-24 bg-discord-darker border-1 min-h-20 min-w-50 max-w-60 border-discord-dark-gray rounded-2xl h-fit w-fit z-1 items-center justify-center gap-4 p-2"
        >
          <CloseButton onClick={() => setOptionsOpen(false)} />
          <div className="mt-4 mb-2">
            <Toggle
              isOn={settings.showSystemMessages}
              onChange={setSystemMessage}
              name={'System messages'}
            />
            <button
              onClick={handleServerLeave}
              className={` w-full mb-2 mt-2 bg-discord-dark-red rounded-xl p-2  border-2  border-discord-darker-red hover:border-discord-red transform-border duration-200`}
            >
              Leave Server
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
