import React, { useState, useEffect } from 'react';
import { Button } from 'react-bootstrap';
import Header from '../components/Header';
import FavoriteCard from '../components/FavoriteCard';
import {
  getDataFromLocalStorage,
  saveOnLocalStorage,
} from '../helpers/saveOnLocalStorage';

export default function FavoriteRecipes() {
  const recipes = getDataFromLocalStorage('favoriteRecipes');
  const [filter, setFilter] = useState('All');
  const [data, setData] = useState([]);
  const [favoriteRecipes, setFavoriteRecipes] = useState(recipes);

  useEffect(() => {
    if (filter === 'All') {
      setData(favoriteRecipes);
    } else if (filter === 'Foods') {
      setData(favoriteRecipes.filter((recipe) => recipe.type === 'comida'));
    } else {
      setData(favoriteRecipes.filter((recipe) => recipe.type === 'bebida'));
    }
  }, [filter, favoriteRecipes]);

  const handleAllFilter = () => {
    setFilter('All');
  };

  const handleFoodFilter = () => {
    setFilter('Foods');
  };

  const handleDrinkFilter = () => {
    setFilter('Drinks');
  };

  const handleDelete = (favId) => {
    const filtered = favoriteRecipes.filter((item) => item.id !== favId);
    saveOnLocalStorage('favoriteRecipes', filtered);
    setFavoriteRecipes(filtered);
  };

  return (
    <section className="body">
      <Header
        showExploreIcon
        pageTitle="Receitas Favoritas"
        onClickShowInput={ () => {} }
      />
      <main className="d-flex flex-column w-100 p-3">
        <div className="d-flex justify-content-around pb-2">
          <Button
            style={ { height: '60px' } }
            className="border bg-color w-25"
            onClick={ handleAllFilter }
            data-testid="filter-by-all-btn"
            type="button"
          >
            All
          </Button>
          <Button
            style={ { height: '60px' } }
            className="border bg-color w-25"
            onClick={ handleFoodFilter }
            data-testid="filter-by-food-btn"
            type="button"
          >
            Foods
          </Button>
          <Button
            style={ { height: '60px' } }
            className="border bg-color w-25"
            onClick={ handleDrinkFilter }
            data-testid="filter-by-drink-btn"
            type="button"
          >
            Drinks
          </Button>
        </div>
        {data.map((recipe, index) => (
          <FavoriteCard
            key={ recipe.id }
            category={ `${recipe.area || recipe.alcoholicOrNot} - ${recipe.category}` }
            title={ recipe.name }
            img={ recipe.image }
            index={ index }
            recipes={ recipe }
            handleDelete={ () => handleDelete(recipe.id) }
          />
        ))}
      </main>
    </section>
  );
}
