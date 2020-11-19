import React from 'react';
import { Container } from './styles';

import Navigation from './components/Navigation';
import TimeLine from './components/TimeLine';

import { TimeTableContextProvider } from './context';

const TimeTable: React.FC = () => {
  return (
    <TimeTableContextProvider>
      <Container>
        <Navigation />
        <TimeLine />
      </Container>
    </TimeTableContextProvider>
  );
}

export default TimeTable;
