import React, { useMemo } from 'react';
import { Router } from 'react-router-dom';

import Context from './context';
import Routes from './routes';
import history from './services/history';

import { HTML5Backend } from 'react-dnd-html5-backend';
import { DndProvider } from 'react-dnd';

import { useWindowSize } from './hooks';

function App () {
  const { width } = useWindowSize();
  const isMobile = useMemo(() => width < 768, [width]);

  return (
    <div className={`app ${isMobile ? 'mobile' : 'desktop'}`}>
      <DndProvider backend={HTML5Backend} >
        <Router history={history}>
          <Context>
            <Routes />
          </Context>
        </Router>
      </DndProvider>
    </div>
  );
}

export default App;
