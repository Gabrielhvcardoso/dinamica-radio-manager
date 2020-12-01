// import { motion } from 'framer-motion';
import { motion } from 'framer-motion';
import styled from 'styled-components';

export const Backdrop = styled(motion.div).attrs({
  initial: { backgroundColor: 'rgba(0,0,0,0)' },
  animate: { backgroundColor: 'rgba(0,0,0,0.6)' },
  exit: { backgroundColor: 'rgba(0,0,0,0)' },
  transition: {
    type: 'spring',
    stiffness: 500,
    damping: 42
  }
})`
  position: fixed;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  z-index: 2;
`;

export const DropDown = styled(motion.div).attrs({
  initial: { opacity: 0, scale: 0 },
  animate: { opacity: 1, scale: 1 },
  exit: { opacity: 0, scale: 0 },
  transition: {
    type: 'spring',
    stiffness: 500,
    damping: 42
  }
})`
  align-self: auto;
  background-color: #fff;
  border-radius: 10px 10px 10px 10px;
  padding: 10px 0px;
  position: absolute;
  transform-origin: top left;
  width: 250px;
`;

export const MenuItem = styled.div`
  align-items: center;
  cursor: pointer;
  display: flex;
  height: 40px;
  padding: 0px 10px;

  &:hover {
    background-color: #eee;
  }
`;
