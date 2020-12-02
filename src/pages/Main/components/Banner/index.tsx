import React, { useContext } from 'react';
import { withRouter, RouteComponentProps } from 'react-router-dom';
import { Container, Banner as BannerComponent, BannerActions, Paragraph } from './styles';

import Title from '../../../../components/Title';
import Button from '../../../../components/Button';

import DataContext from '../../../../context/data';

const Banner: React.FC<RouteComponentProps> = ({ history }) => {
  const { banners } = useContext(DataContext);

  const onClick = () => {
    history.push('/events');
  };

  return (
    <Container>
      <BannerComponent>
        <Title style={{ color: '#151515' }}>Eventos</Title>
        <Paragraph>
          { banners.map(({ title }) => title).join(', ') }
        </Paragraph>

        <BannerActions>
          <Button onClick={onClick}>
            Programar evento
          </Button>
        </BannerActions>
      </BannerComponent>
    </Container>
  );
};

export default withRouter(Banner);
