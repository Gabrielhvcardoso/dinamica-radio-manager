import React, { useContext } from 'react';
import { Container, ScrollView } from './styles';
import Title from '../../../../components/Title';

import DataContext from '../../../../context/data';
import ProgramSet from './components/ProgramSet';

const Programs: React.FC = () => {
  const { programs } = useContext(DataContext);

  return (
    <Container id="programs">
      <Title>Programas</Title>

      <ScrollView>
        {
          programs.map((program) => (
            <ProgramSet key={program.programId} program={program} />
          ))
        }
        <div style={{ minWidth: 50 }} />
      </ScrollView>
    </Container>
  );
}

export default Programs;
