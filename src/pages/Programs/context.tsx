import React, { createContext, useContext, useMemo, useState } from 'react';
import ProgramsContext from '../../context/data';

import { Category } from '../../types/Category';
import { Program } from '../../types/Program';

interface ContextTypes {
  programs: Array<Program>,
  setPrograms: (arg: Array<Program>) => void,
  filteredPrograms: Array<Program>,

  selected: Program | null,
  setSelected: (arg: Program | null) => void,

  openCategory: boolean,
  setOpenCategory: (arg: boolean) => void,

  categories: Array<Category>,
  setCategories: (arg: Array<Category>) => void,

  selectedCategories: Array<number>,
  setSelectedCategories: (arg: Array<number>) => void,
}

const ProgramsPageContext = createContext<ContextTypes>({} as ContextTypes);

export const ProgramsPageContextProvider: React.FC = ({ children }) => {
  const { programs, setPrograms, categories, setCategories } = useContext(ProgramsContext);
  const [selected, setSelected] = useState<Program | null>(null);
  const [openCategory, setOpenCategory] = useState<boolean>(false);

  const [selectedCategories, setSelectedCategories] = useState<Array<number>>([]);

  const filteredPrograms = useMemo(() => {
    if (selectedCategories[0]) {
      return programs.filter((program) => program.tags?.some(item => {
        return selectedCategories.some((categoryId) => categoryId === item);
      }));
    }

    return programs;
  }, [programs, selectedCategories]);

  return (
    <ProgramsPageContext.Provider value={{
      programs,
      setPrograms,
      filteredPrograms,

      selected,
      setSelected,

      openCategory,
      setOpenCategory,

      categories,
      setCategories,

      selectedCategories,
      setSelectedCategories
    }}>
      { children }
    </ProgramsPageContext.Provider>
  );
};

export default ProgramsPageContext;
