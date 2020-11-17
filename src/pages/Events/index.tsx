import React from 'react';
import { Container, Row } from './styles';

import Title from '../../components/Title/index';
import Banner from './components/Banner';

const Events: React.FC = () => {
  return (
    <Container>
      <Title>Eventos</Title>

      <Row>
        <Banner />
        <Banner />
      </Row>
      <Row>
        <Banner />
        <Banner />
        <Banner />
      </Row>
    </Container>
  );
}

export default Events;
