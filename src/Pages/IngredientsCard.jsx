import React, { useState, useEffect } from 'react';
import { objectOf, string } from 'prop-types';
import createIngredientsAndMesure from '../helper/redoRecipe';

function IngredientsCard({ recipe }) {
  const [ingredients, setIngredients] = useState([]);
  const [measures, setMeasures] = useState([]);

  useEffect(() => {
    setIngredients(createIngredientsAndMesure(recipe, 'ingredients'));
    setMeasures(createIngredientsAndMesure(recipe, 'mesure'));
  }, [recipe]);

  const createRecipe = (item, key) => (
    <label
      htmlFor="ingredients"
      key={ key }
    >
      {`${item} - ${measures[key]}`}
      <input
        id="ingredients"
        type="checkbox"
        data-testid={ `${key}-ingredient-step` }
      />
    </label>
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
