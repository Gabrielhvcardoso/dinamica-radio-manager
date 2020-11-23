import React from 'react';
import { ProgramContextProvider } from './programs';
import { MobileContextProvider } from './mobile';

const Context: React.FC = ({ children }) => {
  return (
    <MobileContextProvider>
      <ProgramContextProvider>
        { children }
      </ProgramContextProvider>
    </MobileContextProvider>
  );
}

export default Context;
