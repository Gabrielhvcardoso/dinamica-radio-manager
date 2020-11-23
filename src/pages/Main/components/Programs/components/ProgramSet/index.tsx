import React, { useState } from 'react';
import { AnimateSharedLayout, AnimatePresence } from 'framer-motion';
import Backdrop from '../../../../../../components/Backdrop';
import { Program } from '../../../../../../types/Program';
import { Container, ProgramItem } from './styles';

const ProgramSet: React.FC<{ program: Program }> = (props) => {
  const [isSelected, setIsSelected] = useState<boolean>(false);
  const { programId, title, image } = props.program;
  
  const layoutId = `programbox-${programId}`;

  const onDismiss = () => {
    setIsSelected(false);
  }

  return (
    <AnimateSharedLayout>
      <ProgramItem onClick={() => setIsSelected(true)} layout layoutId={layoutId} src={image} alt={title} />
      <AnimatePresence>
        {
          isSelected && (
            <Backdrop onClick={onDismiss}>
              <Container layoutId={layoutId} onClick={e => e.stopPropagation()} />
            </Backdrop>
          )
        }
      </AnimatePresence>
    </AnimateSharedLayout>
  );
}

export default ProgramSet;
