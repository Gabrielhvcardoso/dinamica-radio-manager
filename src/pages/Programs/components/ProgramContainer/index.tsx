import React, { useContext, useMemo } from 'react';
import { AnimatePresence } from 'framer-motion';
import { CategoryList, CategoryTag, Container, ImageEdit, ImageHeader, ImageOverlay, Overlay, Title } from './styles';

import ProgramsPageContext from '../../context';

import { Icon } from '@mdi/react';
import { mdiImageEditOutline } from '@mdi/js';

const ProgramContainer: React.FC = () => {
  const { programs, selected, setSelected } = useContext(ProgramsPageContext);
  const onDismiss = () => setSelected(null);

  const program = useMemo(() => {
    if (selected) {
      return programs.find((item) => item.programId === selected);
    }

    return null;
  }, [selected, programs])

  return (
    <AnimatePresence>
      { selected && (
        <Overlay onClick={onDismiss}>
          <Container onClick={e => e.stopPropagation()} layoutId={selected?.toString()}>

            <ImageHeader src={ program?.image } alt={ program?.title } />

            <div style={{ margin: 20 }}>
              <ImageOverlay>
                <Title>{ program?.title }</Title>
                <ImageEdit>
                  <Icon path={mdiImageEditOutline}
                    title="Alterar imagem"
                    size={1}
                    color="#ffffff"
                  />
                </ImageEdit>
              </ImageOverlay>

              <CategoryList>
                { program?.tags ? program.tags.map((tag) => (
                  <CategoryTag>{ tag }</CategoryTag>
                )) : (
                  <CategoryTag>Nenhuma categoria</CategoryTag>
                )}

                <CategoryTag style={{ cursor: 'pointer' }}>Atribuir</CategoryTag>
              </CategoryList>
            </div>          
          </Container>
        </Overlay>
      )}
    </AnimatePresence>
  );
}

export default ProgramContainer;