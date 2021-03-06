import React, { useContext } from 'react';
import { BrowserRouter, Switch, Route, Redirect } from 'react-router-dom';
import { Container } from './routes.styles';

// Components
import Header from './components/Header';
import Toolbar from './components/Toolbar';

// Authentication
import Apresentation from './authentication/Apresentation';
import Login from './authentication/Login';

// Pages
import Events from './pages/Events';
import Main from './pages/Main';
import Programs from './pages/Programs';
import TimeTable from './pages/TimeTable';

// Context
import AuthContext from './context/auth';
import DataContext from './context/data';
import MobileContext from './context/mobile';

const Routes: React.FC = () => {
  const { isLoading, clientId } = useContext(AuthContext);
  const { isLoading: dataIsLoading } = useContext(DataContext);
  const { isMobile } = useContext(MobileContext);

  if (isLoading || dataIsLoading) {
    return <Container />;
  }

  return (
    <BrowserRouter>
      {
        clientId && (
          isMobile
            ? <Toolbar />
            : <Header />
        )
      }

      <Switch>
        {
          !clientId
            ? (
                <>
                  <Route path="/" exact component={Apresentation} />
                  <Route path="/login" component={Login} />
                  <Redirect to="/login" />
                </>
              )
            : (
                <>
                  <Route path="/" exact component={Main} />
                  <Route path="/events" component={Events} />
                  <Route path="/programs" component={Programs} />
                  <Route path="/timetable" component={TimeTable} />
                  <Redirect to="/" />
                </>
              )
        }
      </Switch>
    </BrowserRouter>
  );
};

export default Routes;
