import { deleteSession, getSession } from '@/storage';
import { useState } from 'react';

interface Props {
  onSubmit: (username: string, avatar: string) => void;
}

export default function LoginForm({ onSubmit }: Props) {
  const [session, setSession] = useState(getSession());
  const avatars = [
    new URL('@/assets/chicken.png', import.meta.url).href,
    new URL('@/assets/gamer.png', import.meta.url).href,
    new URL('@/assets/girl.png', import.meta.url).href,
    new URL('@/assets/man.png', import.meta.url).href,
    new URL('@/assets/meerkat.png', import.meta.url).href,
    new URL('@/assets/panda.png', import.meta.url).href,
    new URL('@/assets/rabbit.png', import.meta.url).href,
    new URL('@/assets/woman.png', import.meta.url).href,
  ];
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (index !== null)
      onSubmit((e.target as HTMLFormElement).username.value, avatars[index]);
  };
  const [index, setIndex] = useState<number | null>(null);
  const handleAvatarSelect = (index: number) => {
    setIndex(index);
  };
  const handleMakeNewAccount = () => {
    deleteSession();
    setSession(null);
  };
  const handleReconnect = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(
      session ? session.username : '',
      session ? session.avatar : avatars[0]
    );
  };
  return (
    <div className="max-w-md">
      {session ? (
        <div>
          <form
            className="flex flex-col text-center m-2 w-90"
            onSubmit={handleReconnect}
          >
            <button
              onClick={handleMakeNewAccount}
              type="button"
              className="bg-discord-dark border-2 border-discord-dark-gray w-auto h-10 rounded-xl m-2 hover:border-discord-green transform-border  duration-200"
            >
              New user
            </button>
            <button
              type="submit"
              className="bg-discord-blurple border-2 border-discord-light w-auto h-10 rounded-xl m-2 hover:border-discord-green transform-border  duration-200"
            >
              Reconnect
            </button>
          </form>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="flex flex-col text-center m-2">
          <label htmlFor="username">Username</label>
          <input
            className="bg-discord-dark text-white border border-discord-gray rounded-md p-1 m-2 focus:outline-none focus:ring-2 focus:ring-discord-blurple"
            id="username"
            type="text"
            required
            max={30}
          ></input>

          <div>
            {' '}
            <h2 className="mb-4">Pick your Avatar</h2>
            <div className="flex flex-wrap flex-row justify-center items-center">
              {avatars.map((a, i) => (
                <button
                  className={`rounded-full border-4 ${index === i ? 'border-discord-green' : 'border-discord-dark'}`}
                  type="button"
                  key={i}
                  onClick={() => handleAvatarSelect(i)}
                >
                  <img className="w-16 h-16 rounded-full" src={a}></img>
                </button>
              ))}
            </div>
          </div>
          <button
            type="submit"
            className="bg-discord-blurple border-2 border-discord-light w-auto h-10 rounded-xl m-2 hover:border-discord-green transform-border  duration-200"
          >
            Join server →
          </button>
        </form>
      )}
    </div>
  );
}
