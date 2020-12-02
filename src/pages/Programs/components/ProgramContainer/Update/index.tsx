import update from 'immutability-helper';
import React, { useContext, BaseSyntheticEvent, useState, createRef } from 'react';
import { Button, Container, EditClose, ImageEdit, ImageHeader, ImageOverlay, Title } from './styles';
import { Icon } from '@mdi/react';
import { mdiImageEditOutline, mdiClose } from '@mdi/js';

import ProgramsPageContext from '../../../context';
import { useFetch } from '../../../../../hooks';
import Alert from '../../../../../components/Alert';

interface ProgramUpdateProps {
  onDismiss: () => void,
  setIsUpdate: (arg: boolean) => void
}

const ProgramUpdate: React.FC<ProgramUpdateProps> = ({ setIsUpdate }) => {
  const { selected, programs, setPrograms } = useContext(ProgramsPageContext);

  const [error, setError] = useState<string | null>(null);
  const [programTitle, setProgramTitle] = useState<string>(selected ? selected.title : '');
  const [programFile, setProgramFile] = useState<string | ArrayBuffer | null>(null);

  const imageRef = createRef<HTMLInputElement>();

  const showError = (message: string) => {
    setError(message);
    setTimeout(() => {
      setError(null);
    }, 5000);
  };

  const onProgramFileChange = () => {
    if (imageRef.current?.files) {
      const file = imageRef.current.files[0];
      const reader = new FileReader();

      reader.readAsDataURL(file);
      reader.onloadend = (e) => {
        setProgramFile(reader.result);
      };
    }
  };

  const handleCreate = () => {
    const fileData = imageRef.current?.files ? imageRef.current.files[0] : undefined;

    const errors = [
      {
        status: fileData === undefined && programTitle === selected?.title,
        message: 'É necessário selecionar uma imagem ou mudar o título para editar o programa.'
      }, {
        status: programTitle === '' || !programTitle,
        message: 'É necessário informar o nome do programa.'
      }, {
        status: programTitle.length > 40,
        message: `O nome do programa deve ter no máximo 40 caracteres, atualmente ele tem ${programTitle.length} caracteres.`
      }, {
        status: fileData ? fileData.size > 1024 * 1024 : false,
        message: `A imagem é muito pesada (${(fileData ? fileData.size / (1024 * 1024) : 1).toFixed(2)} MB) procure usar imagens de até 1 MB.`
      }
    ];

    const errorIndex = errors.findIndex((item) => item.status);

    if (errorIndex > -1) {
      return showError(errors[errorIndex].message);
    }

    const data = new FormData();

    if (programTitle !== selected?.title) {
      data.append('title', programTitle);
    }

    if (fileData !== undefined) {
      data.append('file', fileData);
    }

    useFetch.post(`/pro/${selected?.programId}`, data, (response) => {
      if (response.code === 'success') {
        const index = programs.findIndex(item => item.programId === selected?.programId);

        if (selected) {
          setPrograms(update(programs, {
            [index]: {
              $set: {
                programId: selected.programId,
                title: programTitle || selected.title,
                image: typeof (programFile) === 'string' ? programFile : selected.image,
                tags: selected.tags
              }
            }
          }));
        }

        showError('Mudançasm salvas com sucesso!');
      } else {
        console.log(response.message);
        showError('Não foi possível editar esse produto, tente novamente mas tarde ou entre em contato com os desenvolvedores');
      }
    });
  };

  return (
    <Container onMouseDown={e => e.stopPropagation()} layoutId={selected?.toString()}>
      {
        error && (
          <Alert>
            { error }
          </Alert>
        )
      }
      <ImageHeader src={ typeof (programFile) === 'string' ? programFile : selected?.image } alt={ selected?.title } />

      <div style={{ margin: 20 }}>
        <ImageOverlay>
          <Title
            onInput={(e: BaseSyntheticEvent) => {
              console.log(e.target.innerText);
              setProgramTitle(e.target.innerText);
            }}
            suppressContentEditableWarning
          >{ selected?.title }</Title>

          <div>
            <input ref={imageRef} onChange={onProgramFileChange} style={{ display: 'none' }} type="file" id="file" name="file" />
            <EditClose title="Fechar modo de edição" onClick={() => setIsUpdate(false)}>
              <Icon path={mdiClose}
                size={1}
                color="#ffffff"
              />
            </EditClose>
            <ImageEdit title="Alterar imagem" htmlFor="file">
              <Icon path={mdiImageEditOutline}
                size={1}
                color="#ffffff"
              />
            </ImageEdit>
          </div>
        </ImageOverlay>

        <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
          <Button onClick={handleCreate}>Salvar alterações</Button>
        </div>
      </div>
    </Container>
  );
};

export default ProgramUpdate;
