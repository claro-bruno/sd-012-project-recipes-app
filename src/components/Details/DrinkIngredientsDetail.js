import React from 'react';
import IngredientsAndMeasuresDrinkDetails from '../../hooks/ingredientsDrinkDetail';

function DrinkIngredientsDetail() {
  const [ingredients, measure] = IngredientsAndMeasuresDrinkDetails();
  return (
    <div>
      <h3>Ingredientes</h3>
      <ul>
        { ingredients.map((ingredient, indx) => (
          <li
            key={ ingredient }
            data-testid={ `${indx}-ingredient-name-and-measure` }
          >
            { `${measure[indx]} ${ingredient}` }
          </li>
        )) }
      </ul>
    </div>
  );
}

export default DrinkIngredientsDetail;
