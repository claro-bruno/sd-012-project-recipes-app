import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router';
import { Link } from 'react-router-dom';
import ShareAndFavBtn from '../components/ShareAndFaveBtn';
import genericFetchAPI from '../services/genericFetchAPI';
import './RecipeInProgress.css';

function getIngredientsAndMeasures(recipe, setIngredientsList, setMeasureList) {
  const MAX_INGREDIENTS = 15;
  const ingredients = [];
  const measures = [];
  if (recipe) {
    for (let index = 1; index <= MAX_INGREDIENTS; index += 1) {
      if (recipe[`strIngredient${index}`]) {
        ingredients.push(recipe[`strIngredient${index}`]);
        measures.push(recipe[`strMeasure${index}`]);
      }
    }
    setIngredientsList(ingredients);
    setMeasureList(measures);
  }
}

function isRecipeFinished(setRecipeIsFinished) {
  const tags = document.getElementsByTagName('input');
  const isFinish = (Array.prototype.slice.call(tags)).every((tag) => tag.checked);
  setRecipeIsFinished(isFinish);
}

function RecipeInProgress() {
  const [recipe, setRecipe] = useState();
  const [ingredientsList, setIngredientsList] = useState([]);
  const [measureList, setMeasureList] = useState([]);
  const { pathname } = useLocation();
  const recipeId = pathname.split('/')[2];
  const [recipeIsFinished, setRecipeIsFinished] = useState(false);
  const [ingredientsDone, setIngredientsDone] = useState(
    JSON.parse(localStorage.getItem('inProgressRecipes'))
      ? JSON.parse(localStorage.getItem('inProgressRecipes')).meals[recipeId]
      || JSON.parse(localStorage.getItem('inProgressRecipes')).cocktails[recipeId]
      || []
      : [],
  );

  const handleIngredientsDone = (index) => {
    if (!ingredientsDone.includes(index)) {
      setIngredientsDone((old) => [...old, index]);
    } else {
      setIngredientsDone((old) => old.filter((num) => num !== index));
    }
  };

  useEffect(() => {
    const recipeInProgressSTG = localStorage.getItem('inProgressRecipes')
  || { cocktails: {}, meals: {} };
    if (pathname.includes('comidas')) {
      localStorage
        .setItem('inProgressRecipes', JSON.stringify({
          cocktails: { ...recipeInProgressSTG.cocktails },
          meals: {
            ...recipeInProgressSTG.meals,
            [recipeId]: ingredientsDone,
          },
        }));
    } else {
      localStorage
        .setItem('inProgressRecipes', JSON.stringify({
          meals: { ...recipeInProgressSTG.meals },
          cocktails: {
            ...recipeInProgressSTG.cocktails,
            [recipeId]: ingredientsDone,
          },
        }));
    }
  }, [ingredientsDone, pathname, recipeId]);

  useEffect(() => {
    getIngredientsAndMeasures(recipe, setIngredientsList, setMeasureList);
  }, [recipe]);

  useEffect(() => {
    const mealOrCocktail = pathname.includes('comidas') ? 'meal' : 'cocktail';
    genericFetchAPI(mealOrCocktail, 'lookup', 'i', recipeId)
      .then((result) => {
        setRecipe((result.meals || result.drinks)[0]);
      });
  }, [pathname, recipeId]);

  return recipe ? (
    <section>
      <img
        alt="recipe"
        data-testid="recipe-photo"
        height="150px"
        src={ recipe.strMealThumb || recipe.strDrinkThumb }
        width="150px"
      />
      <div>
        <h2 data-testid="recipe-title">{ recipe.strMeal || recipe.strDrink}</h2>
        <p data-testid="recipe-category">{ recipe.strCategory }</p>
      </div>
      <div>
        <ShareAndFavBtn recipe={ recipe } />
      </div>
      <div>
        <h3>Ingredients</h3>
        <form>
          {ingredientsList.map((ingredient, index) => (
            <div key={ index } data-testid={ `${index}-ingredient-step` }>
              <input
                type="checkbox"
                id={ `${index}-ingredient` }
                checked={ ingredientsDone.includes(index) }
                onChange={ () => {
                  isRecipeFinished(setRecipeIsFinished);
                  handleIngredientsDone(index);
                } }
              />
              <label htmlFor={ `${index}-ingredient` }>
                {`${ingredient} - ${measureList[index]}`}
              </label>
            </div>
          ))}
        </form>
      </div>
      <div>
        <h3>Instructions</h3>
        <p data-testid="instructions">{recipe.strInstructions}</p>
      </div>
      <Link to="/receitas-feitas">
        <button
          data-testid="finish-recipe-btn"
          type="button"
          disabled={ !recipeIsFinished }
        >
          Finish Recipe
        </button>
      </Link>
    </section>
  ) : <p>Loading</p>;
}

export default RecipeInProgress;
