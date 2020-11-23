import React, { useContext } from 'react';
import { Container, Row } from './styles';
import Banner from './components/Banner';
import Title from '../../../../components/Title/index';

import MobileContext from '../../../../context/mobile';
import EventsContext from '../../context';

const BannerList: React.FC<{ className: string }> = ({ className }) => {
  const { isMobile } = useContext(MobileContext);
  const { events } = useContext(EventsContext);

  return (
    <Container className={className}>
      <Title>Eventos</Title>

      <Row isMobile={isMobile}>
        { events.slice(0, 2).map(banner => <Banner banner={banner} key={banner.bannerId} />) }
        { events.length === 1 && <Banner create /> }
      </Row>
      <Row isMobile={isMobile}>
        { events.slice(2, 5).map(banner => <Banner banner={banner} key={banner.bannerId} />) }
        { events.length > 1 && events.length < 5 && <Banner create /> }
      </Row>
    </Container>
  );
}

export default BannerList;
