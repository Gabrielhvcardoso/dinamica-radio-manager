import React from 'react';
import { withRouter, NavLink, RouteComponentProps } from 'react-router-dom';

import { Container } from './styles';

import { Icon } from '@mdi/react';
import {
  mdiHomeOutline,
  mdiTimetable,
  mdiCalendarMultipleCheck,
  mdiRadio
} from '@mdi/js';

const Toolbar: React.FC<RouteComponentProps> = ({ location }) => {
  return (
    <Container>
      {[
        { to: '/', icon: mdiHomeOutline },
        { to: '/timetable', icon: mdiTimetable },
        { to: '/events', icon: mdiCalendarMultipleCheck },
        { to: '/programs', icon: mdiRadio }

      ].map(({ to, icon }) => (
        <NavLink key={to} to={to}>
          <Icon path={icon}
            size={1.5}
            color={location.pathname === to ? '#8bc298' : 'white'}
          />
        </NavLink>
      ))}
    </Container>
  );
};

export default withRouter(Toolbar);
