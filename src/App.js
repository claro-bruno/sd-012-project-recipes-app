import React from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Switch, Route } from 'react-router-dom';
import ProviderContext from './context/ProviderContext';
import Login from './pages/Login';
import Foods from './pages/Foods';
import Drinks from './pages/Drinks';
import Explore from './pages/Explore';
import ExploreFood from './pages/ExploreFood';
import ExploreDrink from './pages/ExploreDrink';
import ExploreOrigin from './pages/ExploreOrigin';
import IngredientsExploreFood from './pages/IngredientsExploreFood';
import IngredientsExploreDrink from './pages/IngredientsExploreDrink';
import Profile from './pages/Profile';
import RecipiesDone from './pages/RecipiesDone';
import FavoritesRecipies from './pages/FavoritesRecipies';
import RecipeDetails from './pages/RecipeDetails';

function App() {
  return (
    <ProviderContext>
      <Switch>
        <Route exact path="/" component={ Login } />
        <Route exact path="/comidas" component={ Foods } />
        <Route exact path="/bebidas" component={ Drinks } />
        <Route exact path="/explorar" component={ Explore } />
        <Route exact path="/explorar/comidas" component={ ExploreFood } />
        <Route exact path="/explorar/bebidas" component={ ExploreDrink } />
        <Route exact path="/explorar/comidas/area" component={ ExploreOrigin } />
        <Route
          exact
          path="/explorar/comidas/ingredientes"
          component={ IngredientsExploreFood }
        />
        <Route
          exact
          path="/explorar/bebidas/ingredientes"
          component={ IngredientsExploreDrink }
        />
        <Route exact path="/perfil" component={ Profile } />
        <Route exact path="/receitas-feitas" component={ RecipiesDone } />
        <Route exact path="/receitas-favoritas" component={ FavoritesRecipies } />
        <Route
          exact
          path="/:type/:id"
          render={ (props) => <RecipeDetails { ...props } /> }
        />
        <Route
          exact
          path="/:type/:id/in-progress"
          render={ (props) => <RecipeDetails { ...props } /> }
        />
      </Switch>
    </ProviderContext>
  );
}

export default App;
