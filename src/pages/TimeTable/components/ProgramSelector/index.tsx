import React, { useContext } from 'react';
import { Container, CloseButton, Header, ListView, Overlay, Program, Title } from './styles';
import TimeTableContext from '../../context';
import { AnimatePresence } from 'framer-motion';

import DataContext from '../../../../context/data';

const ProgramSelector: React.FC = () => {
  const { programs } = useContext(DataContext);
  const { isSelectorActive, setIsSelectorActive } = useContext(TimeTableContext);

  const onDismiss = () => setIsSelectorActive(false);

  return (
    <AnimatePresence>
      {
        isSelectorActive && (
          <Overlay onMouseDown={onDismiss}>
            <Container onMouseDown={e => e.stopPropagation()} layoutId="open-modal">
              <Header>
                <Title>Selecione um programa</Title>
                <CloseButton onClick={onDismiss}>+</CloseButton>
              </Header>

              <ListView>
                {
                  programs.map((item) => (
                    <Program key={item.programId} src={item.image} alt={item.title} title={item.title} />
                  ))
                }
              </ListView>
            </Container>
          </Overlay>
        )
      }

    </AnimatePresence>
  );
};

export default ProgramSelector;
