import React, { SyntheticEvent } from 'react';
import { Container } from './styles';

interface BackdropProps {
  onClick: (e: SyntheticEvent) => void
}

const Backdrop: React.FC<BackdropProps> = (props) => {
  return (
    <Container {...props} />
  );
}

export default Backdrop;
