import React, { createRef, useContext } from 'react';
import { Container, TimeLine as TimeLineComponent } from './styles';
import { useDimensions } from '../../../../hooks';
import TimeTableContext from '../../context';

import Meassuring from './components/Meassuring';
import MotionFunction from './components/MotionFunction';

const TimeLine: React.FC = () => {
  const { programs } = useContext(TimeTableContext);

  const timelineRef = createRef<HTMLDivElement>();
  const { width } = useDimensions(timelineRef);
  const meassurementUnit = width / 24;

  // console.log(width);
  
  return (
    <Container>
      <TimeLineComponent ref={timelineRef}>
        {
          programs.map((item) => (
            <MotionFunction
              key={item.programId}
              item={item}
              meassureUnit={meassurementUnit}
            /> 
          ))
        }
      </TimeLineComponent>

      <Meassuring />
    </Container>
  );
}

export default TimeLine;
