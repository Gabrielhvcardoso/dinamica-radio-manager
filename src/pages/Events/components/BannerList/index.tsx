import React, { useContext } from 'react';
import { Container, Row } from './styles';
import Banner from './components/Banner';
import Title from '../../../../components/Title/index';

import EventsContext from '../../context';

const BannerList: React.FC = () => {
  const { events } = useContext(EventsContext);

  return (
    <Container>
      <Title>Eventos</Title>

      <Row>
        { events.slice(0, 2).map(banner => <Banner banner={banner} key={banner.bannerId} />) }
        { events.length === 1 && <Banner create /> }
      </Row>
      <Row>
        { events.slice(2, 5).map(banner => <Banner banner={banner} key={banner.bannerId} />) }
        { events.length > 1 && events.length < 5 && <Banner create /> }
      </Row>
    </Container>
  );
}

export default BannerList;
