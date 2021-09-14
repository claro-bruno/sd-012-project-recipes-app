import React, { useEffect } from 'react';
import { useParams, useHistory } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import RecipeHeader from '../Components/RecipeHeader';
import IngredientsCard from '../Components/IngredientsCard';
import { getMealRecipeById } from '../Redux/actions/actionSetRecipeDetails';

function CurrentMeal() {
  const { id } = useParams();
  const { recipeDetails: { mealDetail } } = useSelector((state) => state);
  const dispatch = useDispatch();
  const { push } = useHistory();

  useEffect(() => {
    dispatch(getMealRecipeById(id));
  }, [dispatch, id]);

  if (!mealDetail.meals) {
    return <h1>Loading...</h1>;
  }

  return (
    <div>
      {mealDetail.meals[0] && (
        <div>
          <RecipeHeader
            thumb={ mealDetail.meals[0].strMealThumb }
            title={ mealDetail.meals[0].strMeal }
            category={ mealDetail.meals[0].strCategory }
            recipe={ mealDetail.meals[0] }
            type="comida"
            id={ id }
          />
          <IngredientsCard recipe={ mealDetail.meals[0] } />
          <h1>Instructions</h1>
          <p data-testid="instructions">{mealDetail.meals[0].strInstructions}</p>
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
