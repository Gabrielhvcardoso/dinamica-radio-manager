import { motion } from 'framer-motion';
import styled from 'styled-components';

export const Backdrop = styled(motion.div).attrs({
  initial: { backgroundColor: 'rgba(0, 0, 0, 0)' },
  animate: { backgroundColor: 'rgba(0, 0, 0, 0.6)' },
  exit: { backgroundColor: 'rgba(0, 0, 0, 0)' },
})`
  align-items: center;
  bottom: 0;
  display: flex;
  left: 0;
  justify-content: center;
  position: absolute;
  right: 0;
  top: 0;
  z-index: 20;
`;

export const Menu = styled(motion.div).attrs({
  initial: { translateY: -100, opacity: 0 },
  animate: { translateY: 0, opacity: 1 },
  exit: { translateY: 100, opacity: 0 },
  transition: {
    type: 'spring',
    stiffness: 500,
    damping: 42
  }
})`
  background-color: #202020;
  border-radius: 10px;
  color: white;
  display: flex;
  flex-direction: column;
  max-height: 600px;
  overflow-y: auto;
  padding: 10px 0px;
  width: 400px;
  max-width: 95%;
`;

export const MenuItem = styled.div`
  align-items: center;
  cursor: pointer;
  display: flex;
  height: 50px;
  min-height: 50px;
  padding: 0px 15px;
  transition: .2s;

  &:hover {
    background-color: rgba(1, 1, 1, 0.5);
  }
`;
