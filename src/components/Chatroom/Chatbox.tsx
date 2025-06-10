import { useEffect, useRef } from 'react';
interface Props {
  to?: string;
  onSubmit: (to: string, message: string) => void;
}
export default function Chatbox({ onSubmit, to }: Props) {
  const textAreaRef = useRef<HTMLTextAreaElement>(null);
  const handleCommentSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!to) return;
    const target = event.target as typeof event.target & {
      message: { value: string };
    };
    const message = target.message.value.trim();
    if (message) {
      onSubmit(to, message);
      target.message.value = '';
    }
  };

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!to) return;
      if (e.key === 'Enter') {
        e.preventDefault();
        const message = textAreaRef.current?.value;
        if (message && message.length > 0) {
          onSubmit(to, message);
          textAreaRef.current.value = '';
        }
      }
    };
    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  });

  return (
    <form
      onSubmit={handleCommentSubmit}
      className={`
        relative bg-discord-dark border border-discord-dark rounded-2xl p-2 m-4 min-h-20 flex items-center`}
    >
      <textarea
        ref={textAreaRef}
        name="message"
        className={`
          bg-transparent w-full text-white outline-none focus:outline-none focus:ring-0 pr-10 resize-none overflow-y-auto`}
        rows={3}
      />
      <button
        className={`absolute right-0 top-0 h-full w-12 hover:bg-discord-dark-gray px-2 py-1 rounded rounded-r-2xl hover:text-discord-white`}
        type="submit"
      >
        {'→'}
      </button>
    </form>
  );
}
