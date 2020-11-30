import React, { useContext, useState } from 'react';
import { Button, Container, TimeLine as TimeLineComponent } from './styles';
import { useWindowSize } from '../../../../hooks';
import TimeTableContext from '../../context';
import Alert from '../../../../components/Alert';

import Meassuring from './components/Meassuring';
import MotionFunction from './components/MotionFunction';

const TimeLine: React.FC = () => {
  const [isSuccess, setIsSuccess] = useState<boolean>(false);
  const { isSavingWeekday, programs, saveWeekday } = useContext(TimeTableContext);

  const { width } = useWindowSize();
  const measurementUnit = (width - 100) / 24;

  const onSuccess = () => {
    setIsSuccess(true);
    setTimeout(() => {
      setIsSuccess(false);
    }, 4000);
  };

  return (
    <Container>
      {
        isSuccess && (
          <Alert>
            Suas mudanças foram salvas com sucesso!
          </Alert>
        )
      }
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
        {
          !isSavingWeekday
            ? <Button onClick={() => saveWeekday(onSuccess)}>Salvar dia da semana</Button>
            : <Button>Salvando...</Button>
        }
      </div>
    </Container>
  );
};

export default TimeLine;
