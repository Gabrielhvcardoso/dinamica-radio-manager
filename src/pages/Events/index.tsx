import React from 'react';
import { Container, Row } from './styles';

import Title from '../../components/Title/index';
import Banner from './components/Banner';
import { AnimatePresence } from 'framer-motion';

const Events: React.FC = () => {
  return (
    <AnimatePresence>
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
    </AnimatePresence>
  );
}

export default Events;
