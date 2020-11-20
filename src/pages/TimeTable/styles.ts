import { motion } from 'framer-motion';
import styled from 'styled-components';

export const Container = styled(motion.div).attrs({
  initial: { translateX: -100, opacity: 0 },
  animate: { translateX: 0, opacity: 1 },
  exit: { translateX: 100, opacity: 0 }
})`
  display: flex;
  flex: 1;
  flex-direction: column;
  margin: 50px;
`;
