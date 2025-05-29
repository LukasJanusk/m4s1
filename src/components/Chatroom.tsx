import Comment from './Comment';

export default function Chatroom() {
  return (
    <div className="bg-discord-darker flex-[3] h-[calc(100vh-2rem)] text-discord-gray border-t-1 border-discord-dark flex flex-col">
      <div className="border-discord-dark border-b-1 max-w-full min-h-8 ml-4">
        # ChatRoom header
      </div>
      <div className="flex-1 overflow-y-auto p-2">
        {' '}
        {Array.from({ length: 50 }).map((_, i) => (
          <Comment key={i}>
            Comment #{i + 1}: This is a placeholder comment for testing scroll
            and layout.
          </Comment>
        ))}
      </div>
      <form className="relative bg-discord-dark border border-discord-dark rounded-2xl p-2 m-4 min-h-20 flex items-center">
        <textarea
          className="bg-transparent w-full text-white outline-none focus:outline-none focus:ring-0 pr-10 resize-none overflow-y-auto"
          rows={3}
        />
        <button
          className="absolute right-0 top-0 h-full w-12 hover:bg-discord-dark-gray px-2 py-1 rounded rounded-r-2xl hover:text-discord-white"
          type="submit"
        >
          {'→'}
        </button>
      </form>
    </div>
  );
}
