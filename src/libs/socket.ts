import { getSession } from '@/storage';
import { io } from 'socket.io-client';

const URL = 'http://localhost:8181';

const session = getSession();

export const socket = io(URL, {
  autoConnect: session ? true : false,
});
if (session) {
  socket.auth = { ...session };
}
