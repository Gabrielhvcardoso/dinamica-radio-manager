import styled from 'styled-components';
import { motion } from 'framer-motion';

export const Container = styled(motion.div).attrs({
  initial: { backgroundColor: 'transparent' },
  animate: { backgroundColor: 'rgba(0, 0, 0, 0.6)' },
  exit: { backgroundColor: 'transparent' },
})`
  position: fixed;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  z-index: 2;
  display: flex;
  justify-content: center;
  align-items: center;
`;
