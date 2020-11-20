import React, { createContext, useState } from 'react';
import { Program } from '../types/Program';

interface ProgramContextTypes {
  programs: Array<Program>,
  setPrograms: (arg: Array<Program>) => void,
}

const ProgramContext = createContext<ProgramContextTypes>({} as ProgramContextTypes)

export const ProgramContextProvider: React.FC = ({ children }) => {
  const [programs, setPrograms] = useState<Array<Program>>([
    { tags: [1, 2], programId: 1, title: 'Snows of Solaris', image: 'https://cdn.dribbble.com/users/124813/screenshots/14473913/media/57d70850409e5cf88a30acf72ba1389e.png' },
    { tags: [3], programId: 2, title: 'Angel of Titania', image: 'https://cdn.dribbble.com/users/1803663/screenshots/14600997/media/6841cec9c90b785991125b00d465feaf.png' },
    { tags: [2, 3], programId: 3, title: 'Shackle the Storm', image: 'https://cdn.dribbble.com/users/1803663/screenshots/11400179/media/25558ede8bcb553fd48d7ed339e136ee.png' },
  ]);
  
  return (
    <ProgramContext.Provider value={{ programs, setPrograms }}>
      { children }
    </ProgramContext.Provider>
  );
}

export default ProgramContext;
