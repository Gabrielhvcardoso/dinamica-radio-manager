import { motion } from 'framer-motion';
import styled from 'styled-components';

export const ProgramItem = styled(motion.img)`
  background-color: #202020;
  border-radius: 10px;
  height: 150px;
  object-fit: cover;
  margin: 0px 10px;
  min-width: 150px;
  max-width: 150px;
`;

export const Container = styled(motion.div)`
  background-color: #202020;
  border-radius: 10px;
  height: 500px;
  width: 660px;
`;
