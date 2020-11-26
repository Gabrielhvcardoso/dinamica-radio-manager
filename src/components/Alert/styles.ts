import { motion } from 'framer-motion';
import styled from 'styled-components';

interface ContainerProps {
  error?: boolean | null;
  isMobile?: boolean;
}

export const Container = styled(motion.div).attrs({
  initial: { opacity: 0, translateX: -100 },
  animate: { opacity: 1, translateX: 0 },
  exit: { opacity: 0, translateX: -100 },
  transition: {
    type: 'spring',
    stiffness: 500,
    damping: 42
  }
})<ContainerProps>`
  background-color: #303030;
  border-radius: 10px;
  bottom: ${props => props.isMobile ? "90px" : "20px"};
  color: ${props => props.error ? "red" : "white"};
  min-width: 10px;
  max-width: ${props => props.isMobile ? "95%" : "400px"};
  padding: 10px;
  position: fixed;
  ${props => props.isMobile ? "left: 20px;" : ""}
  
  right: 20px;
  z-index: 30;
`;
