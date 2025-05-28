import type { Message } from './messages';

export default {
  initializeChannel: (name: string): Channel => {
    const channel = {
      name,
      messages: [],
    };

    return channel;
  },
};

export type Channel = {
  name: string;
  messages: Message[];
};
