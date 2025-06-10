import CloseButton from '@/components/Reusable/CloseButton';
import { useEffect, useRef } from 'react';

interface Props {
  isOpen: boolean;
  isMobile: boolean;
  onSubmit: (message: string) => void;
  onClose: () => void;
}
export default function DirectMessagePopUp({
  onSubmit,
  onClose,
  isOpen,
  isMobile,
}: Props) {
  const textAreaRef = useRef<HTMLTextAreaElement>(null);
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;
    const formData = new FormData(form);
    const message = formData.get('message') as string;
    if (message && message.trim().length > 0) onSubmit(message.trim());
  };
  const modalRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (modalRef.current && !modalRef.current.contains(e.target as Node)) {
        onClose();
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [onClose]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Enter') {
        e.preventDefault();
        const message = textAreaRef.current?.value;
        if (message && message.length > 0) {
          onSubmit(message);
          textAreaRef.current.value = '';
        }
      }
    };
    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  });
  return (
    isOpen && (
      <div
        ref={modalRef}
        className={`
        ${isMobile ? 'min-w-[90vw]' : 'min-w-90'}
        absolute
        left-1/2 top-1/2
        transform
        -translate-x-1/2
        -translate-y-1/2
        min-h-40 flex flex-col
      bg-discord-darker
        border-1
        max-w-screen
      border-discord-dark-gray rounded-2xl h-fit w-fit z-1 gap-2 p-2
        transition-all duration-150`}
      >
        <CloseButton onClick={onClose} />

        <form onSubmit={handleSubmit} className="mt-4 h-40 flex flex-col gap-6">
          <textarea
            ref={textAreaRef}
            name="message"
            className={`
              bg-discord-dark
              rounded-2xl w-full
              p-2
              pr-10
              text-white outline-none
              focus:outline-none
              focus:ring-0
              resize-none
              overflow-y-auto`}
            rows={3}
          />
          <button
            type="submit"
            className="bg-discord-blurple border-2 border-discord-light w-full h-10 rounded-xl hover:border-discord-green transform-border duration-200"
          >
            Direct message →
          </button>
        </form>
      </div>
    )
  );
}
