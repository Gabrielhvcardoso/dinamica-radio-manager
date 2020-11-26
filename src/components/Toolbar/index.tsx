import React, { useContext, useState } from 'react';
import { withRouter, NavLink, RouteComponentProps } from 'react-router-dom';
import { Portal } from 'react-portal';
import { Backdrop, Container, Menu, MenuItem } from './styles';

import AuthContext from '../../context/auth';

import { Icon } from '@mdi/react';
import {
  mdiHomeOutline,
  mdiTimetable,
  mdiCalendarMultipleCheck,
  mdiRadio,
  mdiMenu
} from '@mdi/js';
import { AnimatePresence } from 'framer-motion';

const Toolbar: React.FC<RouteComponentProps> = ({ location }) => {
  const { setAuthStatus } = useContext(AuthContext);
  const [optionsActive, setOptionsActive] = useState<boolean>(false);

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
            color={optionsActive ? 'white' : location.pathname === to ? '#8bc298' : 'white'}
          />
        </NavLink>
      ))}

      <div style={{ display: 'flex', alignItems: 'center' }} onClick={() => setOptionsActive(true)}>
        <Icon path={mdiMenu} size={1.5} color={optionsActive ? '#8bc298' : 'white'} />
      </div>

      <AnimatePresence>
        {
          optionsActive && (
            <Portal>
              <Backdrop onMouseDown={() => setOptionsActive(false)}>
                <Menu onMouseDown={e => e.stopPropagation()}>
                  <MenuItem onClick={() => setAuthStatus(null)}>Sair</MenuItem>
                </Menu>
              </Backdrop>
            </Portal>
          )
        }
      </AnimatePresence>
    </Container>
  );
};

export default withRouter(Toolbar);
