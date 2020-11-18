import React, { RefObject } from 'react';
import { Container, ProgramTitle, Draggable, TimeDetail } from './styles';

interface ProgramProps {
  dragConstraints?: RefObject<HTMLDivElement>,
  title?: string,
  style?: {},
  onMouseDown?: (e: any) => void
}

const Program: React.FC<ProgramProps> = ({ dragConstraints, title, style,onMouseDown }) => {
  return (
    <Container dragConstraints={dragConstraints} style={style} onMouseDown={onMouseDown}>
      <Draggable className="right" />

      <TimeDetail>00H - 04H</TimeDetail>
      <ProgramTitle>{ title }</ProgramTitle>
    </Container>
  );
}

export default Program;