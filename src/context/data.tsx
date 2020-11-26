import React, { createContext, useEffect, useState } from 'react';
import { Banner } from '../types/Banner';
import { Category } from '../types/Category';
import { Program } from '../types/Program';

import { useFetch } from '../hooks';

interface ProgramContextTypes {
  isLoading: boolean,

  banners: Array<Banner>,
  setBanners: (arg: Array<Banner>) => void,

  programs: Array<Program>,
  setPrograms: (arg: Array<Program>) => void,

  categories: Array<Category>,
  setCategories: (arg: Array<Category>) => void
}

const DataContext = createContext<ProgramContextTypes>({} as ProgramContextTypes);

export const DataContextProvider: React.FC = ({ children }) => {
  const [isLoading, setIsLoading] = useState<boolean>(true);

  const [banners, setBanners] = useState<Array<Banner>>([]);
  const [categories, setCategories] = useState<Array<Category>>([]);
  const [programs, setPrograms] = useState<Array<Program>>([]);

  useEffect(() => {
    Promise.all([
      useFetch.post('/pro', { clientId: 1 }, (response: Array<Program>) => setPrograms(response)),
      useFetch.post('/cat', { clientId: 1 }, (response: Array<Category>) => setCategories(response)),
      useFetch.post('/ban', { clientId: 1 }, (response: Array<Banner>) => setBanners(response))
    ]).then(() => {
      setIsLoading(false);
    });
  }, []);

  return (
    <DataContext.Provider value={{ isLoading, banners, setBanners, programs, setPrograms, categories, setCategories }}>
      { children }
    </DataContext.Provider>
  );
};

export default DataContext;
