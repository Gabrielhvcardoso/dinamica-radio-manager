import React from 'react';
import { Container, VerticalView } from './styles';

import Banner from './components/Banner';
import Programs from './components/Programs';
import Schedule from './components/Schedule';
import { AnimatePresence } from 'framer-motion';

const Main: React.FC = () => {
  return (
    <AnimatePresence>
      <Container>
        <Programs />
        <VerticalView>
          <Schedule />
          <Banner />
        </VerticalView>
      </Container>
    </AnimatePresence>
  );
}

export default Main;
