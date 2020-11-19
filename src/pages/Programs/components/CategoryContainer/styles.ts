import styled from 'styled-components';
import { motion } from 'framer-motion';

export const Overlay = styled(motion.div).attrs({
  initial: { opacity: 0 },
  animate: { opacity: 1 },
  exit: { opacity: 0 },
  transition: {
    type: 'spring',
    stiffness: 260,
    damping: 20
  },
})`
  background-color: rgba(0, 0, 0, 0.6);
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  z-index: 2;
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const Container = styled(motion.div).attrs({
  transition: {
    type: 'spring',
    stiffness: 500,
    damping: 42
  }
})`
  background-color: #303030;
  border-radius: 10px;
  height: 300px;
  width: 660px;

  position: absolute;

`;
