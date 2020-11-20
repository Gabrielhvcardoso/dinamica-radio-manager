import React, { useContext, useState } from 'react';
import { AnimatePresence } from 'framer-motion';
import { Button, Container, Overlay, TextInput, TextInputSpan, Title } from './styles';

import Alert from '../../../../components/Alert';
import ProgramsPageContext from '../../context';

const CategoryContainer: React.FC = () => {
  const { openCategory, setOpenCategory, categories, setCategories } = useContext(ProgramsPageContext);
  const onDismiss = () => setOpenCategory(false);

  const [modalError, setModalError] = useState<boolean>(false);
  const [modalMessage, setModalMessage] = useState<string | null>(null);

  const showAlert = (message: string, error: boolean = false) => {
    setModalMessage(message);
    setModalError(error);

    setTimeout(() => {
      setModalMessage(null);
    }, 5000);
  }

  const [categoryTitle, setCategoryTitle] = useState<string>("");

  const handleSave = () => {
    showAlert("Teste de alerta");
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
                    <Alert error>
                      Título da categoria não pode ultrapassar 40 caracteres e agora vou escrever um texto longo para demonstrar a quebra de linha no tamanho máximo
                    </Alert>
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
