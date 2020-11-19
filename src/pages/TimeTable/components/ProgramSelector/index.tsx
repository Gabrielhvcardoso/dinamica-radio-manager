import React, { useContext } from 'react';
import { Container, CloseButton, Header, ListView, Overlay, Program, Title } from './styles';
import TimeTableContext from '../../context';

const ProgramSelector: React.FC = () => {
  const { isSelectorActive, setIsSelectorActive } = useContext(TimeTableContext);
  
  const onDismiss = () => setIsSelectorActive(false);

  if (!isSelectorActive) return <></>;

  return (
    <Overlay onClick={onDismiss}>
      <Container>
        <Header>
          <Title>Selecione um programa</Title>
          <CloseButton onClick={onDismiss}>+</CloseButton>
        </Header>

        <ListView>
          <Program /> 
          <Program /> 
          <Program /> 
          <Program /> 
          <Program /> 
          <Program /> 
          <Program /> 
          <Program /> 
          <Program /> 
          <Program /> 
          <Program /> 
          <Program /> 
          <Program /> 
        </ListView>
      </Container>
    </Overlay>
  );
}

export default ProgramSelector;
