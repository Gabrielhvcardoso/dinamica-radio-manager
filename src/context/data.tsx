import React, { createContext, useEffect, useState } from 'react';
import { Banner } from '../types/Banner';
import { Category } from '../types/Category';
import { Program } from '../types/Program';

import { useFetch } from '../hooks';

export interface ScheduleProgram extends Program {
  order: number,
  startAt: number,
  duration: number,
  hash: string,
}

export interface Schedule {
  sunday: Array<ScheduleProgram>,
  monday: Array<ScheduleProgram>,
  tuesday: Array<ScheduleProgram>,
  wednesday: Array<ScheduleProgram>,
  thursday: Array<ScheduleProgram>,
  friday: Array<ScheduleProgram>,
  saturday: Array<ScheduleProgram>,
}

interface ProgramContextTypes {
  isLoading: boolean,

  banners: Array<Banner>,
  setBanners: (arg: Array<Banner>) => void,

  programs: Array<Program>,
  setPrograms: (arg: Array<Program>) => void,

  categories: Array<Category>,
  setCategories: (arg: Array<Category>) => void,

  schedule: Schedule | null,
  setSchedule: (arg: Schedule | null) => void
}

const DataContext = createContext<ProgramContextTypes>({} as ProgramContextTypes);

export const DataContextProvider: React.FC = ({ children }) => {
  const [isLoading, setIsLoading] = useState<boolean>(true);

  const [banners, setBanners] = useState<Array<Banner>>([]);
  const [categories, setCategories] = useState<Array<Category>>([]);
  const [programs, setPrograms] = useState<Array<Program>>([]);
  const [schedule, setSchedule] = useState<Schedule | null>(null);

  useEffect(() => {
    Promise.all([
      useFetch.post('/pro', { clientId: 1 }, (response: Array<Program>) => setPrograms(response)),
      useFetch.post('/cat', { clientId: 1 }, (response: Array<Category>) => setCategories(response)),
      useFetch.post('/ban', { clientId: 1 }, (response: Array<Banner>) => setBanners(response)),
      useFetch.get('/sch/1', (response: Schedule) => setSchedule(response))
    ]).then(() => {
      setIsLoading(false);
    });
  }, []);

  return (
    <DataContext.Provider value={{ isLoading, banners, setBanners, programs, setPrograms, categories, setCategories, schedule, setSchedule }}>
      { children }
    </DataContext.Provider>
  );
};

export default DataContext;
