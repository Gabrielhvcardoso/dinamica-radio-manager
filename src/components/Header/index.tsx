import React, { useContext, useMemo, useState } from 'react';
import { withRouter, RouteComponentProps } from 'react-router-dom';
import { Container, Logo, LinkUnderline, Nav, NavLink, NavLinkWithoutRedirect } from './styles';

import AuthContext from '../../context/auth';

import './shake.css';

const resolvePathname = (path: string) => {
  switch (path) {
    case '/programs': return 'programs';
    case '/events': return 'events';
    case '/timetable': return 'timetable';
    default: return 'home';
  }
};

const Header: React.FC<RouteComponentProps> = ({ location }) => {
  const { setAuthStatus } = useContext(AuthContext);
  const [shake, setShake] = useState<boolean>(false);

  const underlinePosition = useMemo<number>(() => {
    if (shake) setShake(false);

    switch (location.pathname) {
      case '/programs': return 0;
      case '/events': return 120;
      case '/timetable': return 240;
      default: return 360;
    }
  }, [location.pathname]);

  return (
    <Container>
      <Logo />
      <Nav>
        <Nav>
          <LinkUnderline
            className={`${resolvePathname(location.pathname)} ${shake ? 'shake-animation' : ''}`}
            onAnimationEnd={() => setShake(false)}
            onClick={() => setShake(true)}
            position={-(underlinePosition ?? 360)}
          />

          <NavLink to="/">Principal</NavLink>
          <NavLink to="/timetable">Programação</NavLink>
          <NavLink to="/events">Eventos</NavLink>
          <NavLink to="/programs">Programas</NavLink>
        </Nav>

        <Nav style={{ flex: 0 }}>
          <NavLinkWithoutRedirect onClick={() => setAuthStatus(null)}>Sair</NavLinkWithoutRedirect>
        </Nav>
      </Nav>
    </Container>
  );
};

export default withRouter(Header);
