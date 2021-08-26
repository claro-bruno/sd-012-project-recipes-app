import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router';
import { Spinner } from 'react-bootstrap';
import RecipeDetailCard from '../components/RecipeDetailCard';
import { getDataDetails } from '../services/api';
import ingredientsDetails from '../helpers/getIngredients';

export default function FoodDetails() {
  const { id } = useParams();

  const [recipes, setRecipes] = useState({ id });
  const [loading, setLoading] = useState(true);
  const [drinkIndex, setDrinkIndex] = useState(0);

  // Falta adicionar index para passar no teste

  useEffect(() => {
    const getRecipes = async (foodId) => {
      await getDataDetails(foodId).then((response) => setRecipes(response));
      setLoading(false);
    };
    getRecipes(id);
  }, [id]);

  useEffect(() => {
    setDrinkIndex(((prevState) => prevState));
  }, [recipes]);

  const {
    idMeal,
    strMealThumb,
    strMeal,
    strCategory,
    strInstructions,
    strYoutube,
  } = recipes;

  console.log(drinkIndex);

  return (
    <div>
      {loading ? (
        <Spinner animation="border" />
      ) : (
        <RecipeDetailCard
          key={ idMeal }
          img={ strMealThumb }
          index={ drinkIndex }
          title={ strMeal }
          category={ strCategory }
          ingredients={
            idMeal ? ingredientsDetails(recipes).map((item) => item) : []
          }
          instructions={ strInstructions }
          video={ strYoutube }
        />
      )}
    </div>
  );
}
