import styled from 'styled-components';
import { motion } from 'framer-motion';

export const Container = styled(motion.div)`
  background-color: #171717;
  height: 550px;
  overflow-y: scroll;
  padding: 25px;
  width: 660px;
`;

export const ListView = styled.div`
  display: flex;
  flex-wrap: wrap;
  flex-shrink: 1;
  margin: -5px;
`;

export const Header = styled.div`
  align-items: flex-start;
  display: flex;
  justify-content: space-between;
`;

export const CloseButton = styled.div`
  background-color: #202020;
  border-radius: 10px;
  color: #aaa;
  cursor: pointer;
  height: 20px;
  line-height: 20px;
  text-align: center;
  vertical-align: middle;
  width: 20px;
  transform: rotate(45deg);
  -webkit-touch-callout: none;
    -webkit-user-select: none;
     -khtml-user-select: none;
       -moz-user-select: none;
        -ms-user-select: none;
            user-select: none;

  &:hover {
    background-color: #303030;
  }
`;

export const Program = styled(motion.img)`
  background-color: #202020;
  border-radius: 10px;
  cursor: pointer;
  height: 100px;
  object-fit: cover;
  margin: 5px;
  transition: .2s;
  width: 100px;

  &:hover {
    transform: translate3d(0px, 2px, 150px) scale(1.05);
  }
`;

export const Title = styled.h2`
  color: white;
  font-weight: 100;
  margin-top: 0;
`;
