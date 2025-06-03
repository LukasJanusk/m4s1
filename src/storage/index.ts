import { SessionStore } from '@/types';

export const storeSession = (session: SessionStore) => {
  try {
    localStorage.setItem('session', JSON.stringify(session));
    return session;
  } catch (error) {
    alert(
      `Failed to get sessionId${error instanceof Error ? `: ${error.message}` : ''}`
    );
    throw error;
  }
};

export const getSession = () => {
  try {
    const data = localStorage.getItem('session');
    if (data) {
      const session = JSON.parse(data);
      if (session) {
        return session as SessionStore;
      }
    }
  } catch (error) {
    alert(
      `Error occured getting session from storage ${error instanceof Error ? error.message : ''}`
    );
    return null;
  }
  return null;
};

export const deleteSession = () => {
  try {
    localStorage.removeItem('session');
  } catch (error) {
    alert(
      `Error occured:  ${error instanceof Error ? error.message : 'Failed to remove session from local sstorage'}`
    );
    return;
  }
};
