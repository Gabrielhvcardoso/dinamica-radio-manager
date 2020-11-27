import { motion } from 'framer-motion';
import styled from 'styled-components';

export const Container = styled.div`
  display: flex;
  flex-direction: row;
  margin: 0px -5px;
  overflow-x: auto;
  padding-bottom: 5px;
  width: 100%;
`;

export const Add = styled(motion.span)`
  background-color: #303030;
  border-radius: 16px;
  color: white;
  cursor: pointer;
  height: 24px;
  flex: 0 1 auto;
  line-height: 24px;
  min-width: 24px;
  margin: 0px 0px 0px 5px;
  text-align: center;
  transition: .2s;

  &:hover {
    transform: scale(1.1)
  }
`;
