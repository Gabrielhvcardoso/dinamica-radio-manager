import React from 'react';
import { ProgramContextProvider } from './programs';

const Context: React.FC = ({ children }) => {
  return (
    <ProgramContextProvider>
      { children }
    </ProgramContextProvider>
  );
}

export default Context;
