import { motion } from 'framer-motion';
import styled from 'styled-components';

import noimage from '../../../../../../assets/images/noimage.svg';

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
  border-radius: 10px;
  background-color: #000;
  display: flex;
  height: 500px;
  object-fit: cover;
  overflow: hidden;
  width: 500px;
  max-width: 95%;
`;

interface ImageProps {
  source?: string
}

export const ImageBackground = styled.div<ImageProps>`
  align-self: stretch;
  flex: 1;
  background-image: url(${props => props.source ?? noimage});
  background-repeat: no-repeat;
  background-size: cover;
`;