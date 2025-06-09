import { DMChannel } from 'server/channels';
import { Session } from 'server/sessions';
import Avatar from '../Reusable/Avatar';
import Trash from '@/assets/trash.svg?react';
import classNames from 'classnames';

interface Props {
  dmChannels: DMChannel[];
  selectedDmChannel: number;
  users: Session[];
  user: Session;
  onDmChannelSelect: (index: number) => void;
  handleDmChannelDelete: (index: number) => void;
}

export default function DMchannels({
  dmChannels,
  selectedDmChannel,
  users,
  user,
  onDmChannelSelect,
  handleDmChannelDelete,
}: Props) {
  const otherUser = (c: DMChannel) => {
    const participant = c.participants.find(p => p.userId !== user.userId);
    const foundUser = users.find(u => u.userId === participant?.userId);

    return foundUser;
  };

  const cardBaseStyles = `relative flex flex-row justify-between gap-2 m-2  p-2 border-1 rounded-2xl bg-discord-darker hover:bg-discord-dark-gray transition-all duration-200`;
  const trashButtonContainerStyles = `absolote right- hover:bg-discord-dark-red rounded-lg w-8 h-8 p-1`;
  const trashIconStyles = `w-full h-fit right-20 fill-current text-discord-gray hover:text-discord-red hover:rotate-10 transition-all duration-350`;

  return (
    dmChannels.length > 0 && (
      <div>
        {dmChannels.map((c, index) => {
          const user = otherUser(c);
          const cardClasses = classNames(cardBaseStyles, {
            'border-discord-light': selectedDmChannel === index,
            'border-discord-dark': selectedDmChannel !== index,
          });
          return (
            <div
              onClick={() => onDmChannelSelect(index)}
              key={c.name}
              className={cardClasses}
            >
              <Avatar
                isConnected={user?.connected}
                avatar={user?.avatar}
                showStatus={false}
                showIndicator={true}
                name={user?.username}
                showName={true}
              ></Avatar>
              {!user && (
                <div className={trashButtonContainerStyles}>
                  <button onClick={() => handleDmChannelDelete(index)}>
                    <Trash className={trashIconStyles} />
                  </button>
                </div>
              )}
            </div>
          );
        })}
      </div>
    )
  );
}
