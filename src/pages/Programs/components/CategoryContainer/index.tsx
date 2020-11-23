import update from 'immutability-helper';
import React, { useContext, useState } from 'react';
import { AnimatePresence } from 'framer-motion';
import { Button, Container, Overlay, TextInput, TextInputSpan, Title } from './styles';

import Alert from '../../../../components/Alert';
import ProgramsPageContext from '../../context';

const CategoryContainer: React.FC = () => {
  const { openCategory, setOpenCategory, categories, setCategories } = useContext(ProgramsPageContext);
  const onDismiss = () => setOpenCategory(false);

  const [modalMessage, setModalMessage] = useState<string | null>(null);

  const showAlert = (message: string, error: boolean = false) => {
    setModalMessage(message);
    setTimeout(() => setModalMessage(null), 5000);
  }

  const [categoryTitle, setCategoryTitle] = useState<string>("");

  const handleSave = () => {
    let errors = [
      { status: categoryTitle.length < 3, message: "Título muito curto, digite pelo menos 3 caracteres." },
      { status: categoryTitle.length > 40, message: "Título muito longo, o título deve ter no máximo 40 caracteres." },
      { status: categories.some(item => item.name === categoryTitle), message: "Já existe uma categoria com esse nome" },
    ];

    const isError = errors.find(item => item.status); 
    if (isError) return showAlert(isError.message);
  
    setCategories(update(categories, {
      $push: [{
        categoryId: categories[categories.length - 1].categoryId + 1,
        name: categoryTitle
      }]
    }));

    onDismiss();
  }

  return (
    <AnimatePresence>
      {
        openCategory && (
          <Overlay onClick={onDismiss} style={{ overflow: 'hidden' }}>
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
          </Overlay>
        )
      }
    </AnimatePresence>
  );
}

export default CategoryContainer;
