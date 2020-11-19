import React, { createRef, useContext } from 'react';
import { Container, TimeLine } from './styles';
import { useDimensions } from '../../../../hooks';
import TimeTableContext from '../../context';

import Meassuring from './components/Meassuring';
import MotionFunction from './components/MotionFunction';

const TimeLineTemp: React.FC = () => {
  const { programs } = useContext(TimeTableContext);

  const timelineRef = createRef<HTMLDivElement>();
  const meassurementUnit = useDimensions(timelineRef).width / 24;
  
  return (
    <Container ref={timelineRef}>
      <TimeLine>
        {
          programs.map((item) => (
            <MotionFunction
              item={item}
              meassureUnit={meassurementUnit}
            /> 
          ))
        }
      </TimeLine>

      <Meassuring />
    </Container>
  );
}

export default TimeLineTemp;
