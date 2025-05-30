import { useState, useEffect } from 'react';
import { socket } from '@/libs/socket';
import Sidebar from './Sidebar';
import Headbar from './Headbar';
import Chatroom from './Chatroom';
import { Settings } from '@/types';
import { Channel } from 'server/channels';

function App() {
  const [isConnected, setIsConnected] = useState<boolean>(socket.connected);
  const [selectedChannel, setSelectedChannel] = useState<number | null>(null);
  const [channels, setChannels] = useState<Channel[]>([]);
  const [settings, setSettings] = useState<Settings>({
    microphoneOn: true,
    headphonesOn: true,
    isMobile: true,
    sidebarOpen: false,
  });

  useEffect(() => {
    const onConnect = () => {
      setIsConnected(true);
    };
    const onDisconnect = () => {
      setIsConnected(false);
    };
    const handleChannels = (data: Channel[]) => setChannels(data);

    socket.on('connect', onConnect);
    socket.on('disconnect', onDisconnect);
    socket.on('channels', handleChannels);

    return () => {
      socket.off('connect', onConnect);
      socket.off('disconnect', onDisconnect);
      socket.off('channels', handleChannels);
    };
  }, []);
  useEffect(() => {
    const handleResize = () => {
      setSettings(prev => ({
        ...prev,
        isMobile: window.innerWidth <= 768,
        sidebarOpen: prev.sidebarOpen ? true : window.innerWidth >= 768,
      }));
    };
    window.addEventListener('resize', handleResize);
    handleResize();
    return () => window.removeEventListener('resize', handleResize);
  }, []);
  const handleLogout = () => socket.disconnect();
  const handleSocketConnect = (username: string) => {
    socket.auth = { username };
    socket.connect();
  };

  return (
    <div>
      <Headbar name={'Corddis'} logo="src/assets/discord-logo.png"></Headbar>
      <div className="flex max-h-[calc(100vh-2rem)]">
        {settings.sidebarOpen && (
          <Sidebar
            channels={channels}
            settings={settings}
            setSettings={setSettings}
            isConnected={isConnected}
            handleLogin={handleSocketConnect}
            handleLogout={handleLogout}
          ></Sidebar>
        )}

        <Chatroom
          isConnected={isConnected}
          settings={settings}
          setSettings={setSettings}
        ></Chatroom>
      </div>
    </div>
  );
}

export default App;
