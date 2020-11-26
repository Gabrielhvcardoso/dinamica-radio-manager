import React from 'react';
import { Container, ProgramList } from './styles';

import Title from '../../../../components/Title';
import ListItem from './components/ListItem';
import ListButton from './components/ListButton';

const Schedule: React.FC = () => {
  return (
    <Container>
      <Title>Programação para hoje</Title>

      <ProgramList>
        {
          [1, 2].map((item, index, array) => (
            <ListItem
              key={item}
              first={index === 0}
            />
          ))
        }

        <ListButton />
      </ProgramList>
    </Container>
  );
};

export default Schedule;
