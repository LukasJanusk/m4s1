import logo from '@/assets/discrod-server-logo.svg?url';
import { useState } from 'react';

interface Props {
  imgUrl?: string;
  unread?: number;
}

export default function ServerLogo({ imgUrl, unread }: Props) {
  const defaultUrl = new URL(
    '@/assets/discord-server-logo.svg',
    import.meta.url
  ).href;
  console.log(defaultUrl);
  return (
    <div className="relative h-full aspect-square ">
      <div className=" bg-discord-darker rounded-xl text-center hover:bg-discord-blurple transition-all duration-150">
        {imgUrl ? (
          <img
            src={imgUrl}
            className="w-full h-full text-sm p-2.5"
            alt="logo"
          />
        ) : (
          <img src={logo} className="w-full h-full text-sm p-2.5" alt="dlogo" />
        )}
        {unread && unread > 0 && (
          <div className="right-0 bottom-0 rounded-full w-5 h-5 position absolute bg-discord-red border-2 border-discord-black text-xs font-bold">
            {unread}
          </div>
        )}
      </div>
    </div>
  );
}
