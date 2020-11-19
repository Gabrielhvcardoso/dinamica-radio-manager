import styled from 'styled-components';
import { motion } from 'framer-motion';

export const Container = styled(motion.div)`
  background-color: #303030;
  border-radius: 10px;
  cursor: pointer;
  height: 150px;
  width: 150px;
  margin: 10px 10px;
  transition: .2s;

  &:hover {
    transform: scale(1.1);
  }
`;
