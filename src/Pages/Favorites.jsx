import React, { useState, useEffect } from 'react';
import DoneRecipesCard from '../Components/DoneRecipeCard';
import shareIcon from '../images/shareIcon.svg';
import Header from '../Components/Header';

function FavoritRecipes() {
  const [recipes, setRecipe] = useState([]);
  const [filterFood, setFilterFood] = useState([]);

  function getFavRecipe() {
    if (localStorage.getItem('favoriteRecipes')) {
      const favoritRecipes = JSON.parse(localStorage.getItem('favoriteRecipes'));
      setRecipe(favoritRecipes);
      setFilterFood(favoritRecipes);
    }
  }

  useEffect(() => {
    getFavRecipe();
  }, []);

  const foodFilterBtn = (filtro) => {
    setFilterFood(recipes.filter(({ type }) => type === filtro));
  };

  const titleTopText = (recipe) => {
    if (recipe.type === 'comida') {
      return `${recipe.area} - ${recipe.category}`;
    } return `${recipe.alcoholicOrNot}`;
  };

  return (
    <div>
      <Header title="Receitas Favoritas" />
      <button
        type="button"
        data-testid="filter-by-all-btn"
        onClick={ () => setFilterFood(recipes) }
      >
        All
      </button>
      <button
        type="button"
        data-testid="filter-by-food-btn"
        onClick={ () => foodFilterBtn('comida') }
      >
        Food
      </button>
      <button
        type="button"
        data-testid="filter-by-drink-btn"
        onClick={ () => foodFilterBtn('bebida') }

      >
        Drinks
      </button>
      {
        filterFood.map((recipe, index) => (
          <DoneRecipesCard
            index={ index }
            key={ recipe.id }
            id={ recipe.id }
            IDimg={ `${index}-horizontal-image` }
            IDtopText={ `${index}-horizontal-top-text` }
            IDnameRecipe={ `${index}-horizontal-name` }
            IDdoneDate={ `${index}-horizontal-done-date` }
            IDshareBtn={ `${index}-horizontal-share-btn` }
            IDtag={ recipe.tags }
            thumbnail={ recipe.image }
            titleImg={ recipe.name }
            thumbnailIcon={ shareIcon }
            titleTopText={ titleTopText(recipe) }
            titleNameRecipe={ recipe.name }
            titleDoneDate={ recipe.doneDate }
            titleTag={ recipe.tags }
          />
        ))
      }
    </div>
  );
}

export default FavoritRecipes;
