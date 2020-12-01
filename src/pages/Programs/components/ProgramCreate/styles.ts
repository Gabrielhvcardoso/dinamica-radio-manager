import { motion } from 'framer-motion';
import styled from 'styled-components';

export const Backdrop = styled(motion.div).attrs({
  initial: { backgroundColor: 'rgba(0, 0, 0, 0)' },
  animate: { backgroundColor: 'rgba(0, 0, 0, 0.6)' },
  exit: { backgroundColor: 'rgba(0, 0, 0, 0)' }
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
  box-sizing: border-box;
  color: white;
  display: flex;
  flex-direction: column;
  overflow-y: auto;
  padding: 140px 50px 50px;
  
  position: relative;
  max-height: 95%;

  width: 1000px;
  max-width: 95%;
`;

export const TopImage = styled(motion.img).attrs({
  initial: { opacity: 0, translateY: -50 },
  animate: { opacity: 1, translateY: 0 },
  exit: { opacity: 0, translateY: -50 }
})`
  background-color: #30303033;
  position: absolute;
  height: 100px;
  object-fit: cover;
  top: 0px;
  left: 0px;
  right: 0px;
  width: 100%;
`;

export const Headline = styled.span`
  font-size: 12px;
  font-weight: 600;
  color: #8BC298;
  text-transform: uppercase;
`;

export const TextInput = styled.input`
  background-color: #171717;
  box-sizing: border-box;
  color: white;
  font-family: 'Manrope', sans-serif;
  font-size: 14px;
  border: none;
  border-radius: 4px;
  height: 40px;
  outline: none;
  margin-top: 5px;
  margin-bottom: 5px;
  padding: 10px;
  width: 100%;
`;

export const ImagePicker = styled.label`
  background-color: #171717;
  box-sizing: border-box;
  padding: 10px 10px;
  border-radius: 4px;
  box-sizing: border-box;
  cursor: pointer;
  height: 40px;
  display: block;
  margin-top: 5px;
  margin-bottom: 5px;
  text-align: center;
  transition: .2s;

  &:hover {
    background-color: #8BC298;
    color: black;
  }
`;

export const Button = styled.button`
  background-color: #303030;
  border: none;
  border-radius: 4px;
  color: #6F6F6F;
  cursor: pointer;
  font-family: 'Manrope', sans-serif;
  font-size: 12px;
  font-weight: 800;
  margin-left: 10px;
  outline: none;
  padding: 8px 20px 8px;
  text-transform: uppercase;
  transition: .2s;

  &:hover {
    color: white;
  }
`;
