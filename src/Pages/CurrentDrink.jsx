import React, { useEffect, useState } from 'react';
import { useParams, useHistory } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import RecipeHeader from '../Components/RecipeHeader';
import IngredientsCard from './IngredientsCard';

function CurrentDrink() {
  const { id } = useParams();
  const [currentDrink, setCurrentDrink] = useState([]);
  const dispatch = useDispatch();
  const { push } = useHistory();

  useEffect(() => {
    const getCurrentRecipe = async () => {
      const END_POINT = `https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=${id}`;
      const response = await fetch(END_POINT);
      const drink = await response.json();
      console.log(drink);
      setCurrentDrink(drink.drinks[0]);
    };
    getCurrentRecipe();
  }, [dispatch, id]);

  return (
    <div>
      <RecipeHeader
        thumb={ currentDrink.strDrinkThumb }
        title={ currentDrink.strDrink }
        category={ currentDrink.strAlcoholic }
        recipe={ currentDrink }
        type="bebida"
        id={ id }
      />
      <ul>
        <IngredientsCard recipe={ currentDrink } />
      </ul>
      <h1>Instructions</h1>
      <p data-testid="instructions">{currentDrink.strInstructions}</p>
      <button
        type="button"
        data-testid="finish-recipe-btn"
        onClick={ () => push('/receitas-feitas') }
      >
        Finalizar Receita
      </button>
    </div>
  );
}

export default CurrentDrink;
