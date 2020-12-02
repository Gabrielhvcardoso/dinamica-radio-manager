import React, { useContext } from 'react';
import { format } from 'date-fns';
import { Container, ProgramList } from './styles';

import Title from '../../../../components/Title';
import ListItem from './components/ListItem';
import ListButton from './components/ListButton';

import DataContext from '../../../../context/data';

type Weekday = 'sunday' | 'monday' | 'tuesday' | 'wednesday' | 'thursday' | 'friday' | 'saturday';

const parseToDecimalTime = (hours: number, minutes: number): number => {
  return hours + (minutes / 60);
};

const Schedule: React.FC = () => {
  const { schedule } = useContext(DataContext);

  const hour = format(new Date(), 'HH');
  const minute = format(new Date(), 'mm');
  const weekday: Weekday = format(new Date(), 'EEEE').toLowerCase() as Weekday;

  console.log(schedule ? schedule[weekday] : null);

  const afterPrograms = schedule ? schedule[weekday].filter(({ startAt, duration }) => startAt + duration >= parseToDecimalTime(parseInt(hour), parseInt(minute))) : [];

  return (
    <Container>
      <Title>Programação para hoje</Title>

      <ProgramList>
        {
          afterPrograms.map((item, index) => (
            <ListItem
              item={item}
              key={item.hash}
              first={index === 0}
            />
          ))
        }

        <ListButton />
      </ProgramList>
    </Container>
  );
};

export default Schedule;
