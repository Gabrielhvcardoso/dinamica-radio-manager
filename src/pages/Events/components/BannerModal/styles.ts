import { motion } from 'framer-motion';
import styled from 'styled-components';
import DTitle from '../../../../components/Title';

export const Container = styled(motion.div)`
  background-color: #202020;
  box-sizing: border-box;
  color: white;
  height: 80%;
  padding: 50px;
  width: 80%;
`;

export const Overlay = styled(motion.div).attrs({
  initial: { backgroundColor: 'transparent' },
  animate: { backgroundColor: 'rgba(0, 0, 0, 0.6)' },
  exit: { backgroundColor: 'transparent' }
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
  transition: .2s;  
`;

export const Title = styled(DTitle)`
  margin: 0px;
`;

export const Detail = styled.span`
  font-size: 14px;
`;