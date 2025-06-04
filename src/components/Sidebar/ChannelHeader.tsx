interface Props {
  name: string;
}
export default function ChannelHeader({ name }: Props) {
  return (
    <div className="flex flex-col self-start border-b-1 border-discord-dark min-h-8">
      <div className="pl-2 pt-2 pr-2">
        <span className="text-xl">{name}</span>
      </div>
    </div>
  );
}
