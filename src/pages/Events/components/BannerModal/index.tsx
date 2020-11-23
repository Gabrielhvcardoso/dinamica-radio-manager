import React, { useContext } from 'react';
import { AnimatePresence } from 'framer-motion';
import { Button, Container, Detail, Headline, ImagePicker, Overlay, Section, Textarea, TextInput, Title } from './styles';

import Select from 'react-select';
import { selectStyles } from './selectStyles';

import { formatDistanceToNow, addDays } from 'date-fns';
import { ptBR } from 'date-fns/locale';

import EventsContext from '../../context';

const BannerModal: React.FC = () => {
  const { selected, setSelected } = useContext(EventsContext);
  const onDismiss = () => setSelected(null);

  const programs = [
    { value: 0, label: "Nenhum" },
    { value: 1, label: "Program 1" },
    { value: 2, label: "Program 2" },
  ]

  const categories = [
    { value: 0, label: "Nenhuma" },
    { value: 1, label: "Category 1" },
    { value: 2, label: "Category 2" },
  ]

  return(
    <AnimatePresence>
      {
        selected && (
          <Overlay onMouseDown={onDismiss}>
            <Container onMouseDown={e => e.stopPropagation()} layoutId={`banner-${selected.bannerId}`}>
              <Title>{ selected.title !== "" ? selected.title : "Criar evento" }</Title>
              <Detail>
                { 'Criado há ' }
                { formatDistanceToNow(selected.createdAt, { locale: ptBR }) }
                {
                  selected.expiresAt ? (
                    ' - expira em ' +
                    formatDistanceToNow(addDays(selected.createdAt, 2), { locale: ptBR })    
                  ) : <></>
                }
              </Detail>
              <br />
              <Section>
                <Headline>Data de expiração</Headline>
                <TextInput type="date" style={{ maxWidth: 200 }} placeholder="00/00/0000" />
              </Section>

              <Section>
                <Headline>Imagem</Headline>
                <input type="file" id="filepicker" style={{ display: 'none' }} />
                <ImagePicker htmlFor="filepicker">
                  Selecione um arquivo
                </ImagePicker>
              </Section>

              <Section>
                <Headline>Programa alvo</Headline>
                <Select styles={selectStyles} options={programs} defaultValue={programs[0]} theme={theme => ({ ...theme, backgroundColor: '#202020', borderRadius: 0 })} />
              </Section>

              <Section>
                <Headline>Categoria alvo</Headline>
                <Select styles={selectStyles} options={categories} defaultValue={categories[0]} theme={theme => ({ ...theme, backgroundColor: '#202020', borderRadius: 0 })} />
              </Section>

              <Section>
                <Headline>Link de redirecionamento</Headline>
                <TextInput type="url" placeholder="https://domain.com" />
              </Section>

              <Section>
                <Headline>Descrição</Headline>
                <Textarea>{ selected.description }</Textarea>
              </Section>
            

              <div style={{ display: 'flex', marginTop: 20, justifyContent: 'flex-end' }}>
                <Button>Salvar alterações</Button>
              </div>
            </Container>
          </Overlay>
        )
      }
    </AnimatePresence>
  );
}

export default BannerModal;