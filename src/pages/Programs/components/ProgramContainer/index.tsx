import { AnimatePresence, AnimateSharedLayout } from 'framer-motion';
import React, { useContext, useState } from 'react';
import { Portal } from 'react-portal';

import Backdrop from '../../../../components/Backdrop';
import View from './View';
import Update from './Update';

import ProgramsPageContext from '../../context';

const ProgramContainer: React.FC = () => {
  const { selected, setSelected } = useContext(ProgramsPageContext);
  const [isUpdate, setIsUpdate] = useState<boolean>(false);

  const onDismiss = () => {
    setSelected(null);
    setIsUpdate(false);
  };

  return (
    <Portal>
      <AnimateSharedLayout>
        <AnimatePresence>
          {
            selected && (
              <Backdrop onMouseDown={onDismiss}>
                { isUpdate ? <Update onDismiss={onDismiss} setIsUpdate={setIsUpdate} /> : <View onDismiss={onDismiss} setIsUpdate={setIsUpdate} /> }
              </Backdrop>
            )
          }
        </AnimatePresence>
      </AnimateSharedLayout>
    </Portal>
  );
};

export default ProgramContainer;
