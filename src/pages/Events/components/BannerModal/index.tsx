import React, { useContext, useEffect, useState } from 'react';
import { AnimatePresence } from 'framer-motion';
import { Button, CloseButton, Container, Detail, Headline, Helper, ImageBackdrop, ImagePicker, Overlay, Section, Textarea, TextInput, Title } from './styles';

import Select from 'react-select';
import { selectStyles } from './selectStyles';

import { formatDistanceToNow, addDays } from 'date-fns';
import { ptBR } from 'date-fns/locale';

import MobileContext from '../../../../context/mobile';
import ProgramsContext from '../../../../context/data';
import EventsContext from '../../context';

import { mdiClose } from '@mdi/js';
import { Icon } from '@mdi/react';

const BannerModal: React.FC = () => {
  const { isMobile } = useContext(MobileContext);
  const { programs: contextPrograms, categories: contextCategories } = useContext(ProgramsContext);
  const { selected, setSelected } = useContext(EventsContext);
  
  const onDismiss = () => setSelected(null);

  const programs = [
    { value: 0, label: "Nenhum" },
    ...contextPrograms.map(({ programId, title }) => ({ value: programId, label: title }))
  ];

  const categories = [
    { value: 0, label: "Nenhuma" },
    ...contextCategories.map(({ categoryId, name }) => ({ value: categoryId, label: name }))
  ];

  const [event, setEvent] = useState(selected);
  useEffect(() => setEvent(selected), [selected]);

  return (
    <AnimatePresence>
      {
        event && (
          <Overlay onMouseDown={onDismiss}>
            <Container isMobile={isMobile} onMouseDown={e => e.stopPropagation()} layoutId={`banner-${event.bannerId}`}>
              <CloseButton onClick={onDismiss}>
                <Icon path={mdiClose}
                  size={1}
                  color="white"
                />
              </CloseButton>
              <Title>{ event.title !== "" ? event.title : "Criar evento" }</Title>

              { event.image && <ImageBackdrop src={event.image} /> }

              <Detail>
                { 'Criado há ' }
                { formatDistanceToNow(event.createdAt, { locale: ptBR }) }
                {
                  event.expiresAt ? (
                    ' - expira em ' +
                    formatDistanceToNow(addDays(event.createdAt, 2), { locale: ptBR })    
                  ) : <></>
                }
              </Detail>
              <br />

              <div style={{ display: 'flex', flexDirection: isMobile ? "column" : "row", justifyContent: 'space-between', alignItems: "flex-start", marginTop: 20, marginBottom: 20 }}>
                <Section style={{ width: isMobile ? "100%" : 200 }}>
                  <Headline>Data de expiração</Headline>
                  <TextInput type="date" placeholder="00/00/0000" />
                  <Helper>Data para o anúncio parar de ser exibido. (opcional)</Helper>
                </Section>

                <Section style={{ width: isMobile ? "100%" : 200 }}>
                  <Headline>Imagem</Headline>
                  <input type="file" id="filepicker" style={{ display: 'none' }} />
                  <ImagePicker htmlFor="filepicker">
                    Selecione um arquivo
                  </ImagePicker>
                  <Helper>Arquivo de imagem para ser exibido no aplicativo. (opcional)</Helper>
                </Section>

                <Section style={{ width: isMobile ? "100%" : 200 }}>
                  <Headline>Programa alvo</Headline>
                  <Select
                    styles={selectStyles}
                    options={programs}
                    defaultValue={programs[0]}
                    theme={theme => ({ ...theme, backgroundColor: '#202020', borderRadius: 0 })}
                  />
                  <Helper>O programa selecionado e suas informações serão exibidos no anúncio. (opcional)</Helper>
                </Section>

                <Section style={{ width: isMobile ? "100%" : 200 }}>
                  <Headline>Categoria alvo</Headline>
                  <Select styles={selectStyles} options={categories} defaultValue={categories[0]} theme={theme => ({ ...theme, backgroundColor: '#202020', borderRadius: 0 })} />
                  <Helper>A categoria selecionada e seus programas serão exibidos no anúncio. (opcional)</Helper>
                </Section>
              </div>

              <Section>
                <Headline>Link de redirecionamento</Headline>
                <TextInput type="url" placeholder="https://domain.com" />
                <Helper>
                  (opcional) Ao clicar no anúncio o usuário será redirecionado para esse link.
                  Caso haja mais informações para exibir, um botão "acessar" será exibido na parte interior do anúncio.
                </Helper>
              </Section>

              <Section style={{ marginTop: 40 }}>
                <Headline>Descrição</Headline>
                <Textarea>{ event.description }</Textarea>
                <Helper>
                  (opcional) Será exibido na parte interna do anúncio.
                </Helper>
              </Section>
            
              <div style={{ padding: 20 , backgroundColor: '#17171766', borderRadius: 4, marginTop: 30 }}>
                <Helper>
                  É importante ressaltar que não é possível exibir um programa e uma categoria alvo ao mesmo tempo. Caso isso aconteça, haverá a exibição do programa e será adicionado a opção
                  do usuário "ver mais programas".
                </Helper>
              </div>
              
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