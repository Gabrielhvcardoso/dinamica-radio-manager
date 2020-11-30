import React, { useContext } from 'react';
import { Button, Container, TimeLine as TimeLineComponent } from './styles';
import { useWindowSize } from '../../../../hooks';
import TimeTableContext from '../../context';

import Meassuring from './components/Meassuring';
import MotionFunction from './components/MotionFunction';

const TimeLine: React.FC = () => {
  const { programs } = useContext(TimeTableContext);

  const { width } = useWindowSize();
  const measurementUnit = (width - 100) / 24;

  console.log(measurementUnit);

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

      <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: 50 }}>
        <Button>Salvar dia da semana</Button>
      </div>
    </Container>
  );
};

export default TimeLine;
