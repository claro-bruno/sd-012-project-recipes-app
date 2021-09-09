import React, { useEffect, useState } from 'react';
import { useParams, useHistory } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import RecipeHeader from '../Components/RecipeHeader';
import IngredientsCard from './IngredientsCard';
// import { setMealDetails } from '../Redux/actions/actionSetRecipeDetails';

function CurrentMeal() {
  const { id } = useParams();
  const [currentRecipe, setCurrentRecipe] = useState(null);
  const dispatch = useDispatch();
  const { push } = useHistory();

  useEffect(() => {
    const getCurrentRecipe = async () => {
      const END_POINT = `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`;
      const response = await fetch(END_POINT);
      const meals = await response.json();
      setCurrentRecipe(meals.meals[0]);
      // dispatch(setMealDetails(meals));
      // console.log(meals.meals[0]);
    };
    getCurrentRecipe();
  }, [dispatch, id]);

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
          <ul>
            <IngredientsCard recipe={ currentRecipe } />
          </ul>
          <h1>Instructions</h1>
          <p data-testid="instructions">{currentRecipe.strInstructions}</p>
          <button
            type="button"
            data-testid="finish-recipe-btn"
            onClick={ () => push('/receitas-feitas') }
          >
            Finalizar Receita
          </button>
        </div>)}
    </div>
  );
}

export default CurrentMeal;
