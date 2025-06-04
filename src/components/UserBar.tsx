import { Session } from 'server/sessions';
import Avatar from './Reusable/Avatar';

interface Props {
  users: Partial<Session>[];
  isMobile: boolean;
}
export default function UserBar({ users, isMobile }: Props) {
  return (
    <div className="flex flex-col md:flex-[1] md:items-start items-center flex-[0.5] min-w-14 bg-discord-black border-l-1 border-discord-dark overflow-y-auto gap-2">
      {users.map(u => (
        <div
          className="bg-discord-black hover:bg-discord-dark w-full rounded pt-1 pb-1 pl-3 pr-1"
          key={u.userId}
        >
          <Avatar
            avatar={u.avatar}
            isConnected={u.connected || false}
            showStatus={!isMobile ? true : false}
            showName={!isMobile ? true : false}
            name={u.username}
            showIndicator={true}
          ></Avatar>
        </div>
      ))}
    </div>
  );
}
