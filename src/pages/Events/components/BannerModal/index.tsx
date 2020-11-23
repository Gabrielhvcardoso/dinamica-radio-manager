import React, { useContext } from 'react';
import { AnimatePresence } from 'framer-motion';
import { Container, Overlay, Title, Detail } from './styles';

import { formatDistanceToNow } from 'date-fns';
import { ptBR } from 'date-fns/locale';

import EventsContext from '../../context';

const BannerModal: React.FC = () => {
  const { selected, setSelected } = useContext(EventsContext);
  const onDismiss = () => setSelected(null);

  return(
    <AnimatePresence>
      {
        selected && (
          <Overlay onMouseDown={onDismiss}>
            <Container onMouseDown={e => e.stopPropagation()} layoutId={`banner-${selected.bannerId}`}>
              <Title>{ selected.title }</Title>
              <Detail>Há { formatDistanceToNow(selected.createdAt, { locale: ptBR }) }</Detail>
            </Container>
          </Overlay>
        )
      }
    </AnimatePresence>
  );
}

export default BannerModal;