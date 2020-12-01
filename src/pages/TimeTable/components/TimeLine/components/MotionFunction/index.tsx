import React, { useContext } from 'react';
import { Motion, spring } from 'react-motion';
import TimeTableContext, { ScheduleProgram } from '../../../../context';

import Program from './Program';

interface MotionFunctionProps {
  item: ScheduleProgram,
  measureUnit: number,
}

const resolveDecimalTime = (time: number): string => {
  const hours = Math.floor(time);
  const minutes = Math.round((time - hours) * 60).toString();
  return `${(hours === 24 ? 0 : hours).toString().padStart(2, '0')}:${minutes.padStart(2, '0')}`;
};

const MotionFunction: React.FC<MotionFunctionProps> = ({ item, measureUnit }) => {
  const { moveProgram } = useContext(TimeTableContext);
  const { startAt, hash, order, title, duration } = item;

  return (
    <Motion
      style={{
        x: spring(
          startAt * measureUnit,
          { stiffness: 500, damping: 50 }
        )
      }}
    >
      {
        ({ x }) => (
          <Program
            duration={resolveDecimalTime(duration)}
            startAt={resolveDecimalTime(startAt)}
            endAt={resolveDecimalTime(startAt + duration)}
            id={hash}
            measureUnit={measureUnit}
            moveProgram={moveProgram}
            order={order}
            style={{
              width: duration * measureUnit + 'px',
              transform: `translate3d(${x}px, 0px, 0)`
            }}
            title={title}
          />
        )
      }
    </Motion>
  );
};

export default MotionFunction;
