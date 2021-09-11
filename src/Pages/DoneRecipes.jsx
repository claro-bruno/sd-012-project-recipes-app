import React, { useState, useEffect } from 'react';
import { v4 as uuidv4 } from 'uuid';
import DoneRecipesCard from '../Components/DoneRecipeCard';
import shareIcon from '../images/shareIcon.svg';
import Header from '../Components/Header';

// const doneRecipesMock = [
//   {
//     id: '52771',
//     type: 'comida',
//     area: 'Italian',
//     category: 'Vegetarian',
//     alcoholicOrNot: '',
//     name: 'Spicy Arrabiata Penne',
//     image: 'https://www.themealdb.com/images/media/meals/ustsqw1468250014.jpg',
//     doneDate: '23/06/2020',
//     tags: ['Pasta', 'Curry'],
//   },
//   {
//     id: '178319',
//     type: 'bebida',
//     area: '',
//     category: 'Cocktail',
//     alcoholicOrNot: 'Alcoholic',
//     name: 'Aquamarine',
//     image: 'https://www.thecocktaildb.com/images/media/drink/zvsre31572902738.jpg',
//     doneDate: '23/06/2020',
//     tags: [],
//   },
// ];

// localStorage.setItem('doneRecipes', JSON.stringify(doneRecipesMock));

function DoneRecipes() {
  const [recipes, setRecipe] = useState([]);
  const [filterFood, setFilterFood] = useState([]);

  function getDoneRecipe() {
    if (localStorage.getItem('doneRecipes')) {
      const doneRecipes = JSON.parse(localStorage.getItem('doneRecipes'));
      setRecipe(doneRecipes);
      setFilterFood(doneRecipes);
    }
  }

  useEffect(() => {
    getDoneRecipe();
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
      <Header title="Receitas Feitas" />
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
      <section className="cards">
        {
          filterFood.map((recipe, index) => (
            <DoneRecipesCard
              index={ index }
              id={ recipe.id }
              key={ uuidv4() }
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
      </section>
    </div>
  );
}

export default DoneRecipes;
