import React from 'react';
import { Container, VerticalView } from './styles';

import Banner from './components/Banner';
import Programs from './components/Programs';
import Schedule from './components/Schedule';

const Main: React.FC = () => {
  return (
    <Container>
      <Programs />
      <VerticalView>
        <Schedule />
        <Banner />
      </VerticalView>
    </Container>
  );
}

export default Main;
