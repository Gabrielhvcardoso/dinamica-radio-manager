import { motion } from 'framer-motion';
import styled from 'styled-components';

interface ContainerProps {
  color?: string;
}

export const Container = styled(motion.div)<ContainerProps>`
  align-self: stretch;
  background-color: ${props => props.color ?? '#333'};
  cursor: pointer;
  flex: 1;
  margin: 0px 10px;
  object-fit: cover;
  transition: .6s transform;

  &:hover {
    z-index: 1;
    transform: scale(1.1);
    box-shadow: 0px 0px 20px #22222222;
  }
`;

export const Title = styled.span`
  color: #8bc298;
  font-size: 42px;
  font-weight: 600;
  line-height: 42px;
`;
