import React, { useContext, useState } from 'react';
import { Redirect } from 'react-router';
import Buttons from '../components/categoriesButton';
import RecipesContext from '../context/RecipesContext';
import Recipes from '../components/Recipes';
import Header from '../components/Header';
import Footer from '../components/Footer';
import FoodDAPI from '../service/foodAPI';

function Comidas() {
  const {
    foodCategory,
    foodData,
    searchBar,
    filter,
    food,
    setFood } = useContext(RecipesContext);
  setFood(true);
  const [ingrediente] = useState(false);
  if (!filter) {
    FoodDAPI();
  }
  if (foodData === null) {
    return (
      global.alert('Sinto muito, não encontramos nenhuma receita para esses filtros.')
      && <Redirect to="/bebidas" />
    );
  }
  if (foodData.length === 1 && searchBar === true) {
    return <Redirect to={ `/comidas/${foodData[0].idMeal}` } />;
  }
  if (foodCategory.length > 0) {
    return (
      <div>
        <Header title="Comidas" />
        <Buttons food={ food } />
        <Recipes food={ food } ingredientes={ ingrediente } />
        <Footer />
      </div>
    );
  }
  return <p> Loading... </p>;
}

export default Comidas;
