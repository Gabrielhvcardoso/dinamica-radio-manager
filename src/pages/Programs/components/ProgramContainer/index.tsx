import React, { useContext, useState } from 'react';
import { Portal } from 'react-portal';
import { AnimatePresence, motion } from 'framer-motion';
import { CategoryList, CategoryTag, Container, ImageDelete, ImageEdit, ImageHeader, ImageOverlay, Title } from './styles';
import { Icon } from '@mdi/react';
import { mdiImageEditOutline, mdiDeleteOutline, mdiClose } from '@mdi/js';
import update from 'immutability-helper';

import CategoryPicker from './components/CategoryPicker';
import ProgramsPageContext from '../../context';
import { useFetch } from '../../../../hooks';
import Backdrop from '../../../../components/Backdrop';
import Alert from '../../../../components/Alert';

const ProgramContainer: React.FC = () => {
  const { categories, programs, setPrograms, selected, setSelected, setSelectedCategories } = useContext(ProgramsPageContext);
  const [confirmDelete, setConfirmDelete] = useState<boolean>(false);
  const [isCategoryPicker, setIsCategoryPicker] = useState<boolean>(false);

  const [error, setError] = useState<string | null>(null);
  const showError = (message: string) => {
    setError(message);
    setTimeout(() => {
      setError(null);
    }, 4000);
  };

  const onDismiss = () => {
    setSelected(null);
    setConfirmDelete(false);
  };

  const findCategoryById = (id: number) => {
    return categories.find(({ categoryId }) => categoryId === id);
  };

  const findOtherOfCategory = (id: number) => {
    setSelectedCategories([id]);
    onDismiss();
  };

  const handleDeleteTag = (categoryId: number) => {
    useFetch.delete(`/tag/${selected?.programId}/${categoryId}`, (response: any) => {
      if (response.code === 'success') {
        handleRemoveTag(categoryId);
      } else {
        alert(response.message ?? 'No error message received.');
      }
    });
  };

  const handleRemoveTag = (categoryId: number) => {
    if (selected) {
      if (selected.tags) {
        const programIndex = programs.findIndex(({ programId }) => programId === selected?.programId);

        const program = {
          ...selected,
          tags: selected.tags.filter((tag) => tag !== categoryId)
        };

        setSelected(program);
        setPrograms(update(programs, {
          [programIndex]: { $set: program }
        }));
      }
    }
  };

  const handleDelete = () => {
    if (selected) {
      const { programId } = selected;
      const index = programs.findIndex(item => item.programId === programId);

      useFetch.delete(`/pro/${programId}`, (response) => {
        if (response.code === 'success') {
          setPrograms(update(programs, {
            $splice: [[index, 1]]
          }));
          onDismiss();
        } else {
          showError('Não foi possível remover este programa, tente novamente.');
        }
      });
    }
  };

  return (
    <Portal>
      <AnimatePresence>
        { selected && (
          <Backdrop onMouseDown={onDismiss}>
            {
              error && (
                <Alert>
                  { error }
                </Alert>
              )
            }
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
                  <div>
                    <input style={{ display: 'none' }} type="file" id="file" name="file" />

                    <ImageDelete title={confirmDelete ? 'Clique para confirmar' : 'Excluir produto'} confirm={confirmDelete} onClick={confirmDelete ? () => handleDelete() : () => setConfirmDelete(true)}>
                      <Icon path={mdiDeleteOutline}
                        size={1}
                        color={'white'}
                      />
                    </ImageDelete>

                    <ImageEdit title="Alterar imagem" htmlFor="file">
                      <Icon path={mdiImageEditOutline}
                        size={1}
                        color="#ffffff"
                      />
                    </ImageEdit>
                  </div>
                </ImageOverlay>

                <CategoryList>
                  { selected?.tags
                    ? selected.tags.map((tag) => (
                      <AnimatePresence key={tag}>
                        <motion.div
                          initial={{ translateX: -100, opacity: 0 }}
                          animate={{ translateX: 0, opacity: 1 }}
                          exit={{ translateX: -100, opacity: 0 }}
                          style={{ display: 'flex', alignItems: 'center' }}
                        >
                          <CategoryTag onClick={() => findOtherOfCategory(tag)}>{ findCategoryById(tag)?.name }</CategoryTag>
                          <div onClick={() => handleDeleteTag(tag)}>
                            <Icon
                              style={{ backgroundColor: 'rgba(0, 0, 0, 0.6)', boxSizing: 'border-box', borderRadius: '50%', padding: 3, margin: 'auto' }}
                              path={mdiClose}
                              size={0.8}
                              color="white"
                            />
                          </div>
                        </motion.div>
                      </AnimatePresence>
                      ))
                    : (
                    <CategoryTag>Nenhuma categoria</CategoryTag>
                      )}
                  <motion.div
                    initial={{ translateX: -100, opacity: 0 }}
                    animate={{ translateX: 0, opacity: 1 }}
                    exit={{ translateX: -100, opacity: 0 }}
                    style={{ display: 'flex', alignItems: 'center' }}
                  >
                    <CategoryTag
                      style={{ marginLeft: 10, backgroundColor: '#707070', color: '#171717' }}
                      onClick={() => setIsCategoryPicker(true)}
                    >Atribuir</CategoryTag>
                  </motion.div>

                </CategoryList>
              </div>
            </Container>
          </Backdrop>
        )}
      </AnimatePresence>
    </Portal>
  );
};

export default ProgramContainer;
