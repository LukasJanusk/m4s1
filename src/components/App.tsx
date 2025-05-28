import { useState, useEffect } from 'react';
import { socket } from '@/libs/socket';

function App() {
  const [isConnected, setIsConnected] = useState(socket.connected);
  const handleSocketConnect = () =>
    isConnected ? socket.disconnect() : socket.connect();

  useEffect(() => {
    const onConnect = () => {
      setIsConnected(true);
    };
    const onDisconnect = () => {
      setIsConnected(false);
    };
    socket.on('connect', onConnect);
    socket.on('disconnect', onDisconnect);

    return () => {
      socket.off('connect', onConnect);
      socket.off('disconnect', onDisconnect);
    };
  }, []);

  return (
    <div>
      <p className="text-4xl font-bold">
        Connected: {isConnected ? 'Yes' : 'No'}
      </p>
      <div className="bg-discord-blurple text-black p-4 rounded">
        Discord Theme Example
      </div>
      <button
        className="text-2xl border-2 font-bold bg-amber-100 hover:bg-amber-200 rounded-md p-2"
        onClick={handleSocketConnect}
      >
        {isConnected ? 'Disconnect' : 'Connect'}
      </button>
    </div>
  );
}

export default App;
