import React, { createContext, useState } from 'react';
import { Program } from '../types/Program';

interface ProgramContextTypes {
  programs: Array<Program>,
  setPrograms: (arg: Array<Program>) => void,
}

const ProgramContext = createContext<ProgramContextTypes>({} as ProgramContextTypes)

export const ProgramContextProvider: React.FC = ({ children }) => {
  const [programs, setPrograms] = useState<Array<Program>>([]);
  
  return (
    <ProgramContext.Provider value={{ programs, setPrograms }}>
      { children }
    </ProgramContext.Provider>
  );
}

export default ProgramContext;
