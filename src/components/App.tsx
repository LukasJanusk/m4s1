import { useState, useEffect } from 'react';
import { socket } from '@/libs/socket';
import Sidebar from './Sidebar';
import Headbar from './HeadBar';
import Chatroom from './Chatroom';
import { Settings } from '@/types';

function App() {
  const [isConnected, setIsConnected] = useState(socket.connected);
  const [settings, setSettings] = useState<Settings>({
    microphoneOn: true,
    headphonesOn: true,
  });
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
      <Headbar name={'Corddis'} logo="src/assets/discord-logo.png"></Headbar>
      <div className="flex">
        <Sidebar settings={settings} setSettings={setSettings}></Sidebar>
        <Chatroom></Chatroom>
      </div>
    </div>
  );
}

export default App;
