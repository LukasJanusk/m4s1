import { DMChannel } from 'server/channels';
import { Session } from 'server/sessions';
import Avatar from '../Reusable/Avatar';

interface Props {
  dmChannels: DMChannel[];
  users: Session[];
  user: Session;
  onDmChannelSelect: (index: number) => void;
}
export default function DMchannels({
  dmChannels,
  users,
  user,
  onDmChannelSelect,
}: Props) {
  const otherUser = (c: DMChannel) => {
    const participant = c.participants.find(p => p.userId !== user.userId);
    const foundUser = users.find(u => u.userId === participant?.userId);
    return foundUser;
  };
  return (
    dmChannels.length > 0 && (
      <div>
        {dmChannels.map((c, index) => {
          const user = otherUser(c);
          return (
            <div
              onClick={() => onDmChannelSelect(index)}
              key={c.name}
              className={`flex flex-col gap-2 m-2 bg-discord-darker p-2 border-discord-dark border-1 rounded-2xl`}
            >
              <Avatar
                isConnected={user?.connected}
                avatar={user?.avatar}
                showStatus={false}
                showIndicator={true}
                name={user?.username}
                showName={true}
              ></Avatar>
            </div>
          );
        })}
      </div>
    )
  );
}
