import styled from 'styled-components';
import { motion, MotionProps } from 'framer-motion';

const HOUR = 4.16;

export const Container = styled(motion.div).attrs({
  drag: 'x',
  whileTap: { scale: 1.01 }
})`
  align-items: flex-start;
  background-color: #E07A5F;
  border-radius: 10px;
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  height: 100px;
  justify-content: space-between;
  margin-right: 0.1%;
  padding: 10px;
  position: relative;
  width: ${HOUR * 6}%;

`;

export const TimeDetail = styled.span`
  background-color: #fff;
  border-radius: 10px;
  font-size: 12px;
  font-weight: 600;
  padding: 0px 8px;
  -webkit-touch-callout: none; /* iOS Safari */
    -webkit-user-select: none; /* Safari */
     -khtml-user-select: none; /* Konqueror HTML */
       -moz-user-select: none; /* Old versions of Firefox */
        -ms-user-select: none; /* Internet Explorer/Edge */
            user-select: none;
`;

export const ProgramTitle = styled.span`
  color: black;
  font-weight: 900;
  -webkit-touch-callout: none; /* iOS Safari */
    -webkit-user-select: none; /* Safari */
     -khtml-user-select: none; /* Konqueror HTML */
       -moz-user-select: none; /* Old versions of Firefox */
        -ms-user-select: none; /* Internet Explorer/Edge */
            user-select: none;
`;

export const Draggable = styled.div`
  background-color: #f2f2f2;
  border-radius: 2.5px;
  cursor: e-resize;
  height: 40px;
  right: -2.5px;
  position: absolute;
  top: 30px;
  width: 5px;
  z-index: 1;
`;
