import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

const RecipesDrinkDetails = () => {
  const [recipesDrink, setRecipesDrink] = useState([{}]);
  const { id } = useParams();

  useEffect(() => {
    const getRecipesDrink = async () => {
      const endpoint = `https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=${id}`;
      const { drinks } = await fetch(endpoint).then((data) => data.json());
      setRecipesDrink(drinks);
    };
    getRecipesDrink();
  }, [id]);

  return [recipesDrink];
};

export default RecipesDrinkDetails;
