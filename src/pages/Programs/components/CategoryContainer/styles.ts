import styled from 'styled-components';
import { motion } from 'framer-motion';

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
  transition: {
    type: 'spring',
    stiffness: 500,
    damping: 42
  }
})`
  background-color: #303030;
  border-radius: 10px;
  box-sizing: border-box;
  color: white;
  display: flex;
  flex-direction: column;
  width: 660px;
  padding: 20px;
  position: absolute;
`;

export const Title = styled.h2`
  margin-top: 0px;
`;

export const TextInputSpan = styled.span`
  // position: absolute;
  align-self: center;
  width: 50px;
  margin-right: -50px;
  transform: translateX(-50px);
`;

export const TextInput = styled.input`
  background-color: #00000022;
  border: none;
  border-bottom: 1px solid transparent;
  border-radius: 4px 4px 0px 0px;
  color: white;
  flex: 1;
  font-size: 17px;
  font-weight: 600;
  height: 40px;
  padding: 0px 10px;
  outline: none;
  transition: .2s;

  &:focus {
    border-bottom: 1px solid white;
  }
`;

export const Button = styled.button`
  background-color: #404040;
  border: none;
  border-radius: 4px;
  color: white;
  cursor: pointer;
  font-size: 17px;
  height: 40px;
  margin-left: 10px;
  outline: none;
  transition: .6s;
  width: 100px;
`;
