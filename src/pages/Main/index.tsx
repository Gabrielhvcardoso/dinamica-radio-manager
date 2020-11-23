import React, { useContext } from 'react';
import { Container, VerticalView } from './styles';

import Banner from './components/Banner';
import Programs from './components/Programs';
import Schedule from './components/Schedule';
import { AnimatePresence } from 'framer-motion';

import MobileContext from '../../context/mobile';

const Main: React.FC = () => {
  const { isMobile } = useContext(MobileContext);

  return (
    <AnimatePresence>
      <Container className="screen-resize">
        <Programs />
        <VerticalView isMobile={isMobile}>
          <Schedule />
          <Banner />
        </VerticalView>
      </Container>
    </AnimatePresence>
  );
}

export default Main;
