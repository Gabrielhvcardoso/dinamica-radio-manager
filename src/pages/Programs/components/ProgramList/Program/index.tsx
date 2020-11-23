import React, { useContext } from 'react';
import { Container, Image, Overlay } from './styles';

import ProgramsPageContext from '../../../context';
import { Program as ProgramType } from '../../../../../types/Program';

interface ProgramProps {
  program: ProgramType;
}

const Program: React.FC<ProgramProps> = ({ program }) => {
  const { programId, image, title } = program;
  const { setSelected } = useContext(ProgramsPageContext);
  
  return (
    <Container onClick={() => setSelected(programId)}>
      <Overlay>
        <p>{ title }</p>
      </Overlay>
      <Image src={image} alt={title} />
    </Container>
  );
}

export default Program;