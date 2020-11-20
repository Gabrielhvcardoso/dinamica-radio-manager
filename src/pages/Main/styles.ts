import { motion } from 'framer-motion';
import styled from 'styled-components';

export const Container = styled(motion.div).attrs({
  initial: { translateX: -100, opacity: 0 },
  animate: { translateX: 0, opacity: 1 },
  exit: { translateX: 100, opacity: 0 }
})`
  margin: 50px;
  display: flex;
  flex-direction: column;
  flex: 1;
`;

export const VerticalView = styled.div`
  display: flex;
  flex: 1;
  flex-direction: row;
  margin-top: 25px;
`;
