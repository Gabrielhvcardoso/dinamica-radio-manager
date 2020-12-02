import React, { useContext } from 'react';
import { Container, Title } from './styles';

import { Banner as BannerType } from '../../../../../../types/Banner';
import EventsContext from '../../../../context';
import { format } from 'date-fns';

interface BannerProps {
  create?: boolean,
  banner?: BannerType
}

const Banner: React.FC<BannerProps> = ({ create, banner }) => {
  const { setSelected, setIsCreating } = useContext(EventsContext);

  if (create && !banner) {
    return (
    <Container onClick={() => setIsCreating(true)} style={{ padding: 20 }} color="#303030">
      <Title>Criar novo</Title>
    </Container>
    );
  }

  if (!banner) return <></>;

  const { bannerId } = banner;

  return (
    <Container
      onClick={() => setSelected(banner)}
      layoutId={`banner-${bannerId}`}
      color="#303030"
    >
      {
        banner.image
          ? <img style={{ width: '100%', height: '100%', objectFit: 'cover' }} src={banner.image} alt={banner.title} />
          : (
              <div style={{ color: 'white', padding: 20 }}>
                <Title>{ banner.title }</Title>
                <br /><br /><span>{ format(banner.createdAt, 'dd/MM/yy') }</span>
              </div>
            )
      }
    </Container>
  );
};

export default Banner;
