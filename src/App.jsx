import React from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Route, Switch } from 'react-router-dom';
import Foods from './pages/Foods';
import Drinks from './pages/Drinks';
import FoodsDetails from './pages/FoodsDetails';
import DrinksDetails from './pages/DrinksDetails';
import Login from './pages/Login';
import Profile from './pages/Profile';

function App() {
  return (
    <Switch>
      <Route exact path="/" component={ Login } />
      <Route path="/comidas/:id" component={ FoodsDetails } />
      <Route path="/comidas" component={ Foods } />
      <Route path="/bebidas/:id" component={ DrinksDetails } />
      <Route path="/bebidas" component={ Drinks } />
      <Route path="/perfil" component={ Profile } />
      {/* <Route path="/explorar" component={ } />
      <Route path="/explorar/comidas" component={ } />
      <Route path="/explorar/bebidas" component={ } />
      <Route path="/explorar/comidas/ingredientes" component={ } />
      <Route path="/explorar/bebidas/ingrediente" component={ } />
      <Route path="/explorar/comidas/area" component={ } />
      <Route path="/receitas-feitas" component={ } />
      <Route path="/receitas-favoritas" component={ } /> */}
    </Switch>
  );
}

export default App;
