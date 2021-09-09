import React from 'react';
import IngredientsAndMeasuresFoodDetails from '../../hooks/ingredientsFoodDetail';

function FoodIngredientsDetail() {
  const [ingredients, measure] = IngredientsAndMeasuresFoodDetails();
  return (
    <div>
      <h3>Ingredientes</h3>
      <ul>
        { ingredients.map((ingredient, indx) => (
          <li
            key={ indx }
            data-testid={ `${indx}-ingredient-name-and-measure` }
          >
            { `${measure[indx]} ${ingredient}` }
          </li>
        )) }
      </ul>
    </div>
  );
}

export default FoodIngredientsDetail;
