import { io } from 'socket.io-client';
import type { Socket } from 'socket.io-client';

const URL = 'http://localhost:8181';

export const socket: Socket = io(URL, {
  autoConnect: false,
});
