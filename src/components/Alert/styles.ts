import { motion } from 'framer-motion';
import styled from 'styled-components';

interface ContainerProps {
  error?: boolean | null;
}

export const Container = styled(motion.div).attrs({
  initial: { opacity: 0, translateX: 100 },
  animate: { opacity: 1, translateX: 0 },
  exit: { opacity: 0, translateX: 100 },
  transition: {
    type: 'spring',
    stiffness: 500,
    damping: 42
  }
})<ContainerProps>`
  background-color: #303030;
  border-radius: 10px;
  bottom: 20px;
  color: ${props => props.error ? "red" : "white"};
  max-width: 400px;
  padding: 10px;
  position: absolute;
  right: 20px;
  z-index: 10;
`;
