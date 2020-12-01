import React, { SyntheticEvent } from 'react';
import { Container } from './styles';

interface BackdropProps {
  onClick: (e: SyntheticEvent) => void,
  shade?: boolean
}

const Backdrop: React.FC<BackdropProps> = (props) => {
  return (
    <Container
      initial={{ backgroundColor: 'rgba(0, 0, 0, 0)' }}
      animate={{ backgroundColor: (props.shade ?? true) ? 'rgba(0, 0, 0, 0.6)' : 'rgba(0, 0, 0, 0)' }}
      exit={{ backgroundColor: 'rgba(0, 0, 0, 0)' }}
      onClick={props.onClick}
    >
      { props.children }
    </Container>
  );
};

export default Backdrop;
