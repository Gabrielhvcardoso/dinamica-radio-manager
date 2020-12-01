import { AnimatePresence } from 'framer-motion';
import React, { createRef, useContext, useState } from 'react';
import { Backdrop, Button, Headline, ImagePicker, Menu, TextInput, TopImage } from './styles';
import Title from '../../../../components/Title';
import update from 'immutability-helper';

import AuthContext from '../../../../context/auth';
import DataContext from '../../../../context/data';
import MobileContext from '../../../../context/mobile';
import ProgramsPageContext from '../../context';
import { useFetch } from '../../../../hooks';
import Alert from '../../../../components/Alert';

const ProgramCreate: React.FC = () => {
  const { clientId } = useContext(AuthContext);
  const { programs, setPrograms } = useContext(DataContext);
  const { isMobile } = useContext(MobileContext);
  const { openProduct, setOpenProduct } = useContext(ProgramsPageContext);

  const [error, setError] = useState<string | null>(null);
  const [programTitle, setProgramTitle] = useState<string>('');
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
    if (imageRef.current?.files) {
      const fileData = imageRef.current.files[0];

      const errors = [
        {
          status: fileData === undefined,
          message: 'É necessário selecionar uma imagem para o programa.'
        }, {
          status: programTitle === '' || !programTitle,
          message: 'É necessário informar o nome do programa.'
        }, {
          status: programTitle.length > 40,
          message: `O nome do programa deve ter no máximo 40 caracteres, atualmente ele tem ${programTitle.length} caracteres.`
        }, {
          status: fileData.size > 1024 * 1024,
          message: `A imagem é muito pesada (${(fileData.size / (1024 * 1024)).toFixed(2)} MB) procure usar imagens de até 1 MB.`
        }
      ];

      const errorIndex = errors.findIndex((item) => item.status);

      if (errorIndex > -1) {
        return showError(errors[errorIndex].message);
      }

      const data = new FormData();

      data.append('clientId', (clientId ?? 0).toString());
      data.append('title', programTitle);
      data.append('file', fileData);

      useFetch.put('/pro', data, (response) => {
        if (response.code === 'success') {
          const { programId } = response;

          setPrograms(update(programs, {
            $push: [typeof (programFile) === 'string'
              ? {
                  programId,
                  title: programTitle,
                  image: programFile
                }
              : {
                  programId,
                  title: programTitle
                }
            ]

          }));

          setOpenProduct(false);
          setProgramTitle('');
          setProgramFile(null);
        } else {
          showError('Não foi possível criar esse produto, tente novamente mas tarde ou entre em contato com os desenvolvedores');
        }
      });
    } else {
      showError('É necessário selecionar uma imagem para o programa');
    }
  };

  return (
    <AnimatePresence>
      {
        openProduct && (
          <Backdrop onMouseDown={() => setOpenProduct(false)}>
            {
              error && (
                <Alert>
                  { error }
                </Alert>
              )
            }
            <Menu style={{ padding: isMobile ? (programFile ? '120px 20px 20px 20px' : 20) : (programFile ? '140px 50px 50px 50px' : 50) }} onMouseDown={e => e.stopPropagation()}>
              <Title>Criar programa</Title>

              <AnimatePresence>
                {
                  typeof (programFile) === 'string' && (
                    <TopImage src={programFile} />
                  )
                }
              </AnimatePresence>

              <div style={{ display: 'flex', flexDirection: isMobile ? 'column' : 'row', margin: '0px -10px' }}>
                <div style={{ flex: 1, margin: '0px 10px' }}>
                  <Headline>Nome do programa</Headline>
                  <TextInput value={programTitle} onChange={e => setProgramTitle(e.target.value)} />
                </div>

                <div style={{ flex: 1, margin: '0px 10px' }}>
                  <Headline style={{ marginTop: 20 }}>Imagem do programa</Headline>
                  <input ref={imageRef} onChange={onProgramFileChange} name="file" id="file" type="file" style={{ display: 'none' }}/>
                  <ImagePicker htmlFor="file">Selecione uma imagem</ImagePicker>
                </div>
              </div>

              <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: 10 }}>
                <Button onClick={() => setOpenProduct(false)}>Cancelar</Button>
                <Button onClick={handleCreate}>Cadastrar</Button>
              </div>
            </Menu>
          </Backdrop>
        )
      }
    </AnimatePresence>
  );
};

export default ProgramCreate;
