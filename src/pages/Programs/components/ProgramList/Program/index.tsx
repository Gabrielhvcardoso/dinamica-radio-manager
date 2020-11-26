import React, { useContext } from 'react';
import { Container, Image, Overlay } from './styles';

import MobileContext from '../../../../../context/mobile';
import ProgramsPageContext from '../../../context';
import { Program as ProgramType } from '../../../../../types/Program';

interface ProgramProps {
  program: ProgramType;
}

const Program: React.FC<ProgramProps> = ({ program }) => {
  const { image, title } = program;
  const { isMobile } = useContext(MobileContext);
  const { setSelected } = useContext(ProgramsPageContext);

  return (
    <Container isMobile={isMobile} onClick={() => setSelected(program)}>
      <Overlay>
        <p>{ title }</p>
      </Overlay>
      <Image src={image} alt={title} />
    </Container>
  );
};

export default Program;
