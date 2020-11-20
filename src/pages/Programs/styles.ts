import { motion } from 'framer-motion';
import styled from 'styled-components';

export const Container = styled(motion.div).attrs({
  initial: { translateX: -100, opacity: 0 },
  animate: { translateX: 0, opacity: 1 },
  exit: { translateX: 100, opacity: 0 }
})`
  align-items: flex-start;
  display: flex;
  flex: 1;
  flex-direction: column;
  margin: 50px;
`;

export const ProgramList = styled.div`
  display: flex;
  flex-wrap: wrap;
  margin: 40px -10px -10px;
`;
