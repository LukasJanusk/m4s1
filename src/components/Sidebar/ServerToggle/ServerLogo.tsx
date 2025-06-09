import logo from '@/assets/discrod-server-logo.svg?url';
import classNames from 'classnames';

interface Props {
  imgUrl?: string;
  unread?: number;
  isActive?: boolean;
}

export default function ServerLogo({ imgUrl, unread, isActive }: Props) {
  const mainBoxStyles = classNames(
    `rounded-xl text-center hover:bg-discord-blurple transition-all duration-150`,
    isActive ? 'bg-discord-blurple' : 'bg-discord-darker'
  ).trim();

  const unreadStyles = classNames(
    `right-0 bottom-0 rounded-full w-5 h-5 absolute bg-discord-red`,
    ` border-2 border-discord-black text-xs font-bold`
  ).trim();

  return (
    <div className="relative h-full aspect-square ">
      <div className={mainBoxStyles}>
        {imgUrl ? (
          <img
            src={imgUrl}
            className="w-full h-full min-w-8 min-h-8 text-sm p-2.5"
            alt="logo"
          />
        ) : (
          <img src={logo} className="w-full h-full text-sm p-2.5" alt="dlogo" />
        )}
        {unread && unread > 0 && <div className={unreadStyles}>{unread}</div>}
      </div>
    </div>
  );
}
