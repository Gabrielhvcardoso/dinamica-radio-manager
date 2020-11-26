import { motion } from 'framer-motion';
import styled from 'styled-components';

interface RowProps {
  isMobile: boolean;
}

export const Row = styled(motion.div)<RowProps>`
  display: flex;
  flex: 1;
  flex-direction: ${props => props.isMobile ? 'column' : 'row'};
  margin: 10px -10px;

  ${props => props.isMobile
      ? `& *:not(:last-child) {
          margin-bottom: 20px;
        }`
      : ''
    }
`;

export const Container = styled(motion.div).attrs({
  initial: { opacity: 0, translateX: -100 },
  animate: { opacity: 1, translateX: 0 },
  exit: { opacity: 0, translateX: -100 }
})`
  display: flex;
  flex: 1;
  flex-direction: column;
  margin: 40px 50px;
`;
