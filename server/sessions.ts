export default {
  initializeStore: () => {
    const sessionStorage = new Map();

    function getSessionById(sessionId: string) {
      return sessionStorage.get(sessionId);
    }

    function getSessionByUserId(userId: string | undefined) {
      for (const session of sessionStorage.values()) {
        if (session.userId === userId) {
          return session;
        }
      }

      return null;
    }

    function getAllSessions() {
      return Array.from(sessionStorage.values());
    }

    function getAllUsers() {
      return getAllSessions().map(session => {
        return {
          userId: session.userId,
          username: session.username,
          connected: session.connected,
        };
      });
    }

    function setSession(sessionId?: string, session?: Session) {
      sessionStorage.set(sessionId, session);
    }

    function deleteSession(sessionId: string) {
      sessionStorage.delete(sessionId);
    }

    return {
      getSessionById,
      getSessionByUserId,
      getAllSessions,
      getAllUsers,
      setSession,
      deleteSession,
    };
  },
};
export type Session = {
  userId: string;
  username: string;
  connected: boolean;
};
