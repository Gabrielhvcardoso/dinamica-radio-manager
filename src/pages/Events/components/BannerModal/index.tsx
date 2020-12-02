import update from 'immutability-helper';
import React, { createRef, useContext, useEffect, useState } from 'react';
import { AnimatePresence } from 'framer-motion';
import Backdrop from '../../../../components/Backdrop';
import { Button, CloseButton, Container, Detail, Headline, Helper, ImageBackdrop, ImagePicker, Section, Textarea, TextInput, Title } from './styles';

import Select from 'react-select';
import { selectStyles } from './selectStyles';

import { formatDistanceToNow, addDays, format, addHours } from 'date-fns';
import { ptBR } from 'date-fns/locale';

import AuthContext from '../../../../context/auth';
import MobileContext from '../../../../context/mobile';
import ProgramsContext from '../../../../context/data';
import EventsContext from '../../context';

import { Banner } from '../../../../types/Banner';

import { mdiClose } from '@mdi/js';
import { Icon } from '@mdi/react';
import { useFetch } from '../../../../hooks';
import Alert from '../../../../components/Alert';

const BannerModal: React.FC = () => {
  const { clientId } = useContext(AuthContext);
  const { isMobile } = useContext(MobileContext);
  const { programs: contextPrograms, categories: contextCategories } = useContext(ProgramsContext);
  const { selected, setSelected, isCreating, setIsCreating, events, setEvents } = useContext(EventsContext);

  const [message, setMessage] = useState<string | null>(null);
  const showMessage = (msg: string) => {
    setMessage(msg);
    setTimeout(() => {
      setMessage(null);
    }, 3000);
  };

  const imageRef = createRef<HTMLInputElement>();

  const onDismiss = () => {
    setSelected(null);
    setIsCreating(false);
  };

  const programs = [
    { value: 0, label: 'Nenhum' },
    ...contextPrograms.map(({ programId, title, image }) => ({ value: programId, label: title, image }))
  ];

  const categories = [
    { value: 0, label: 'Nenhuma' },
    ...contextCategories.map(({ categoryId, name }) => ({ value: categoryId, label: name }))
  ];

  const [event, setEvent] = useState<Banner | null>(selected);
  const [eventImage, setEventImage] = useState<string | ArrayBuffer | null>(null);
  useEffect(() => isCreating ? setEvent({} as Banner) : setEvent(selected), [selected, isCreating]);

  const onProgramFileChange = () => {
    if (imageRef.current?.files) {
      const file = imageRef.current.files[0];
      const reader = new FileReader();

      reader.readAsDataURL(file);
      reader.onloadend = (e) => {
        setEventImage(reader.result);
      };
    }
  };

  const handleRemoveImage = () => {
    useFetch.get(`/ban/rm/${selected?.bannerId}`, (response: any) => {
      if (response.code === 'success') {
        const index = events.findIndex(({ bannerId }) => bannerId === event?.bannerId);
        setEvents(update(events, { [index]: { $set: { ...events[index], image: undefined } } }));
        showMessage('Image removida!');
      } else {
        showMessage('Não foi possível remover a imagem desse evento. Tente novamente.');
      }
    });
  };

  const handleDelete = () => {
    useFetch.delete(`/ban/${selected?.bannerId}`, (response: any) => {
      if (response.code === 'success') {
        const index = events.findIndex(({ bannerId }) => bannerId === event?.bannerId);
        setEvents(update(events, {
          $splice: [[index, 1]]
        }));
        onDismiss();
      }
    });
  };

  const handleSave = () => {
    console.log(event);

    const data = new FormData();

    clientId && data.append('clientId', clientId.toString());
    event?.title && data.append('title', event.title);
    event?.description && data.append('description', event.description);
    event?.program?.programId && data.append('targetProgram', event.program.programId.toString());
    event?.category?.categoryId && data.append('targetCategory', event.category?.categoryId.toString());
    event?.link && data.append('link', event?.link);
    event?.expiresAt && data.append('expiresAt', event.expiresAt.toString());
    imageRef?.current?.files && data.append('file', imageRef.current.files[0]);

    if (isCreating) {
      useFetch.put('/ban', data, (response) => {
        if (response.code === 'success') {
          showMessage('Evento salvo com sucesso!');
          if (event) {
            setEvents(update(events, {
              $push: [{
                ...event,
                createdAt: new Date().getTime(),
                image: typeof (eventImage) === 'string' ? eventImage : event.image
              }]
            }));
          }
        } else {
          showMessage('Ocorreu um erro ao criar esse evento.');
        }
      });
    } else {
      useFetch.post(`/ban/${event?.bannerId}`, data, (response) => {
        if (response.code === 'success') {
          const index = events.findIndex(({ bannerId }) => bannerId === event?.bannerId);
          if (event) {
            setEvents(update(events, {
              [index]: {
                $set: {
                  ...event,
                  image: typeof (eventImage) === 'string' ? eventImage : event.image
                }
              }
            }));
          }
          showMessage('Alterações salvas com sucesso!');
        } else {
          showMessage('Ocorreu um erro ao editar esse evento.');
        }
      });
    }
  };

  return (
    <AnimatePresence>
      {
        event && (
          <Backdrop onMouseDown={onDismiss}>
            {
              message && (
                <Alert>
                  { message }
                </Alert>
              )
            }

            <Container isMobile={isMobile} onMouseDown={e => e.stopPropagation()} layoutId={`banner-${event.bannerId}`}>
              <CloseButton onClick={onDismiss}>
                <Icon path={mdiClose}
                  size={1}
                  color="white"
                />
              </CloseButton>

              <Title>{ event.title !== '' ? event.title : 'Criar evento' }</Title>
              <Section>
                <Headline>Título</Headline>
                <TextInput
                  type="text"
                  value={event.title}
                  onChange={e => setEvent({
                    ...event,
                    title: e.target.value
                  })}
                />
              </Section>

              { (event.image || eventImage) && <ImageBackdrop src={typeof (eventImage) === 'string' ? eventImage : event.image || undefined} /> }

              <Detail>
                {
                  selected && (
                    'Criado há ' + formatDistanceToNow(event.createdAt, { locale: ptBR }) +
                    (event.expiresAt
                      ? (' - expira em ' + formatDistanceToNow(addDays(event.expiresAt ?? 0, 2), { locale: ptBR }) + ' - (' + format(event.expiresAt ?? 0, "iiii, dd 'de' MMMM 'de' yyyy 'às' HH:mm", { locale: ptBR }) + ')')
                      : <></>)
                  )
                }
              </Detail>
              <br />

              <div style={{ display: 'flex', flexDirection: isMobile ? 'column' : 'row', justifyContent: 'space-between', alignItems: 'flex-start', marginTop: 20, marginBottom: 20 }}>
                <Section style={{ width: isMobile ? '100%' : 200 }}>
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

                <Section style={{ width: isMobile ? '100%' : 200 }}>
                  <Headline>Imagem</Headline>
                  <input ref={imageRef} onChange={onProgramFileChange} type="file" id="filepicker" style={{ display: 'none' }} />
                  <ImagePicker htmlFor="filepicker">
                    Selecione um arquivo
                  </ImagePicker>
                  <Helper>Arquivo de imagem para ser exibido no aplicativo. (opcional)</Helper>
                </Section>

                <Section style={{ width: isMobile ? '100%' : 200 }}>
                  <Headline>Programa alvo</Headline>
                  <Select
                    styles={selectStyles}
                    options={programs}
                    defaultValue={event.program ? programs[programs.findIndex(({ value }) => value === event.program?.programId)] : programs[0]}
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

                <Section style={{ width: isMobile ? '100%' : 200 }}>
                  <Headline>Categoria alvo</Headline>
                  <Select
                    styles={selectStyles}
                    options={categories}
                    defaultValue={event.category ? categories[categories.findIndex(({ value }) => value === event.category?.categoryId)] : categories[0]}
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
                  onChange={(e) => setEvent({ ...event, link: e.target.value })}
                />
                <Helper>
                  (opcional) Ao clicar no anúncio o usuário será redirecionado para esse link.
                  Caso haja mais informações para exibir, um botão &quot;acessar&quot; será exibido na parte interior do anúncio.
                </Helper>
              </Section>

              <Section style={{ marginTop: 40 }}>
                <Headline>Descrição</Headline>
                <Textarea onChange={(e) => setEvent({ ...event, description: e.target.value })} autoCorrect="false">{ event.description }</Textarea>
                <Helper>
                  (opcional) Será exibido na parte interna do anúncio.
                </Helper>
              </Section>

              <div style={{ padding: 20, backgroundColor: '#17171766', borderRadius: 4, marginTop: 30 }}>
                <Helper>
                  É importante ressaltar que não é possível exibir um programa e uma categoria alvo ao mesmo tempo. Caso isso aconteça, haverá a exibição do programa e será adicionado a opção
                  do usuário &quot;ver mais programas&quot;.
                </Helper>
              </div>

              <div style={{ display: 'flex', marginTop: 20, justifyContent: 'flex-end' }}>
                { selected && selected.image && <Button onClick={handleRemoveImage}>Remover imagem</Button> }
                { selected && <Button onClick={handleDelete}>Excluir evento</Button> }
                <Button onClick={handleSave}>{ isCreating ? 'Criar evento' : 'Salvar alterações'}</Button>
              </div>

            </Container>
          </Backdrop>
        )
      }
    </AnimatePresence>
  );
};

export default BannerModal;
