import classNames from 'classnames';

interface Props {
  isOn: boolean;
  onChange: () => void;
  name: string;
}

export default function Toggle({ isOn, onChange, name }: Props) {
  const boubleStyles = classNames(
    isOn ? 'translate-x-5' : '',
    `absolute top-0.5 left-0.5 w-4 h-4 bg-discord-white`,
    `rounded-full transition-transform duration-300`
  );
  const backgroundStyles = classNames(
    isOn ? 'bg-discord-green' : 'bg-discord-dark-gray',
    `w-10 h-5 rounded-full shadow-inner transition-colors duration-300`
  );

  return (
    <label
      htmlFor={`${name}-toggle`}
      className="flex items-center gap-2 cursor-pointer justify-between"
    >
      <span className="text-white">{name}</span>
      <div className="relative">
        <input
          id={`${name}-toggle`}
          type="checkbox"
          checked={isOn}
          onChange={onChange}
          className="sr-only"
        />
        <div className={backgroundStyles}></div>
        <div className={boubleStyles}></div>
      </div>
    </label>
  );
}
