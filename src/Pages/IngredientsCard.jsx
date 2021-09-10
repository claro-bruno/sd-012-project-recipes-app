import React, { useState, useEffect } from 'react';
import { v4 as uuidv4 } from 'uuid';
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
    <div
      key={ uuidv4() }
    >
      <label
        type="checkbox"
        htmlFor={ `${key}-ingredients` }
      >
        <input
          type="checkbox"
          id={ `${key}-ingredients` }
          data-testid={ `${key}-ingredient-step` }
        />
        {`${item} - ${measures[key]}`}
      </label>
      <div>
        <label
          htmlFor={ `${key}-ingredients` }
        >
          <input
            id={ `${key}-ingredients` }
            type="checkbox"
            data-testid={ `${key}-ingredient-step` }
          />
          {`${item} - ${measures[key]}`}
        </label>
      </div>
    </div>
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
