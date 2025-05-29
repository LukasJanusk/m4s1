export default function Comment({ children }) {
  return (
    <p className="bg-discord-mid-dark m-1 p-2 rounded text-white hover:bg-discord-dark">
      {children}
    </p>
  );
}
