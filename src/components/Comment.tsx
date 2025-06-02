import { Session } from 'server/sessions';
import Avatar from './Avatar';
import { Message } from 'server/messages';

interface Props {
  message: Message;
  users: Partial<Session>[];
}

export default function Comment({ message, users }: Props) {
  const getMessageUser = () => users.find(u => u.userId === message.userId);
  const getUserAvatar = () => {
    const user = getMessageUser();
    return user?.avatar;
  };
  return (
    <div className="flex w-full">
      <div className="mt-2">
        <Avatar
          isConnected={getMessageUser()?.connected || false}
          avatar={getUserAvatar()}
          showStatus={false}
          showName={false}
          name={undefined}
          showIndicator={true}
        ></Avatar>
      </div>
      <div className="rounded-s-md hover:bg-discord-darker flex flex-col m-1 border-l-1 border-t-1 border-discord-dark-gray w-full">
        <div>
          <span className="p-2 font-bold text-discord-blurple">
            {message.username}
          </span>
          <span>{new Date(message.timestamp).toLocaleString()}</span>
        </div>
        <p className="p-2 text-white whitespace-pre-wrap break-words w-full min-w-0">
          {message.message}
        </p>
      </div>
    </div>
  );
}
