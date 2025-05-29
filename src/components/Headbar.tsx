interface Props {
  logo: string;
  name: string;
}

export default function Headbar({ logo, name }: Props) {
  return (
    <div className="bg-discord-black text-center min-h-8 max-h-8 text-white flex justify-center">
      <img
        className="h-8 w-8 object-contain"
        src={logo}
        alt="header-logo"
      ></img>
      <h2 className="pt-0.5"> {name}</h2>
    </div>
  );
}
