import React from 'react';
import { Portal } from 'react-portal';
import { Container } from './styles';

interface AlertProps {
  error?: boolean;
}

const Alert: React.FC<AlertProps> = ({ children, error }) => {
  return (
    <Portal>
      <Container error={error ?? false}>
        { children }
      </Container>
    </Portal>
  );
}

export default Alert;
