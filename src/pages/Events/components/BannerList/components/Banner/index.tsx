import React, { useContext } from 'react';
import { Container, Title } from './styles';

import { Banner as BannerType } from '../../../../../../types/Banner';
import colors from '../../../../../../utils/colors';
import EventsContext from '../../../../context';

interface BannerProps {
  create?: boolean,
  banner?: BannerType
}

const Banner: React.FC<BannerProps> = ({ create, banner }) => {
  const { setSelected } = useContext(EventsContext);
  
  if (create && !banner) return (
    <Container color={colors[Math.floor(Math.random() * 2)].hex()}>
      <Title>Criar</Title>
    </Container>
  );

  if (!banner) return <></>;

  const { title, bannerId } = banner;

  return (
    <Container onClick={() => setSelected(banner)} layoutId={`banner-${bannerId}`} color={colors[Math.floor(Math.random() * 2)].hex()}>
      <Title>{ title }</Title>
    </Container>
  );
}

export default Banner;
