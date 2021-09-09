import React from 'react';
import { Image } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.css';
import RecipesFoodDetail from '../../hooks/recipesFoodDetails';
import FoodCarousel from '../../components/Details/CarouselFoodDetail';
import ButtonFood from '../../components/Details/StartButtonFood';
import ShareButton from '../../components/ShareButton';
import FavoriteButton from '../../components/FavoriteButton';
import FoodIngredientsDetail from '../../components/Details/FoodIngredientsDetail';

function FoodDetails() {
  const [recipesFood] = RecipesFoodDetail();

  return (
    <main>
      { recipesFood ? recipesFood.map((item, index) => (
        <div key={ index }>
          <Image
            data-testid="recipe-photo"
            src={ item.strMealThumb }
            alt="receita pronta"
            fluid
          />
          <h2 data-testid="recipe-title">{ item.strMeal }</h2>
          <p data-testid="recipe-category">{ item.strCategory }</p>
          <ShareButton />
          <FavoriteButton
            infos={ {
              id: item.idMeal,
              type: 'comida',
              area: item.strArea,
              category: item.strCategory,
              alcoholicOrNot: '',
              name: item.strMeal,
              image: item.strMealThumb,
            } }
          />
          <p data-testid="instructions">{ item.strInstructions }</p>
          <iframe
            title="food-video"
            data-testid="video"
            width="10"
            height="10"
            src={ item.strYoutube }
          />
        </div>
      )) : <p>loading...</p> }
      <FoodIngredientsDetail />
      <FoodCarousel />
      <ButtonFood />
    </main>
  );
}

export default FoodDetails;
