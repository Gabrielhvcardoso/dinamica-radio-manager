import styled from 'styled-components';
import { motion } from 'framer-motion';

export const ImageHeader = styled.img`
  height: 150px;
  object-fit: cover;
  width: 100%;
`;

interface ImageDeleteProps {
  confirm?: boolean
}

export const ImageDelete = styled.div<ImageDeleteProps>`
  background-color: ${props => props.confirm ? '#ff000055' : '#00000055'};
  border-radius: 50%;
  cursor: pointer;
  display: flex;
  margin-bottom: 5px;
  padding: 8px;
  transition: .2s;

  &:hover {
    background-color: ${props => props.confirm ? '#ff0000AA' : '#000000AA'};
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

export const Title = styled(motion.h1).attrs({
  initial: { translateX: -100, opacity: 0 },
  animate: { translateX: 0, opacity: 1 },
  exit: { translateX: -100, opacity: 0 }
})`
  align-self: center;
  box-sizing: border-box;
  font-size: 32px;
  font-weight: 700;
  height: 44px;
  line-height: 44px;
  text-shadow: 0px 0px 10px #000000ee;
  text-transform: capitalize;
`;

export const CategoryList = styled.div`
  display: flex;
  flex-wrap: wrap;
  margin-left: -5px;

  & * {
    margin-left: 5px;
    margin-bottom: 8px;
  }
`;

export const CategoryTag = styled.div`
  align-self: flex-start;
  background-color: #171717;
  border-radius: 16px;
  color: #707070;
  cursor: pointer;
  padding: 3px 10px;
  font-size: 14px;

  & + div {
    display: flex;
    align-items: center;
    cursor: pointer;
    width: 20px;
    margin-left: -20px;
    transition: .2s;
    visibility: hidden;
    opacity: 0;

    &:hover {
      margin-left: 0px;
      visibility: visible;
      opacity: 1;
      padding-left: 10px;
    }

    & *:hover {
      filter: brightness(51%);
    }
  }

  &:hover + div {
    margin-left: 0px;
    visibility: visible;
    opacity: 1;
    padding-left: 10px;
  }
`;
