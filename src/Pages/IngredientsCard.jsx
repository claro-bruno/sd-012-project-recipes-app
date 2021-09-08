import React, { useState, useEffect } from 'react';
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
<<<<<<< HEAD
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
=======
    <li>
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
    </li>
>>>>>>> 2831a69057f5c975ab99b8a5281210290c5639a1
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
