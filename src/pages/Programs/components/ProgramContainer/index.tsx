import React, { useContext, useMemo } from 'react';
import { AnimatePresence } from 'framer-motion';
import { Container, ImageHeader, Overlay, Title } from './styles';

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

            <ImageHeader src={ program?.image } alt={ program?.title } />

            <div style={{ margin: 20 }}>
              <Title>{ program?.title }</Title>
              <p>Configurações sensíveis</p>
            </div>
          
          </Container>
        </Overlay>
      )}
    </AnimatePresence>
  );
}

export default ProgramContainer;