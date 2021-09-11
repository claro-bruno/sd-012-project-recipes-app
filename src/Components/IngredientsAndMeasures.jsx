import React, { useState, useEffect } from 'react';
import { objectOf, string } from 'prop-types';
import { v4 as uuidv4 } from 'uuid';
import createIngredientsAndMesure from '../helper/redoRecipe';

function IngredientsAndMeasures({ recipe }) {
  const [ingredients, setIngredients] = useState([]);
  const [measures, setMeasures] = useState([]);

  useEffect(() => {
    setIngredients(createIngredientsAndMesure(recipe, 'ingredients'));
    setMeasures(createIngredientsAndMesure(recipe, 'mesure'));
  }, [recipe]);

  const createRecipe = (item, key) => (
    <li
      key={ uuidv4() }
      data-testid={ `${key}-ingredient-name-and-measure` }
    >
      {`${item} - ${measures[key]}`}
    </li>
  );

  return (
    <section className="ing-details">
      <h1>Ingredients</h1>
      <div>
        <ul>
          {ingredients.map((item, key) => createRecipe(item, key))}
        </ul>
      </div>
    </section>
  );
}
IngredientsAndMeasures.propTypes = {
  recipe: objectOf(string).isRequired,
};

export default IngredientsAndMeasures;
