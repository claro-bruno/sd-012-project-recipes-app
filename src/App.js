import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import Provider from './context/Provider';
import Login from './pages/Login';
import Comidas from './pages/Comidas';
import Bebidas from './pages/Bebidas';
import Perfil from './pages/Perfil';
import Detalhes from './pages/Detalhes';

function App() {
  return (
    <Provider>
      <BrowserRouter>
        <Switch>
          <Route exact path="/" component={ Login } />
          <Route path="/comidas" component={ Comidas } />
          <Route path="/bebidas" component={ Bebidas } />
          <Route path="/perfil" component={ Perfil } />
          <Route path="/comidas/:id" component={ Detalhes } />
          <Route path="/bebidas/:id" component={ Detalhes } />
          {/* <Route path="/comidas/{id-da-receita}/in-progress" component={ Login } />
          <Route path="/bebidas/{id-da-receita}/in-progress" component={ Login } />
          <Route path="/receitas-feitas" component={ Login } />
          <Route path="/receitas-favoritas" component={ Login } /> */}
        </Switch>
      </BrowserRouter>
    </Provider>
  );
}
export default App;
