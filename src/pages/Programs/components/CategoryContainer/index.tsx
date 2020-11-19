import React, { useContext } from 'react';
import { AnimatePresence } from 'framer-motion';
import { Container, Overlay } from './styles';

import ProgramsPageContext from '../../context';

const CategoryContainer: React.FC = () => {
  const { openCategory, setOpenCategory } = useContext(ProgramsPageContext);

  const onDismiss = () => setOpenCategory(false)

  return (
    <AnimatePresence>
      {
        openCategory && (
          <Overlay onClick={onDismiss}>
            <Container />
          </Overlay>
        )
      }
    </AnimatePresence>
  );
}

export default CategoryContainer;
