import update from 'immutability-helper';
import React, { useContext, useState } from 'react';
import { AnimatePresence } from 'framer-motion';
import { Button, Container, TextInput, TextInputSpan, Title } from './styles';
import Alert from '../../../../components/Alert';
import Backdrop from '../../../../components/Backdrop';

import AuthContext from '../../../../context/auth';
import ProgramsPageContext from '../../context';

import { useFetch } from '../../../../hooks';

const CategoryContainer: React.FC = () => {
  const { clientId } = useContext(AuthContext);
  const { openCategory, setOpenCategory, categories, setCategories } = useContext(ProgramsPageContext);
  const onDismiss = () => setOpenCategory(false);

  const [modalMessage, setModalMessage] = useState<string | null>(null);

  const showAlert = (message: string, error: boolean = false) => {
    setModalMessage(message);
    setTimeout(() => setModalMessage(null), 5000);
  };

  const [categoryTitle, setCategoryTitle] = useState<string>('');

  const handleSave = () => {
    const errors = [
      { status: categoryTitle.length < 3, message: 'Título muito curto, digite pelo menos 3 caracteres.' },
      { status: categoryTitle.length > 40, message: 'Título muito longo, o título deve ter no máximo 40 caracteres.' },
      { status: categories.some(item => item.name === categoryTitle), message: 'Já existe uma categoria com esse nome' }
    ];

    const isError = errors.find(item => item.status);
    if (isError) return showAlert(isError.message);

    useFetch.put('/cat', {
      clientId: clientId ?? 0,
      name: categoryTitle
    }, (response) => {
      if (response.code === 'success') {
        const { categoryId } = response;

        setCategories(update(categories, {
          $push: [{
            categoryId,
            name: categoryTitle
          }]
        }));

        onDismiss();
      } else {
        showAlert('Ocorreu um erro ao tentar inserir a nova categoria');
      }
    });
  };

  return (
    <AnimatePresence>
      {
        openCategory && (
          <Backdrop onClick={onDismiss}>
            <Container onClick={e => e.stopPropagation()}>

              <AnimatePresence>
                {
                  Boolean(modalMessage) && (
                    <Alert error >{ modalMessage }</Alert>
                  )
                }
              </AnimatePresence>

              <Title>Criar categoria</Title>

              <div style={{ display: 'flex' }}>
                <TextInput
                  value={categoryTitle}
                  onChange={e => setCategoryTitle(e.target.value)}
                  maxLength={40}
                  placeholder="Título da categoria"
                />
                <TextInputSpan>{`${categoryTitle.length}/40`}</TextInputSpan>
              </div>

              <div style={{ display: 'flex', marginTop: 20, justifyContent: 'flex-end' }}>
                <Button onClick={onDismiss}>Cancelar</Button>
                <Button onClick={handleSave}>Salvar</Button>
              </div>
            </Container>
          </Backdrop>
        )
      }
    </AnimatePresence>
  );
};

export default CategoryContainer;
