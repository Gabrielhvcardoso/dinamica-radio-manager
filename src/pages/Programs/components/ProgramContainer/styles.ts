import styled from 'styled-components';
import { motion } from 'framer-motion';

export const ImageHeader = styled.img`
  height: 150px;
  object-fit: cover;
  width: 100%;
`;

export const Overlay = styled(motion.div).attrs({
  initial: { opacity: 0 },
  animate: { opacity: 1 },
  exit: { opacity: 0 },
  transition: {
    type: 'spring',
    stiffness: 260,
    damping: 20
  },
})`
  background-color: rgba(0, 0, 0, 0.6);
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  z-index: 2;
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const Container = styled(motion.div).attrs({
  initial: { scale: 0 },
  animate: { scale: 1 },
  exit: { scale: 0 },
  transition: {
    type: 'spring',
    stiffness: 500,
    damping: 30
  }
})`
  background-color: #202020;
  border-radius: 10px;
  color: white;
  height: 500px;
  overflow: hidden;
  position: absolute;
  width: 660px;
`;

export const Title = styled.span`
  box-sizing: border-box;
  font-size: 32px;
  font-weight: 700;
  height: 44px;
  left: 0px;
  line-height: 44px;
  padding: 0px 15px 20px;
  position: absolute;
  text-shadow: 0px 0px 10px #000000ee;
  text-transform: capitalize;
  top: 100px;
  width: 100%;
`;
