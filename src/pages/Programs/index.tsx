import React from 'react';
import { Container, ProgramList } from './styles';

import Categories from './components/Categories';
import Program from './components/Program';
import Title from '../../components/Title';

const Programs: React.FC = () => {
  return (
    <Container>
      <Title>Programas</Title>
      <Categories />

      <ProgramList>
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
        <Program />
      </ProgramList>
    </Container>
  );
}

export default Programs;
