import React, { useContext } from 'react';
import { CenteredContainer, Container, Text } from './styles';
import { AnimatePresence, AnimateSharedLayout } from 'framer-motion';

import Navigation from './components/Navigation';
import ProgramSelector from './components/ProgramSelector';
import TimeLine from './components/TimeLine';

import MobileContext from '../../context/mobile';
import { TimeTableContextProvider } from './context';
import { Portal } from 'react-portal';

const TimeTable: React.FC = () => {
  const { isMobile } = useContext(MobileContext);

  if (isMobile) {
    return (
      <Portal>
        <AnimatePresence>
          <CenteredContainer>
            <Text>
              Essa página não foi projetada para dispositivos móveis
            </Text>
          </CenteredContainer>
        </AnimatePresence>
      </Portal>
    )
  }

  return (
    <TimeTableContextProvider>
      <AnimatePresence>
        <Container className="screen-resize">
          <AnimateSharedLayout>
            <Navigation />
            <ProgramSelector />
          </AnimateSharedLayout>
          <TimeLine />
        </Container>
      </AnimatePresence>
    </TimeTableContextProvider>
  );
}

export default TimeTable;
