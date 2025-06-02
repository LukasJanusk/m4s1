export const storeSession = (sessionId: string) => {
  try {
    localStorage.setItem('sessionId', sessionId);
    return sessionId;
  } catch (error) {
    alert(
      `Failed to get sessionId${error instanceof Error ? `: ${error.message}` : ''}`
    );
    throw error;
  }
};

export const getSession = () => {
  return localStorage.getItem('sessionId');
};
