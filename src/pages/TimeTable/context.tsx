import update from 'immutability-helper';
import React, { createContext, useContext, useEffect, useState } from 'react';
import { useFetch } from '../../hooks';
import { Program } from '../../types/Program';

import crypto from 'crypto';

import AuthContext from '../../context/auth';
import DataContext from '../../context/data';

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

interface TimeTableInterface {
  isSavingWeekday: boolean,

  programs: Array<ScheduleProgram>,
  moveProgram: (dragDirtyId: string, hoverDirtyId: string) => void,
  setProgramDuration: (programId: string, duration: number) => void,
  reorder: (newprograms?: Array<ScheduleProgram>) => void,
  saveWeekday: (onSuccess?: () => void) => void,
  insertProgram: (program: Program, onError: (message: string) => void, onSuccess: () => void) => void,
  removeProgram: (hash: string, onError?: (message: string) => void, onSuccess?: () => void) => void,

  filter: number,
  setFilter: (arg1: number) => void,

  isSelectorActive: boolean,
  setIsSelectorActive: (arg1: boolean) => void
}

// Context

const TimeTableContext = createContext({} as TimeTableInterface);

export const TimeTableContextProvider: React.FC = ({ children }) => {
  const { clientId } = useContext(AuthContext);
  const { schedule, setSchedule } = useContext(DataContext);

  const [isLoading, setIsLoading] = useState<boolean>(true);

  const [isSelectorActive, setIsSelectorActive] = useState<boolean>(false);
  const [filter, setFilter] = useState<number>(0);

  const [programs, setPrograms] = useState<Array<ScheduleProgram>>([]);

  // Feedback Controllers

  const [isSavingWeekday, setIsSavingWeekday] = useState<boolean>(false);

  // Call to API

  useEffect(() => {
    if (schedule !== null) {
      setSchedule(schedule);
      setPrograms(schedule.sunday);
      setIsLoading(false);
    };
  }, [schedule]);

  // Filter switcher

  useEffect(() => {
    if (schedule) {
      switch (filter) {
        case 0:
          reorder(schedule.sunday);
          break;
        case 1:
          reorder(schedule.monday);
          break;
        case 2:
          reorder(schedule.tuesday);
          break;
        case 3:
          reorder(schedule.wednesday);
          break;
        case 4:
          reorder(schedule.thursday);
          break;
        case 5:
          reorder(schedule.friday);
          break;
        default:
          reorder(schedule.saturday);
          break; ;
      }
    }
  }, [filter]);

  // Programs manipulation

  const setProgramDuration = (programHash: string, duration: number) => {
    const index = programs.findIndex(item => item.hash === programHash);
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
      if (duration + programs[index].startAt <= 24) {
        newPrograms = (update(programs, {
          [index]: { duration: { $set: duration } }
        }));
      } else {
        newPrograms = (update(programs, {
          [index]: { duration: { $set: 24 - programs[index].startAt } }
        }));
      }
    }

    reorder(newPrograms);
  };

  const moveProgram = (dragHash: string, hoverHash: string) => {
    const dragIndex = programs.findIndex((el) => el.hash === dragHash);
    const hoverIndex = programs.findIndex((el) => el.hash === hoverHash);

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
  };

  const reorder = (newprograms = programs) => {
    let newPrograms = newprograms;
    let startAt = 0;
    newPrograms = newPrograms.sort((a, b) => a.order > b.order ? 1 : -1).reduce((acc, item) => {
      acc.push({
        ...item,
        startAt
      });

      startAt += item.duration;
      return acc;
    }, [] as Array<ScheduleProgram>);

    newPrograms = newPrograms.sort((a, b) => a.hash > b.hash ? 1 : -1);

    // Avoid timeline x asis overflow

    const lastOrderIndex = newPrograms.findIndex(item => item.order === programs.reduce((prev, curr) => prev > curr.order ? prev : curr.order, 0));
    if (lastOrderIndex > -1) {
      if (newPrograms[lastOrderIndex].startAt + newPrograms[lastOrderIndex].duration > 24) {
        const newDuration = 24 - newPrograms[lastOrderIndex].startAt;

        if (newDuration >= 0.1) {
          newPrograms = update(newPrograms, {
            [lastOrderIndex]: { duration: { $set: newDuration } }
          });
        } else {
          return;
        }
      }
    }

    setPrograms(newPrograms);
  };

  const insertProgram = (program: Program, onError = (message: string) => {}, onSuccess = () => {}) => {
    const lastOrderIndex = programs.findIndex(item => item.order === programs.reduce((prev, curr) => prev > curr.order ? prev : curr.order, 0));
    const startAt = lastOrderIndex > -1 ? programs[lastOrderIndex].startAt + programs[lastOrderIndex].duration : 0;

    if (startAt === 24) {
      // There's no space to insert
      return onError(`Não existe espaço para ${program.title ?? 'este programa'} ser inserido.`);
    }

    setPrograms(update(programs, {
      $push: [{
        ...program,
        order: lastOrderIndex + 1,
        startAt,
        duration: 24 - startAt,
        hash: crypto.randomBytes(16).toString('hex')
      }]
    }));

    onSuccess();
  };

  const removeProgram = (hash: string, onError = (message: string) => {}, onSuccess = () => {}) => {
    const index = programs.findIndex(item => item.hash === hash);

    if (index > -1) {
      onSuccess();
      reorder(update(programs, {
        $splice: [[index, 1]]
      }));
    } else {
      onError('Impossível remover item com hash indefinido, por favor, atualize sua página e tente novamente.');
    }
  };

  // Save updates

  const saveWeekday = (onSuccess?: () => void) => {
    setIsSavingWeekday(true);

    if (schedule) {
      const body = {
        clientId,
        weekday: filter + 1,
        programs: programs.map(({ programId, startAt, duration }) => ({ programId, startAt, duration }))
      };

      console.log(body);

      useFetch.post('/sch', body, (response) => {
        if (response.code === 'success') {
          const weekday = Object.keys(schedule)[filter];
          onSuccess && onSuccess();
          setSchedule(update(schedule, {
            [weekday]: { $set: programs }
          }));
        } else {
          alert('error');
        }

        setIsSavingWeekday(false);
      });
    }
  };

  // Provider function

  return (
    <TimeTableContext.Provider value={{
      isSavingWeekday,

      programs,
      moveProgram,
      setProgramDuration,
      reorder,
      saveWeekday,
      insertProgram,
      removeProgram,

      filter,
      setFilter,

      isSelectorActive,
      setIsSelectorActive
    }}>
      { !isLoading && children }
    </TimeTableContext.Provider>
  );
};

export default TimeTableContext;
