import React from 'react';
import { Container, ProgramTitle, TimeDetail } from './styles';

const Program: React.FC = () => {
  return (
    <Container>
      <TimeDetail>00H - 04H</TimeDetail>
      <ProgramTitle>Dawn live</ProgramTitle>
    </Container>
  );
}

export default Program;