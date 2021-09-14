import React, { useEffect } from 'react';
import { useParams, useHistory } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import RecipeHeader from '../Components/RecipeHeader';
import IngredientsCard from '../Components/IngredientsCard';
import { getDrinkRecipeById } from '../Redux/actions/actionSetRecipeDetails';

function CurrentDrink() {
  const { id } = useParams();
  const { recipeDetails: { drinkDetail } } = useSelector((state) => state);
  const dispatch = useDispatch();
  const { push } = useHistory();

  useEffect(() => {
    dispatch(getDrinkRecipeById(id));
  }, [dispatch, id]);

  if (!drinkDetail.drinks) {
    return <h1>Loading...</h1>;
  }

  return (
    <div>
      {drinkDetail.drinks[0] && (
        <div>
          <RecipeHeader
            thumb={ drinkDetail.drinks[0].strDrinkThumb }
            title={ drinkDetail.drinks[0].strDrink }
            category={ drinkDetail.drinks[0].strCategory }
            recipe={ drinkDetail.drinks[0] }
            type="comida"
            id={ id }
          />
          <IngredientsCard recipe={ drinkDetail.drinks[0] } />
          <h1>Instructions</h1>
          <p data-testid="instructions">{drinkDetail.drinks[0].strInstructions}</p>
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

export default CurrentDrink;
