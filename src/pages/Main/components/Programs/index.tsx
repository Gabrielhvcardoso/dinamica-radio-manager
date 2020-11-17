import React from 'react';
import { Container, ProgramBox, ScrollView } from './styles';
import Title from '../../../../components/Title';

const Programs: React.FC = () => {
  return (
    <Container id="programs">
      <Title>Programas</Title>

      <ScrollView>
        <ProgramBox />  
        <ProgramBox />  
        <ProgramBox />  
        <ProgramBox />  
        <ProgramBox />  
        <ProgramBox />  
        <ProgramBox />
        <ProgramBox />
        <ProgramBox />
        <ProgramBox />
        <ProgramBox />
        <ProgramBox />
        <ProgramBox />
        <ProgramBox />
        <ProgramBox />
        <ProgramBox />
        <div style={{ minWidth: 50 }} />
      </ScrollView>
    </Container>
  );
}

export default Programs;
