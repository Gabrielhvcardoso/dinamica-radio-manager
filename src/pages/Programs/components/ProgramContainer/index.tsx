import React, { useContext } from 'react';
import { AnimatePresence } from 'framer-motion';
import { Container, Overlay } from './styles';

import ProgramsPageContext from '../../context';

const ProgramContainer: React.FC = () => {
  const { selected, setSelected } = useContext(ProgramsPageContext);
  const onDismiss = () => setSelected(null);

  return (
    <AnimatePresence>
      { selected && (
        <Overlay onClick={onDismiss}>
          <Container layoutId={selected?.toString()}>

          </Container>
        </Overlay>
      )}
    </AnimatePresence>
  );
}

export default ProgramContainer;