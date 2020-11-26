import React from 'react';
import { withRouter, RouteComponentProps } from 'react-router-dom';
import { Button, Container, Dot } from './styles';

const ListButton: React.FC<RouteComponentProps> = ({ history }) => {
  const onClick = () => {
    history.push('/timetable');
  };

  return (
    <Container>
      <Dot />

      <Button onClick={onClick}>
        Programação completa
      </Button>
    </Container>
  );
};

export default withRouter(ListButton);
