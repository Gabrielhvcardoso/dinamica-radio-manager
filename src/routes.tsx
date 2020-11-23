import React, { useContext } from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';

// Components
import Header from './components/Header';
import Toolbar from './components/Toolbar';

// Pages
import Events from './pages/Events';
import Main from './pages/Main';
import Programs from './pages/Programs';
import TimeTable from './pages/TimeTable';

// Context
import MobileContext from './context/mobile';

const Routes: React.FC = () => {
  const { isMobile } = useContext(MobileContext);

  return (
    <BrowserRouter>
      {
        isMobile ? (
          <Toolbar />
        ) : (
          <Header />
        )
      }
  
      <Switch>
        <Route path="/" exact component={Main} />
        <Route path="/events" component={Events} />
        <Route path="/programs" component={Programs} />
        <Route path="/timetable" component={TimeTable} />
      </Switch>
    </BrowserRouter>
  );
}

export default Routes;
