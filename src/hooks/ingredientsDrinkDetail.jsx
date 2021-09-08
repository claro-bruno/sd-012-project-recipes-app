import { useEffect, useState } from 'react';
import RecipesDrinkDetails from './recipesDrinkDetails';

const IngredientsAndMeasuresDrinkDetails = () => {
  const [ingredients, setIngredients] = useState([]);
  const [measure, setMeasure] = useState([]);
  const [recipesDrink] = RecipesDrinkDetails();

  useEffect(() => {
    const getIngredientsAndMeasures = () => {
      const key = Object.keys(recipesDrink[0])
        .filter((item) => item.includes('strIngredient'));
      const ingredientNotEmpty = key
        .filter((item) => (
          recipesDrink[0][item] !== '' && recipesDrink[0][item] !== null));
      const ingredientsList = ingredientNotEmpty
        .map((keyDrink) => recipesDrink[0][keyDrink]);
      setIngredients(ingredientsList);

      const keyMeasure = Object.keys(recipesDrink[0])
        .filter((item) => item.includes('strMeasure'));
      const measureNoEmpty = keyMeasure
        .filter((item) => (
          recipesDrink[0][item] !== '' && recipesDrink[0][item] !== null));
      const measureList = measureNoEmpty.map((kMeasure) => recipesDrink[0][kMeasure]);
      setMeasure(measureList);
    };
    getIngredientsAndMeasures();
  }, [recipesDrink]);

  return [ingredients, measure];
};

export default IngredientsAndMeasuresDrinkDetails;
