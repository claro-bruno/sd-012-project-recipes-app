import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import RecipeHeader from '../Components/RecipeHeader';
import IngredientsCard from './IngredientsCard';
import { setMealDetails } from '../Redux/actions/actionSetRecipeDetails';

// import { useHistory, useLocation } from 'react-router-dom';

function CurrentRecipe() {
  const [currentRecipe, setCurrentRecipe] = useState(null);
  const dispatch = useDispatch();

  useEffect(() => {
    const getCurrentRecipe = async () => {
      const END_POINT = 'https://www.themealdb.com/api/json/v1/1/search.php?s=Arrabiata';
      const response = await fetch(END_POINT);
      const recipe = await response.json();
      setCurrentRecipe(recipe.meals[0]);
      dispatch(setMealDetails(recipe));
      console.log(recipe.meals[0]);
    };
    getCurrentRecipe();
  }, [dispatch]);

  return (
    <div>
      {currentRecipe && (
        <div>
          <RecipeHeader
            thumb={ currentRecipe.strMealThumb }
            title={ currentRecipe.strMeal }
            category={ currentRecipe.strCategory }
            recipe={ currentRecipe }
            type="comida"
          />
          <IngredientsCard recipe={ currentRecipe } />
          <h1>Instructions</h1>
          <p data-testid="instructions">{currentRecipe.strInstructions}</p>
          <button
            type="button"
            data-testid="finish-recipe-btn"
          >
            Finalizar Receita
          </button>
        </div>)}
    </div>
  );
}

export default CurrentRecipe;
