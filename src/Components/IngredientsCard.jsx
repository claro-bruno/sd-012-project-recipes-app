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
    <li
      key={ key }
      data-testid={ `${key}-ingredient-step` }
    >
      <input
        type="checkbox"
        id={ `${key}-ingredients` }
      />
      {`${item} - ${measures[key]}`}
    </li>
  );

  return (
    <>
      <h1 data-testid="recipe-category">Ingredients</h1>
      {ingredients.map((item, key) => createRecipe(item, key))}
    </>  
  );
}

IngredientsCard.propTypes = {
  recipe: objectOf(string).isRequired,
};

export default IngredientsCard;
