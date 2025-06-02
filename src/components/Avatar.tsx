interface Props {
  isConnected: boolean;
  avatar: string | undefined;
  showStatus: boolean;
  showIndicator: boolean;
  showName: boolean;
  name: string | undefined;
}

export default function Avatar({
  isConnected,
  avatar,
  name,
  showStatus = false,
  showIndicator = false,
  showName = false,
}: Props) {
  const status = () => {
    return isConnected ? 'bg-discord-green' : 'bg-discord-gray';
  };
  return (
    <div className="relative min-h-10 h-10 min-w-10 w-10 shrink-0">
      <div>
        {` `}
        <img
          className="w-full h-full rounded-full"
          src={avatar || 'src/assets/avatar-default.png'}
          alt="avatar"
        ></img>
        {showIndicator && (
          <div
            className={`absolute bottom-0 right-[-3px] ${status()} border-2 border-discord-darker h-4 w-4 rounded-full`}
          ></div>
        )}
        {showName && name && (
          <span className="text-discord-white absolute bottom-4 left-12 text-nowrap">
            {name.length < 18 ? name : `${name.slice(0, 15)}...`}
          </span>
        )}
        {showStatus && (
          <span className="absolute bottom-0 left-12 text-discord-gray text-sm">
            {isConnected ? 'Online' : 'Offline'}
          </span>
        )}
      </div>
    </div>
  );
}
