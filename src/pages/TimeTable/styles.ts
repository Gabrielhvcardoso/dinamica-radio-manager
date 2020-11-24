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

export const CenteredContainer = styled(motion.div).attrs({
  initial: { translateX: -100, opacity: 0 },
  animate: { translateX: 0, opacity: 1 },
  exit: { translateX: 100, opacity: 0 }
})`
  align-items: center;
  background-color: #171717;
  bottom: 70px;
  color: white;
  display: flex;
  justify-content: center;
  left: 0px;
  position: absolute;
  right: 0px;
  top: 0px;
`;


export const Text = styled.span`
  max-width: 80%;
  text-align: center;
`;
