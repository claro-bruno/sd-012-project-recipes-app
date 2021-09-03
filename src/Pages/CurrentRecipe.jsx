import React from 'react';
import { useSelector } from 'react-redux';
import RecipeHeader from '../Components/RecipeHeader';
import IngredientsCard from './IngredientsCard';

// import { useHistory, useLocation } from 'react-router-dom';

function CurrentRecipe() {
  // const [recipes, setRecipe] = React.useState([]);
  const recipe = useSelector((state) => state.recipeDetail.mealDetail);
  console.log(recipe);

  return (
    <div>
      <RecipeHeader
        thumb={ recipe.strMealThumb }
        title={ recipe.strMeal }
        category={ recipe.strCategory }
        recipe={ recipe }
        type="comida"
      />
      <IngredientsCard />
      <h1>Instructions</h1>
      <p data-testid="instructions">{recipe.strInstructions}</p>
      <button
        type="button"
        data-testid="finish-recipe-btn"
      >
        Finalizar Receita
      </button>
    </div>
  );
}

export default CurrentRecipe;
