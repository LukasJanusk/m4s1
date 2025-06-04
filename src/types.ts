export type Settings = {
  microphoneOn: boolean;
  headphonesOn: boolean;
  isMobile: boolean;
  sidebarOpen: boolean;
  showSystemMessages: boolean;
};

export type SessionStore = {
  sessionId: string;
  username: string;
  avatar: string;
};
