import update from 'immutability-helper'
import React, { createContext, useEffect, useMemo, useState } from 'react';
import { Program } from '../../types/Program';

import { sunday, monday, tuesday, wednesday, thursday, friday, saturday } from './sampleData';

export interface ScheduleProgram extends Program {
  order: number,
  accumulated: number,
}

interface TimeTableInterface {
  programs: Array<ScheduleProgram>,
  moveProgram: (dragDirtyId: string, hoverDirtyId: string) => void,
  setProgramDuration: (programId: number, duration: number) => void,
  reorder: (newprograms?: Array<ScheduleProgram>) => void,

  filter: number,
  setFilter: (arg1: number) => void
}

// Context

const TimeTableContext = createContext({} as TimeTableInterface);

export const TimeTableContextProvider: React.FC = ({ children }) => {
  const [filter, setFilter] = useState<number>(0);

  const [programs, setPrograms] = useState<Array<ScheduleProgram>>(sunday);

  useEffect(() => {
    switch (filter) {
      case 0:
        setPrograms(sunday);
        break;
      case 1:
        setPrograms(monday);
        break;
      case 2:
        setPrograms(tuesday);
        break;
      case 3:
        setPrograms(wednesday);
        break;
      case 4:
        setPrograms(thursday);
        break;
      case 5:
        setPrograms(friday);
        break;
      default:
        setPrograms(saturday);
        break;;
    }
  }, [filter]);

  // Programs manipulation

  const setProgramDuration = (programId: number, duration: number) => {
    const index = programs.findIndex(item => item.programId === programId);
    const nextIndex = programs.findIndex(item => item.order === programs[index].order + 1);

    let newPrograms;

    if (duration < 0.1) {
      return;
    } else if (nextIndex > -1) {
      // When has an item at the front
      newPrograms = (update(programs, {
        [index]: { duration: { $set: duration } }
      }));
      
    } else {
      // When resized item is the last item
      if (duration + programs[index].accumulated <= 24) {
        newPrograms = (update(programs, {
          [index]: { duration: { $set: duration } }
        }));
      } else {
        newPrograms = (update(programs, {
          [index]: { duration: { $set: 24 - programs[index].accumulated } }
        }));
      }
    }

    reorder(newPrograms);
  }

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

    reorder(newPrograms);
  }

  const reorder = (newprograms = programs) => {
    let newPrograms = newprograms;
    let accumulated = 0;
    newPrograms = newPrograms.sort((a,b) => a.order > b.order ? 1 : -1).reduce((acc, item) => {
      acc.push({
        ...item,
        accumulated
      });

      accumulated += item.duration;
      return acc;
    }, [] as Array<ScheduleProgram>);

    newPrograms = newPrograms.sort((a,b) => a.programId > b.programId ? 1 : -1);

    const lastOrderIndex = newPrograms.findIndex(item => item.order === programs.reduce((prev, curr) => prev > curr.order ? prev : curr.order, 0))
    if (newPrograms[lastOrderIndex].accumulated + newPrograms[lastOrderIndex].duration > 24) {
      const newDuration = 24 - newPrograms[lastOrderIndex].accumulated;

      if (newDuration >= 0.1) {
        newPrograms = update(newPrograms, {
          [lastOrderIndex]: { duration: { $set: newDuration } }
        })
      } else {
        return;
      }
    }

    setPrograms(newPrograms);
  }

  // Provider function

  return (
    <TimeTableContext.Provider value={{ programs, moveProgram, setProgramDuration, reorder, filter, setFilter }}>
      { children }
    </TimeTableContext.Provider>
  );
}

export default TimeTableContext;
