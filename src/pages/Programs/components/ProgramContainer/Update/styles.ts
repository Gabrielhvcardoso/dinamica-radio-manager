import styled from 'styled-components';
import { motion } from 'framer-motion';

export const Button = styled(motion.button).attrs({
  initial: { opacity: 0, translateX: -40 },
  animate: { opacity: 1, translateX: 0 },
  exit: { opacity: 0, translateX: -40 }
})`
  background-color: #404040;
  border: none;
  border-radius: 4px;
  color: white;
  cursor: pointer;
  font-size: 17px;
  outline: none;
  padding: 10px 25px;
  transition: .2s;

  &:hover {
    background-color: #303030;
  }
`;

export const ImageHeader = styled.img`
  height: 150px;
  object-fit: cover;
  width: 100%;
`;

export const EditClose = styled.div`
  background-color: #00000055;
  border-radius: 50%;
  cursor: pointer;
  display: flex;
  margin-bottom: 5px;
  padding: 8px;
  transition: .2s;

  &:hover {
    background-color: #000000AA;
  }
`;

export const ImageEdit = styled.label`
  background-color: #00000055;
  border-radius: 50%;
  cursor: pointer;
  display: flex;
  margin-bottom: 5px;
  padding: 8px;
  transition: .2s;

  &:hover {
    background-color: #000000AA;
  }
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
  /* height: 500px; */
  overflow: hidden;
  position: absolute;
  width: 660px;
  max-width: 95%;
`;

export const ImageOverlay = styled.div`
  align-items: flex-end;
  box-sizing: border-box;
  display: flex;
  height: 44px;
  justify-content: space-between;
  left: 0px;
  padding: 0px 15px 5px;
  position: absolute;
  top: 110px;
  width: 100%;
`;

export const Title = styled(motion.div).attrs({
  contentEditable: true
})`
  align-self: center;
  box-sizing: border-box;
  font-size: 32px;
  font-weight: 700;
  height: 44px;
  line-height: 44px;
  text-shadow: 0px 0px 10px #000000ee;
`;
