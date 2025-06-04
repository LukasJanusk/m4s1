import { Session } from 'server/sessions';
import Avatar from '../Reusable/Avatar';
import { Message } from 'server/messages';
import { Settings } from '../../types';

interface Props {
  message: Message;
  users: Partial<Session>[];
  isSystem: boolean;
  settings: Settings;
}

export default function Comment({ message, users, isSystem, settings }: Props) {
  const getMessageUser = () => users.find(u => u.userId === message.userId);
  const getUserAvatar = () => {
    const user = getMessageUser();
    return user?.avatar;
  };
  return (
    <div className="flex items-center justify-center">
      {isSystem ? (
        settings.showSystemMessages && (
          <div className="mt-2 mb-2">
            <span className="text-discord-light font-bold">
              {message.username}
              {` `}
            </span>
            <span>{message.message}</span>
            {` `}
            <span>{new Date(message.timestamp).toLocaleString()}</span>
          </div>
        )
      ) : (
        <div className="w-full flex">
          <div className="mt-2">
            <Avatar
              isConnected={getMessageUser()?.connected || false}
              avatar={getUserAvatar()}
              showStatus={false}
              showName={false}
              name={undefined}
              showIndicator={getMessageUser() ? true : false}
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
      )}
    </div>
  );
}
