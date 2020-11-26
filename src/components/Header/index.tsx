import React, { useMemo, useState } from 'react';
import { withRouter, RouteComponentProps } from 'react-router-dom';
import { Container, Logo, LinkUnderline, Nav, NavLink, NavLinkWithoutRedirect } from './styles';

import './shake.css';

const resolvePathname = (path: string) => {
  switch (path) {
    default: return 'home';
    case '/timetable': return 'timetable';
    case '/events': return 'events';
    case '/programs': return 'programs';
  }
}

const Header: React.FC<RouteComponentProps> = ({ location }) => {
  const [shake, setShake] = useState<boolean>(false);

  const underlinePosition = useMemo<number>(() => {
    if (shake) setShake(false);
    
    switch (location.pathname) {
      default: return 360;
      case '/timetable': return 240;
      case '/events': return 120;
      case '/programs': return 0;
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [location.pathname]);

  return (
    <Container>
      <Logo />
      <Nav>
        <Nav>
          <LinkUnderline
            className={`${resolvePathname(location.pathname)} ${shake ? "shake-animation" : ""}`}
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
          <NavLinkWithoutRedirect>Sair</NavLinkWithoutRedirect>
        </Nav>
      </Nav>
    </Container>
  );
}

export default withRouter(Header);
