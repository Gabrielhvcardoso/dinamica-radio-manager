import React, { useContext } from 'react';
import { Portal } from 'react-portal';
import { Container } from './styles';

import MobileContext from '../../context/mobile';

interface AlertProps {
  error?: boolean;
}

const Alert: React.FC<AlertProps> = ({ children, error }) => {
  const { isMobile } = useContext(MobileContext);

  return (
    <Portal>
      <Container isMobile={isMobile} error={error ?? false}>
        { children }
      </Container>
    </Portal>
  );
};

export default Alert;
