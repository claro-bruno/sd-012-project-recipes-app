import React, { useState, useEffect } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { objectOf, string } from 'prop-types';
import createIngredientsAndMesure from '../helper/redoRecipe';

function IngredientsCard({ recipe }) {
  const [ingredients, setIngredients] = useState([]);
  const [measures, setMeasures] = useState([]);

  useEffect(() => {
    console.log(recipe);
    setIngredients(createIngredientsAndMesure(recipe, 'ingredients'));
    setMeasures(createIngredientsAndMesure(recipe, 'mesure'));
  }, [recipe]);

  const createRecipe = (item, key) => (
    <li>
      <label
        htmlFor="ingredients"
        key={ uuidv4() }
      >
        {`${item} - ${measures[key]}`}
        <input
          id="ingredients"
          type="checkbox"
          data-testid={ `${key}-ingredient-step` }
        />
      </label>
    </li>
  );

  return (
    <div>
      <h1 data-testid="recipe-category">Ingredients</h1>
      {ingredients.map((item, key) => createRecipe(item, key))}
    </div>
  );
}

IngredientsCard.propTypes = {
  recipe: objectOf(string).isRequired,
};

export default IngredientsCard;
