interface Props {
  onSubmit: (username: string) => () => void;
}

export default function LoginForm({ onSubmit }: Props) {
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit((e.target as HTMLFormElement).username.value)();
  };
  return (
    <div>
      <form onSubmit={handleSubmit} className="flex flex-col text-center m-2">
        <label htmlFor="username">Username</label>
        <input
          className="bg-discord-dark text-white border border-discord-gray rounded-md p-1 m-2 focus:outline-none focus:ring-2 focus:ring-discord-blurple"
          id="username"
          type="text"
          required
        ></input>
        <label htmlFor="password">Password</label>
        <input
          className="bg-discord-dark text-white border border-discord-gray rounded-md p-1 m-2 focus:outline-none focus:ring-2 focus:ring-discord-blurple"
          id="password"
          type="text"
          required
        ></input>
        <button
          type="submit"
          className="bg-discord-blurple border-2 border-discord-light w-auto h-10 rounded-xl m-2 hover:border-discord-green transform-border duration-200"
        >
          Login →
        </button>
      </form>
    </div>
  );
}
