import React, { useContext } from 'react';
import { Container, ScrollView } from './styles';
import Title from '../../../../components/Title';

import ProgramContext from '../../../../context/programs';
import ProgramSet from './components/ProgramSet';

const Programs: React.FC = () => {
  const { programs } = useContext(ProgramContext);

  return (
    <Container id="programs">
      <Title>Programas</Title>

      <ScrollView>
        {
          programs.map((program) => (
            <ProgramSet program={program} />
          ))
        }
        <div style={{ minWidth: 50 }} />
      </ScrollView>
    </Container>
  );
}

export default Programs;
