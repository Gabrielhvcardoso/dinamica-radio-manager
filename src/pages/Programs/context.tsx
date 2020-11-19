import React, { createContext, useContext, useState } from 'react';
import ProgramsContext from '../../context/programs';

import { Program } from '../../types/Program';

interface ContextTypes {
  programs: Array<Program>,
  selected: number | null,
  setSelected: (arg: number | null) => void,

  openCategory: boolean,
  setOpenCategory: (arg: boolean) => void
}

const ProgramsPageContext = createContext<ContextTypes>({} as ContextTypes);

export const ProgramsPageContextProvider: React.FC = ({ children }) => {
  const { programs } = useContext(ProgramsContext);
  const [selected, setSelected] = useState<number | null>(null);
  const [openCategory, setOpenCategory] = useState<boolean>(false);

  return (
    <ProgramsPageContext.Provider value={{ programs, selected, setSelected, openCategory, setOpenCategory }}>
      { children }
    </ProgramsPageContext.Provider>
  );
}

export default ProgramsPageContext;
