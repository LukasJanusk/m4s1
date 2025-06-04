import type { Message } from './messages';

export default {
  initializeChannel: (name: string): Channel => {
    const channel = {
      name,
      messages: [],
    };

    return channel;
  },
  initializeDmChannel: (
    name: string,
    participants: Participant[]
  ): DMChannel => {
    const dmChannel = {
      name,
      messages: [],
      participants,
    };

    return dmChannel;
  },
};

export type Channel = {
  name: string;
  messages: Message[];
};

export type DMChannel = {
  participants: Participant[];
  name: string;
  messages: Message[];
};

export type Participant = {
  username: string;
  userId: string;
};
