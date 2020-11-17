import React from 'react';
import { Container } from './styles';

import colors from '../../../../utils/colors';

const Banner: React.FC = () => {
  return (
    <Container color={colors[Math.floor(Math.random() * colors.length)].hex()}>
      
    </Container>
  );
}

export default Banner;
