import { Settings } from '@/types';
import { useState } from 'react';
import MicrophoneOff from '@/assets/microphone-off.svg?react';
import MicrophoneOn from '@/assets/microphone.svg?react';
import HeadphonesOff from '@/assets/headphones-off.svg?react';
import Headphones from '@/assets/headphones.svg?react';

interface Props {
  settings: Settings;
  setSettings: React.Dispatch<React.SetStateAction<Settings>>;
}

export default function Widgets({ settings, setSettings }: Props) {
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
  const [optionsOpen, setOptionsOpen] = useState(true);
  return (
    <div className="flex-[1] flex flex-row justify-center items-center gap-2 mr-2 ">
      {settings.headphonesOn ? (
        <div className="rounded-md hover:bg-discord-dark">
          <Headphones
            className={`h-7 w-7 p-1 transition-transform duration-500 hover:rotate-15
                 fill-current text-discord-gray`}
            onClick={setHeadphonesOn}
          />
        </div>
      ) : (
        <div className="rounded-md bg-discord-darker-red hover:bg-discord-dark-red">
          <HeadphonesOff
            onClick={setHeadphonesOn}
            className="h-7 w-7 p-1 transition-transform duration-500 hover:rotate-15 rounded-md  text-discord-red"
          />
        </div>
      )}
      {settings.microphoneOn ? (
        <div className="rounded-md hover:bg-discord-dark">
          <MicrophoneOn
            onClick={setMicrophoneOn}
            className="h-7 w-7 p-1 ransition-transform duration-500 hover:rotate-15 rounded-md hover:bg-discord-dark text-discord-gray fill-current"
          />
        </div>
      ) : (
        <div className="rounded-md bg-discord-darker-red hover:bg-discord-dark-red">
          <MicrophoneOff
            onClick={setMicrophoneOn}
            className="h-7 w-7 p-1 transition-transform duration-500 hover:rotate-15 rounded-md text-discord-red"
          />
        </div>
      )}
      <div className=" hover:bg-discord-dark rounded">
        <img
          onClick={() => setOptionsOpen(prev => !prev)}
          className="h-7 w-7 p-1 rounded transition-transform duration-500 hover:rotate-120"
          src="src/assets/gear.svg"
          alt="options"
        ></img>
      </div>
    </div>
  );
}
