import React, { useContext, useMemo } from 'react';
import { AnimatePresence } from 'framer-motion';
import { Container, Overlay, Title } from './styles';

import ProgramsPageContext from '../../context';

const ProgramContainer: React.FC = () => {
  const { programs, selected, setSelected } = useContext(ProgramsPageContext);
  const onDismiss = () => setSelected(null);

  const program = useMemo(() => {
    if (selected) {
      return programs.find((item) => item.programId === selected);
    }

    return null;
  }, [selected, programs])

  return (
    <AnimatePresence>
      { selected && (
        <Overlay onClick={onDismiss}>
          <Container layoutId={selected?.toString()}>
            <Title>{ program?.title }</Title>
          </Container>
        </Overlay>
      )}
    </AnimatePresence>
  );
}

export default ProgramContainer;