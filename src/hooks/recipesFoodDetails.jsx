import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

const RecipesFoodDetail = () => {
  const [recipesFood, setRecipesFood] = useState([{}]);
  const { id } = useParams();

  useEffect(() => {
    const getRecipesFood = async () => {
      const endpoint = `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`;
      const { meals } = await fetch(endpoint).then((data) => data.json());
      setRecipesFood(meals);
    };
    getRecipesFood();
  }, [id]);

  return [recipesFood];
};

export default RecipesFoodDetail;
