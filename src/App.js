import React from 'react';
import './App.css';
import { Switch, Route } from 'react-router-dom';
import Login from './pages/Login';
import Profile from './pages/Profile';
import MainFoods from './pages/MainFoods';
import MainDrinks from './pages/MainDrinks';
import FoodDetails from './pages/FoodDetails';
import DrinkDetails from './pages/DrinkDetails';
import mainFoodsInProgress from './pages/mainFoodsInProgress';
import mainDrinksInProgress from './pages/mainDrinksInProgress';
import FavoriteRecipes from './pages/FavoriteRecipes';
import RecipesMade from './pages/RecipesMade';

import FoodProvider from './provider/FoodProvider';
import DrinkProvider from './provider/DrinkProvider';
import FavoritesProvider from './provider/FavoritesProvider';

function App() {
  return (
    <FoodProvider>
      <DrinkProvider>
        <FavoritesProvider>
          <Switch>
            <Route exact path="/" component={ Login } />
            <Route exact path="/comidas" component={ MainFoods } />
            <Route exact path="/bebidas" component={ MainDrinks } />
            <Route exact path="/perfil" component={ Profile } />
            <Route exact path="/comidas/:id" component={ FoodDetails } />
            <Route exact path="/bebidas/:id" component={ DrinkDetails } />
            <Route path="/comidas/:id/in-progress" component={ mainFoodsInProgress } />
            <Route path="/bebidas/:id/in-progress" component={ mainDrinksInProgress } />
            <Route exact path="/receitas-favoritas" component={ FavoriteRecipes } />
            <Route exact path="/receitas-feitas" component={ RecipesMade } />
          </Switch>
        </FavoritesProvider>
      </DrinkProvider>
    </FoodProvider>
  );
}

export default App;
