import React, { createContext, useState } from 'react';

interface AuthContextProps {
  clientId: number | null,
  setAuthStatus: (clientId?: number | null) => void
}

const AuthContext = createContext<AuthContextProps>({} as AuthContextProps);

export const AuthContextProvider: React.FC = ({ children }) => {
  const [clientId, setClientId] = useState<number | null>(null);

  const setAuthStatus = (clientId?: number | null) => {
    if (clientId) return setClientId(clientId);

    return setClientId(null);
  };

  return (
    <AuthContext.Provider value={{ clientId, setAuthStatus }}>
      { children }
    </AuthContext.Provider>
  );
};

export default AuthContext;
