import React, { useContext, useEffect, useState } from 'react';
import { AnimatePresence } from 'framer-motion';
import { Button, CloseButton, Container, Detail, Headline, Helper, ImageBackdrop, ImagePicker, Overlay, Section, Textarea, TextInput, Title } from './styles';

import Select from 'react-select';
import { selectStyles } from './selectStyles';

import { formatDistanceToNow, addDays, format, addHours } from 'date-fns';
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
    ...contextPrograms.map(({ programId, title, image }) => ({ value: programId, label: title, image  }))
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
                    formatDistanceToNow(addDays(event.expiresAt, 2), { locale: ptBR })
                    +
                    ' - (' +
                    format(event.expiresAt, "iiii, dd 'de' MMMM 'de' yyyy 'às' HH:mm", { locale: ptBR }) + ')'
                  ) : <></>
                }
              </Detail>
              <br />

              <div style={{ display: 'flex', flexDirection: isMobile ? "column" : "row", justifyContent: 'space-between', alignItems: "flex-start", marginTop: 20, marginBottom: 20 }}>
                <Section style={{ width: isMobile ? "100%" : 200 }}>
                  <Headline>Data de expiração</Headline>
                  <TextInput
                    defaultValue={event.expiresAt ? format(event.expiresAt, 'yyyy-MM-dd') : undefined}
                    type="date"
                    placeholder="00/00/0000"
                    onChange={e => setEvent({
                      ...event,
                      expiresAt: addHours(e.target.valueAsNumber, 3).getTime()
                    })}
                  />
                  <Helper>Data para o anúncio deixar de ser exibido. (opcional)</Helper>
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
                    defaultValue={event.program ? programs[programs.findIndex(({ value }) => value === event.program?.programId )] : programs[0]}
                    onChange={(e: any) => setEvent({
                      ...event,
                      program: {
                        programId: e.value,
                        programTitle: e.label,
                        programImage: e.image
                      }
                    })}
                    theme={theme => ({ ...theme, backgroundColor: '#202020', borderRadius: 0 })}
                  />
                  <Helper>O programa selecionado e suas informações serão exibidos no anúncio. (opcional)</Helper>
                </Section>

                <Section style={{ width: isMobile ? "100%" : 200 }}>
                  <Headline>Categoria alvo</Headline>
                  <Select
                    styles={selectStyles}
                    options={categories}
                    defaultValue={event.category ? categories[categories.findIndex(({ value }) => value === event.category?.categoryId )] : categories[0]}
                    onChange={(e: any) => setEvent({
                      ...event,
                      category: {
                        categoryId: e.value,
                        categoryName: e.label
                      }
                    })}
                    theme={theme => ({ ...theme, backgroundColor: '#202020', borderRadius: 0 })}
                  />
                  <Helper>A categoria selecionada e seus programas serão exibidos no anúncio. (opcional)</Helper>
                </Section>
              </div>

              <Section>
                <Headline>Link de redirecionamento</Headline>
                <TextInput
                  defaultValue={event.link ?? ''}
                  type="url"
                  placeholder="https://domain.com"
                  onChange={(e) => setEvent({...event, link: e.target.value })}
                />
                <Helper>
                  (opcional) Ao clicar no anúncio o usuário será redirecionado para esse link.
                  Caso haja mais informações para exibir, um botão "acessar" será exibido na parte interior do anúncio.
                </Helper>
              </Section>

              <Section style={{ marginTop: 40 }}>
                <Headline>Descrição</Headline>
                <Textarea onChange={(e) => setEvent({...event, description: e.target.value })} autoCorrect="false">{ event.description }</Textarea>
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