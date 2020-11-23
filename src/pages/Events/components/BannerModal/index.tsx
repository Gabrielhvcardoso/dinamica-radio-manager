import React, { useContext } from 'react';
import { AnimatePresence } from 'framer-motion';
import { Container, Overlay } from './styles';

import EventsContext from '../../context';

const BannerModal: React.FC = () => {
  const { selected, setSelected } = useContext(EventsContext);
  const onDismiss = () => setSelected(null);

  return(
    <AnimatePresence>
      {
        selected && (
          <Overlay onClick={onDismiss}>
            <Container layoutId={`banner-${selected.bannerId}`} />
          </Overlay>
        )
      }
    </AnimatePresence>
  );
}

export default BannerModal;