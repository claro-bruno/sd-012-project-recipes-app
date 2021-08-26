import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import Button from '@material-ui/core/Button';
import shareIcon from '../images/shareIcon.svg';
import whiteHeartIcon from '../images/whiteHeartIcon.svg';

function FoodDetails({ match: { params: { id } } }) {
  const [food, setFood] = useState({});
  const [recomendedDrink, setRecomendedDrink] = useState({});
  const { strMealThumb, strMeal, strCategory, strInstructions, strYoutube } = food;
  const [ingredientList, setIngredientList] = useState([]);
  const mystyle = {
    bottom: '0px',
    position: 'fixed',
  };
  const imgStyle = {
    width: '300px',
  };

  const fetchRecomendedDrink = async () => {
    const endPointRecomendedDrink = 'https://www.thecocktaildb.com/api/json/v1/1/search.php?s=';
    const request = await fetch(endPointRecomendedDrink);
    const response = await request.json();
    setRecomendedDrink(response);
  };

  useEffect(() => {
    const fetchFoodById = async () => {
      const endPointFoodById = `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`;
      const request = await fetch(endPointFoodById);
      const response = await request.json();
      setFood(response.meals[0]);
    };
    fetchFoodById();
    fetchRecomendedDrink();
  }, [id]);

  useEffect(() => {
    const ingredientsArray = [];
    const maxIngredients = 20;
    for (let index = 0; index < maxIngredients; index += 1) {
      const ingredient = food[`strIngredient${index}`];
      const measure = food[`strMeasure${index}`];
      if (ingredient) {
        ingredientsArray.push({
          ingredient,
          measure,
        });
      }
    }
    setIngredientList(ingredientsArray);
  }, [food]);

  return (
    <div>
      Detalhes de comidas:
      <div>
        <img
          style={ imgStyle }
          data-testid="recipe-photo"
          src={ strMealThumb }
          alt={ food }
        />
      </div>
      <div>
        <h3 data-testid="recipe-title">{ strMeal }</h3>
        <Button
          type="button"
          data-testid="share-btn"
        >
          <img src={ shareIcon } alt="share" />
        </Button>
        <Button
          type="button"
          data-testid="favorite-btn"
        >
          <img src={ whiteHeartIcon } alt="favorite" />
        </Button>
        <p data-testid="recipe-category">{ strCategory }</p>
        <p>Ingredientes:</p>
        <ul>
          {ingredientList.map((ingredient, index) => (
            <li
              key={ index }
              data-testid={ `${index}-ingredient-name-and-measure` }
            >
              { `${ingredient.ingredient} - ${ingredient.measure}` }
            </li>))}
        </ul>
        <p data-testid="instructions">{ strInstructions }</p>
        <iframe
          title={ strMeal }
          src={ strYoutube }
          data-testid="video"
        />
        {/* <p
          key={ index }
          data-testid={ `${index}-recomendation-card` }
        >
          Recomendações aqui
        </p> */}
        <Button
          style={ mystyle }
          variant="contained"
          color="primary"
          type="button"
          data-testid="start-recipe-btn"
        >
          Iniciar Receita

        </Button>
      </div>
    </div>
  );
}

FoodDetails.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      id: PropTypes.string,
    }),
  }).isRequired,
};

export default FoodDetails;

// referencia tag iframe para video: https://www.w3schools.com/html/html_youtube.asp
