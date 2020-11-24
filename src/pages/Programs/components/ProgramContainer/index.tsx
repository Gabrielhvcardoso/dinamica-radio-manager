import React, { useContext, useState } from 'react';
import { Portal } from 'react-portal';
import { AnimatePresence } from 'framer-motion';
import { CategoryList, CategoryTag, Container, ImageEdit, ImageHeader, ImageOverlay, Overlay, Title } from './styles';
import { Icon } from '@mdi/react';
import { mdiImageEditOutline } from '@mdi/js';

import CategoryPicker from './components/CategoryPicker';
import ProgramsPageContext from '../../context';

const ProgramContainer: React.FC = () => {
  const { categories, selected, setSelected, setSelectedCategories } = useContext(ProgramsPageContext);
  const [isCategoryPicker, setIsCategoryPicker] = useState<boolean>(false);

  const onDismiss = () => setSelected(null);

  const findCategoryById = (id: number) => {
    return categories.find(({ categoryId }) => categoryId === id);
  }

  const findOtherOfCategory = (id: number) => {
    setSelectedCategories([id]);
    onDismiss();
  }

  return (
    <Portal>
      <AnimatePresence>
        { selected && (
          <Overlay onMouseDown={onDismiss}>
            <Container onMouseDown={e => e.stopPropagation()} layoutId={selected?.toString()}>

              <AnimatePresence>
                {
                  isCategoryPicker && (
                    <CategoryPicker onDismiss={() => setIsCategoryPicker(false)} />
                  )
                }
              </AnimatePresence>

              <ImageHeader src={ selected?.image } alt={ selected?.title } />

              <div style={{ margin: 20 }}>
                <ImageOverlay>
                  <Title>{ selected?.title }</Title>

                  <input style={{ display: 'none' }} type="file" id="file" name="file" />
                  <ImageEdit htmlFor="file">
                    <Icon path={mdiImageEditOutline}
                      title="Alterar imagem"
                      size={1}
                      color="#ffffff"
                    />
                  </ImageEdit>
                </ImageOverlay>

                <CategoryList>
                  { selected?.tags ? selected.tags.map((tag) => (
                    <CategoryTag onClick={() => findOtherOfCategory(tag)}>{ findCategoryById(tag)?.name }</CategoryTag>
                  )) : (
                    <CategoryTag>Nenhuma categoria</CategoryTag>
                  )}

                  <CategoryTag
                    style={{ backgroundColor: '#707070', color: '#171717' }}
                    onClick={() => setIsCategoryPicker(true)}
                  >Atribuir</CategoryTag>
                </CategoryList>
              </div>          
            </Container>
          </Overlay>
        )}
      </AnimatePresence>
    </Portal>
  );
}

export default ProgramContainer;