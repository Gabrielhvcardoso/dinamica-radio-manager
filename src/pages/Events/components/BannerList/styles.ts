import { motion } from 'framer-motion';
import styled from 'styled-components';

export const Row = styled(motion.div)`
  display: flex;
  flex: 1;
  flex-direction: row;
  margin: 10px -10px;
`;

export const Container = styled(motion.div).attrs({
  initial: { opacity: 0, translateX: -100 },
  animate: { opacity: 1, translateX: 0 },
  exit: { opacity: 0, translateX: -100 },
})`
  display: flex;
  flex: 1;
  flex-direction: column;
  margin: 40px 50px;
`;