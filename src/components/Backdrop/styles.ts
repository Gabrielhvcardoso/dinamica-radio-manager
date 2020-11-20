import styled from 'styled-components';
import { motion } from 'framer-motion';

export const Container = styled(motion.div).attrs({
  initial: { opacity: 0 },
  animate: { opacity: 1 },
  exit: { opacity: 0 },
  transition: {
    type: 'spring',
    stiffness: 260,
    damping: 20
  },
})`
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  z-index: 2;
  display: flex;
  justify-content: center;
  align-items: center;
  opacity: 1 !important;
`;
