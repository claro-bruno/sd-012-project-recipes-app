import React from 'react';
import { Switch, Route } from 'react-router-dom';
import DrinkMainPage from './Pages/DrinkMainPage';
import FoodMainPage from './Pages/FoodMainPage';
import Login from './Pages/Login';
import NotFound from './Pages/NotFound';
import Profile from './Pages/Profile';

function App() {
  return (
    <Switch>
      <Route exact path="/comidas" component={ FoodMainPage } />
      <Route exact path="/bebidas" component={ DrinkMainPage } />
      <Route exact path="/perfil" component={ Profile } />
      <Route exact path="/" component={ Login } />
      <Route path="*" component={ NotFound } />
    </Switch>
  );
}

export default App;
