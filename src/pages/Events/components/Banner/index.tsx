import React from 'react';
import { Container, Title } from './styles';

import colors from '../../../../utils/colors';

const Banner: React.FC = () => {
  return (
    <Container color={colors[Math.floor(Math.random() * 2)].hex()}>
      <Title>#1 Sample</Title>
      
    </Container>
  );
}

export default Banner;
