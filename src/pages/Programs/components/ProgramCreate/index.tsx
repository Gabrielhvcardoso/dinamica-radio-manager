import { AnimatePresence } from 'framer-motion';
import React, { useContext } from 'react';
import { Backdrop, Button, Headline, ImagePicker, Menu, TextInput, TopImage } from './styles';
import Title from '../../../../components/Title';

import MobileContext from '../../../../context/mobile';
import ProgramsPageContext from '../../context';

const ProgramCreate: React.FC = () => {
  const { isMobile } = useContext(MobileContext);
  const { openProduct, setOpenProduct } = useContext(ProgramsPageContext);

  return (
    <AnimatePresence>
      {
        openProduct && (
          <Backdrop onMouseDown={() => setOpenProduct(false)}>
            <Menu style={{ padding: isMobile ? '120px 20px 20px 20px' : '140px 50px 50px 50px' }} onMouseDown={e => e.stopPropagation()}>
              <Title>Criar programa</Title>
              <TopImage />

              <div style={{ display: 'flex', flexDirection: isMobile ? 'column' : 'row', margin: '0px -10px' }}>
                <div style={{ flex: 1, margin: '0px 10px' }}>
                  <Headline>Nome do programa</Headline>
                  <TextInput />
                </div>

                <div style={{ flex: 1, margin: '0px 10px' }}>
                  <Headline style={{ marginTop: 20 }}>Imagem do programa</Headline>
                  <input name="file" id="file" type="file" style={{ display: 'none' }}/>
                  <ImagePicker htmlFor="file">
                    Selecione uma imagem
                  </ImagePicker>
                </div>
              </div>

              <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: 10 }}>
                <Button>Cancelar</Button>
                <Button>Cadastrar</Button>
              </div>
            </Menu>
          </Backdrop>
        )
      }
    </AnimatePresence>
  );
};

export default ProgramCreate;
