import React from 'react';
import { Container, Selected, Selector, SelectorsContainer } from './styles';

import Title from '../../../../components/Title';

const Navigation: React.FC = () => {
  return (
    <Container>
      <Title>Programação</Title>

      <SelectorsContainer>
        <Selected>Segunda-feira</Selected>

        <Selector>S</Selector>
        <Selector>T</Selector>
        <Selector>Q</Selector>
        <Selector>Q</Selector>
        <Selector>S</Selector>
        <Selector>S</Selector>
        <Selector>D</Selector>
      </SelectorsContainer>
    </Container>
  );
}

export default Navigation;