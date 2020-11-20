import React, { createContext, useContext, useMemo, useState } from 'react';
import ProgramsContext from '../../context/programs';

import { Category } from '../../types/Category';
import { Program } from '../../types/Program';

interface ContextTypes {
  programs: Array<Program>,
  filteredPrograms: Array<Program>,
  selected: number | null,
  setSelected: (arg: number | null) => void,

  openCategory: boolean,
  setOpenCategory: (arg: boolean) => void,

  categories: Array<Category>,
  setCategories: (arg: Array<Category>) => void,

  selectedCategories: Array<number>,
  setSelectedCategories: (arg: Array<number>) => void,
}

const ProgramsPageContext = createContext<ContextTypes>({} as ContextTypes);

export const ProgramsPageContextProvider: React.FC = ({ children }) => {
  const { programs } = useContext(ProgramsContext);
  const [selected, setSelected] = useState<number | null>(null);
  const [openCategory, setOpenCategory] = useState<boolean>(false);

  const [categories, setCategories] = useState<Array<Category>>([
    { categoryId: 1, name: 'Categoria 1' },
    { categoryId: 2, name: 'Categoria 2' },
    { categoryId: 3, name: 'Categoria 3' },
  ]);
  const [selectedCategories, setSelectedCategories] = useState<Array<number>>([]);

  const filteredPrograms = useMemo(() => {
    if (selectedCategories[0]) {
      return programs.filter((program) => program.tags?.some((item => {
        return selectedCategories.some((categoryId) => categoryId === item)
      })))
    }

    return programs;
}, [programs, selectedCategories]);

  return (
    <ProgramsPageContext.Provider value={{
      programs,
      filteredPrograms,

      selected,
      setSelected,

      openCategory,
      setOpenCategory,

      categories,
      setCategories,

      selectedCategories,
      setSelectedCategories,
    }}>
      { children }
    </ProgramsPageContext.Provider>
  );
}

export default ProgramsPageContext;
