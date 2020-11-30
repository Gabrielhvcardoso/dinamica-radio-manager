import React, { useContext, useState } from 'react';
import { Container, CloseButton, Header, ListView, Overlay, Program, Title } from './styles';
import { AnimatePresence } from 'framer-motion';
import Alert from '../../../../components/Alert';

import DataContext from '../../../../context/data';
import TimeTableContext from '../../context';
import { Program as ProgramType } from '../../../../types/Program';

const ProgramSelector: React.FC = () => {
  const { programs } = useContext(DataContext);
  const { insertProgram, isSelectorActive, setIsSelectorActive } = useContext(TimeTableContext);
  const [messageError, setMessageError] = useState<string | null>(null);

  const onDismiss = () => setIsSelectorActive(false);

  const onError = (message: string) => {
    setMessageError(message);
    setTimeout(() => setMessageError(null), 3000);
  };

  const handleProgramClick = (program: ProgramType) => {
    insertProgram(program, onError, onDismiss);
  };

  return (
    <AnimatePresence>
      {
        isSelectorActive && (
          <Overlay onMouseDown={onDismiss}>
            <AnimatePresence>
              {
                messageError && (
                  <Alert>{ messageError }</Alert>
                )
              }
            </AnimatePresence>
            <Container onMouseDown={e => e.stopPropagation()} layoutId="open-modal">
              <Header>
                <Title>Selecione um programa</Title>
                <CloseButton onClick={onDismiss}>+</CloseButton>
              </Header>

              <ListView>
                {
                  programs.map((item) => (
                    <Program
                      key={item.programId}
                      onClick={() => handleProgramClick(item)}
                      src={item.image}
                      alt={item.title}
                      title={item.title}
                    />
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
