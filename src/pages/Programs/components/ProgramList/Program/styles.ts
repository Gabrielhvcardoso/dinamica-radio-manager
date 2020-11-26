import styled from 'styled-components';
import { motion } from 'framer-motion';

export const Overlay = styled(motion.div)`
  position: absolute;
  top: 0px;
  left: 0px;
  bottom: 0px;
  right: 0px;
  padding: 0px 10px;
  transition: .2s;

  & * {
    opacity: 0;
    color: white;
  }
`;

interface ContainerProps {
  isMobile: boolean;
}

export const Container = styled(motion.div)<ContainerProps>`
  background-color: #303030;
  border-radius: 10px;
  cursor: pointer;
  height: 150px;
  margin: 10px 10px;
  overflow: hidden;
  position: relative;
  transition: .2s;
  width: 150px;
  ${props => props.isMobile ? 'flex: 1 0 auto;' : ''}

  &:hover {
    transform: scale(1.1);
  }

  &:hover ${Overlay} {
    background-color: #000000AA;
  }

  &:hover ${Overlay} * {
    opacity: 1;
  }
`;

export const Image = styled(motion.img)`
  width: 100%;
  height: 100%;
  object-fit: cover;
`;
