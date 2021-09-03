import React from 'react';
import { useSelector } from 'react-redux';
import RecipeHeader from '../Components/RecipeHeader';

// import { useHistory, useLocation } from 'react-router-dom';

function CurrentRecipe() {
  // const [recipes, setRecipe] = React.useState([]);
  const recipe = useSelector((state) => state.recipeDetails);
  console.log(recipe);

  return (
    <div>
      <RecipeHeader
        thumb={ recipe.strMealThumb }
        title={ recipe.strMeal }
        category={ recipe.strCategory }
        recipe={ recipe }
        type="comida"
      />
    </div>
  );
}

export default CurrentRecipe;
