import React from 'react';
import { DataContextProvider } from './data';
import { MobileContextProvider } from './mobile';

const Context: React.FC = ({ children }) => {
  return (
    <MobileContextProvider>
      <DataContextProvider>
        { children }
      </DataContextProvider>
    </MobileContextProvider>
  );
}

export default Context;
