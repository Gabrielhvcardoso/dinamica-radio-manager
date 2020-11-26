import React, { createContext, useEffect, useState } from 'react';

interface AuthContextProps {
  isLoading: boolean,
  clientId: number | null,
  setAuthStatus: (clientId?: number | null, persist?: boolean | null) => void
}

const AuthContext = createContext<AuthContextProps>({} as AuthContextProps);

export const AuthContextProvider: React.FC = ({ children }) => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [clientId, setClientId] = useState<number | null>(null);

  useEffect(() => {
    const local = localStorage.getItem('uid');
    const session = sessionStorage.getItem('uid');

    const uid = local || session;

    if (uid) {
      setClientId(parseInt(uid));
    }

    setIsLoading(false);
  }, []);

  const setAuthStatus = (clientId?: number | null, persist?: boolean | null) => {
    if (clientId) {
      setClientId(clientId);
      if (persist) {
        localStorage.setItem('uid', clientId.toString());
      } else {
        sessionStorage.setItem('uid', clientId.toString());
      }
    } else {
      setClientId(null);
      localStorage.removeItem('uid');
      sessionStorage.removeItem('uid');
    }
  };

  return (
    <AuthContext.Provider value={{ isLoading, clientId, setAuthStatus }}>
      { children }
    </AuthContext.Provider>
  );
};

export default AuthContext;
