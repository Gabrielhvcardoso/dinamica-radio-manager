import React from 'react';
import { Router } from 'react-router-dom';

import Context from './context';
import Routes from './routes';
import history from './services/history';

import { HTML5Backend } from 'react-dnd-html5-backend';
import { DndProvider } from 'react-dnd';

function App() {
  return (
    <DndProvider backend={HTML5Backend} >
      <Router history={history}>
        <Context>
          <Routes />
        </Context>
      </Router>
    </DndProvider>
  );
}

export default App;
