import React from 'react';
import { withRouter, RouteComponentProps } from 'react-router-dom';
import { Container, Banner as BannerComponent, BannerActions, Paragraph } from './styles';

import Title from '../../../../components/Title';
import Button from '../../../../components/Button';

const Banner: React.FC<RouteComponentProps> = ({ history }) => {
  const onClick = () => {
    history.push('/events');
  };

  return (
    <Container>
      <BannerComponent>
        <Title style={{ color: '#151515' }}>Eventos</Title>
        <Paragraph>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce vitae...</Paragraph>

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
