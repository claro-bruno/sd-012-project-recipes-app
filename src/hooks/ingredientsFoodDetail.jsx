import { useState, useEffect } from 'react';
import RecipesFoodDetail from './recipesFoodDetails';

const IngredientsAndMeasuresFoodDetails = () => {
  const [ingredients, setIngredients] = useState([]);
  const [measure, setMeasure] = useState([]);
  const [recipesFood] = RecipesFoodDetail();

  useEffect(() => {
    const getIngredients = () => {
      if (recipesFood) {
        const key = Object.keys(recipesFood[0])
          .filter((item) => item.includes('strIngredient'));
        const ingredientNotEmpty = key
          .filter((item) => recipesFood[0][item] !== '' && recipesFood[0][item] !== null);
        const ingredientsList = ingredientNotEmpty
          .map((keyFood) => recipesFood[0][keyFood]);
        setIngredients(ingredientsList);

        const keyMeasure = Object.keys(recipesFood[0])
          .filter((item) => item.includes('strMeasure'));
        const measureNoEmpty = keyMeasure
          .filter((item) => recipesFood[0][item] !== '' && recipesFood[0][item] !== null);
        const measureList = measureNoEmpty.map((kMeasure) => recipesFood[0][kMeasure]);
        setMeasure(measureList);
      }
    };
    getIngredients();
  }, [recipesFood]);

  return [ingredients, measure];
};

export default IngredientsAndMeasuresFoodDetails;
