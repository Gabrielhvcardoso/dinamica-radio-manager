import React from 'react';
import { AuthContextProvider } from './auth';
import { DataContextProvider } from './data';
import { MobileContextProvider } from './mobile';

const Context: React.FC = ({ children }) => {
  return (
    <AuthContextProvider>
      <MobileContextProvider>
        <DataContextProvider>
          { children }
        </DataContextProvider>
      </MobileContextProvider>
    </AuthContextProvider>
  );
};

export default Context;
