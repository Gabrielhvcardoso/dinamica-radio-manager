import update from 'immutability-helper'
import React, { createContext, useState } from 'react';
import { Program } from '../../types/Program';

import { data } from './sampleData';

export interface ScheduleProgram extends Program {
  order: number,
  accumulated: number,
}

interface TimeTableInterface {
  programs: Array<ScheduleProgram>,
  moveProgram: (dragDirtyId: string, hoverDirtyId: string) => void,
}

// Context

const TimeTableContext = createContext({} as TimeTableInterface);

export const TimeTableContextProvider: React.FC = ({ children }) => {
  const [programs, setPrograms] = useState<Array<ScheduleProgram>>(data);

  const moveProgram = (dragDirtyId: string, hoverDirtyId: string) => {
    const dragId = parseInt(dragDirtyId.split("-")[1]);
    const hoverId = parseInt(hoverDirtyId.split("-")[1]);
    
    const dragIndex = programs.findIndex((el) => el.programId === dragId);
    const hoverIndex = programs.findIndex((el) => el.programId === hoverId);
  
    const drag = programs[dragIndex];
    const hover = programs[hoverIndex];
    
    // Create a new instance of programs state
    let newPrograms = programs;

    // Set new order
    newPrograms = update(newPrograms, {
      [hoverIndex]: { order: { $set: drag.order } },
      [dragIndex]: { order: { $set: hover.order } } 
    });

    // Sort by order number and set all accumulated values
    let accumulated = 0;
    newPrograms = newPrograms.sort((a,b) => a.order > b.order ? 1 : -1).reduce((acc, item) => {
      acc.push({
        ...item,
        accumulated
      });

      accumulated += item.duration;
      return acc;
    }, [] as Array<ScheduleProgram>);

    newPrograms = newPrograms.sort((a,b) => a.programId > b.programId ? 1 : -1)

    setPrograms(newPrograms);
  }

  return (
    <TimeTableContext.Provider value={{ programs, moveProgram }}>
      { children }
    </TimeTableContext.Provider>
  );
}

export default TimeTableContext;
