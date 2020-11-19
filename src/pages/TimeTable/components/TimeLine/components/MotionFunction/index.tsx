import React, { useContext } from 'react';
import { Motion, spring } from 'react-motion';
import TimeTableContext, { ScheduleProgram } from '../../../../context';

import Program from './Program';

interface MotionFunctionProps {
  item: ScheduleProgram,
  meassureUnit: number,
}

const MotionFunction: React.FC<MotionFunctionProps> = ({ item, meassureUnit }) => {
  const { moveProgram } = useContext(TimeTableContext);
  const { accumulated, programId, order, title, duration } = item;

  const convertToMinutes = (x: number) => (x * 60 / 100) < 10 ? `0${x * 60 / 100}` : (x * 60 / 100);
  let horary = accumulated.toFixed(2).split(".")[0] + "H" + convertToMinutes(parseInt(accumulated.toFixed(2).split(".")[1]));

  return (
    <Motion
      style={{
        x: spring(
          accumulated * meassureUnit,
          { stiffness: 500, damping: 50 }
        )
      }}
    >
      {
        ({ x }) => (
          <Program
            horary={horary}
            moveProgram={moveProgram}
            id={`program-${programId}`}
            order={order}
            title={title}
            style={{
              width: duration * meassureUnit + 'px',
              transform: `translate3d(${x}px, 0px, 0)`,
            }}
          />
        )
      }
    </Motion>
  );
}

export default MotionFunction;
