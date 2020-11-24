import React, { createRef, useContext } from 'react';
import { Container, TimeLine as TimeLineComponent } from './styles';
import { useWindowSize } from '../../../../hooks';
import TimeTableContext from '../../context';

import Meassuring from './components/Meassuring';
import MotionFunction from './components/MotionFunction';

const TimeLine: React.FC = () => {
  const { programs } = useContext(TimeTableContext);

  const { width } = useWindowSize();
  const measurementUnit = (width - 100) / 24;

  console.log(measurementUnit)
  
  return (
    <Container>
      <TimeLineComponent>
        {
          programs.map((item) => (
            <MotionFunction
              key={item.programId}
              item={item}
              measureUnit={measurementUnit}
            /> 
          ))
        }
      </TimeLineComponent>

      <Meassuring />
    </Container>
  );
}

export default TimeLine;
