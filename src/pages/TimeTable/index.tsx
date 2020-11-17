import React from 'react';
import { Container } from './styles';

import Navigation from './components/Navigation';
import TimeLine from './components/TimeLine';

const TimeTable: React.FC = () => {
  return (
    <Container>
      <Navigation />
      <TimeLine />
    </Container>
  );
}

export default TimeTable;
