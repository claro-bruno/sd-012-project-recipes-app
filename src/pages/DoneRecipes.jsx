import React, { useState, useEffect } from 'react';
import Button from 'react-bootstrap/Button';
import Header from '../components/Header';
import CardDoneRecipes from '../components/CardDoneRecipes';
import { getDataFromLocalStorage } from '../helpers/saveOnLocalStorage';

export default function DoneRecipes() {
  const recipes = getDataFromLocalStorage('doneRecipes');
  const [filter, setFilter] = useState('All');
  const [data, setData] = useState([]);
  const [doneRecipes] = useState(recipes);

  useEffect(() => {
    if (filter === 'All') {
      setData(doneRecipes);
    } else if (filter === 'Foods') {
      setData(doneRecipes.filter((recipe) => recipe.type === 'comida'));
    } else {
      setData(doneRecipes.filter((recipe) => recipe.type === 'bebida'));
    }
  }, [filter, doneRecipes]);

  const handleAllFilter = () => {
    setFilter('All');
  };

  const handleFoodFilter = () => {
    setFilter('Foods');
  };

  const handleDrinkFilter = () => {
    setFilter('Drinks');
  };

  return (
    <div className="body">
      <Header showExploreIcon pageTitle="Receitas Feitas" />
      <main className="d-flex flex-column w-100 p-3">
        <div className="d-flex justify-content-around pb-2">
          <Button
            style={ { height: '60px' } }
            className="border bg-color w-25"
            data-testid="filter-by-all-btn"
            onClick={ handleAllFilter }
          >
            All
          </Button>
          <Button
            style={ { height: '60px' } }
            className="border bg-color w-25"
            data-testid="filter-by-food-btn"
            onClick={ handleFoodFilter }
          >
            Food
          </Button>
          <Button
            style={ { height: '60px' } }
            className="border bg-color w-25"
            data-testid="filter-by-drink-btn"
            onClick={ handleDrinkFilter }
          >
            Drinks
          </Button>
        </div>
        {data.map((recipe, index) => (
          <CardDoneRecipes
            key={ recipe.id }
            id={ recipe.id }
            type={ recipe.type }
            thumb={ recipe.image }
            title={ recipe.name }
            category={ `${recipe.area || recipe.alcoholicOrNot} - ${recipe.category}` }
            date={ recipe.doneDate }
            tags={ recipe.tags }
            index={ index }
          />
        ))}
      </main>
    </div>
  );
}
