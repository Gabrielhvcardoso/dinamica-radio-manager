import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';

// Components
import Header from './components/Header';

// Pages
import Events from './pages/Events';
import Main from './pages/Main';
import Programs from './pages/Programs';
import TimeTable from './pages/TimeTable';

const Routes: React.FC = () => {
  return (
    <BrowserRouter>
      <Header />
  
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
