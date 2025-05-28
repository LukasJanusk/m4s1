import type { Session } from './sessions.ts';
import generateRandomId from './utils.js';

export default {
  buildMessage: (session: Session, message: string) => {
    return {
      id: generateRandomId(),
      userId: session.userId,
      username: session.username,
      message,
    };
  },
};

export type Message = {
  id: string;
  userId: string;
  username: string;
  message: string;
};
