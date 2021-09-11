import React from 'react';
import { Switch, Route } from 'react-router-dom';
import Login from './Pages/Login';
import NotFound from './Pages/NotFound';

function App() {
  return (
    <Switch>
      <Route exact path="/" component={ Login } />
      <Route path="*" component={ NotFound } />
    </Switch>
  );
}

export default App;
