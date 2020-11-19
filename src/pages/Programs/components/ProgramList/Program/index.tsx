import React, { useContext } from 'react';
import { Container } from './styles';

import ProgramsPageContext from '../../../context';
import { Program as ProgramType } from '../../../../../types/Program';

interface ProgramProps {
  program: ProgramType;
}

const Program: React.FC<ProgramProps> = ({ program }) => {
  const { programId } = program;
  const { setSelected } = useContext(ProgramsPageContext);
  
  return (
    <Container layoutId={programId.toString()} onClick={() => setSelected(programId)} />
  );
}

export default Program;
