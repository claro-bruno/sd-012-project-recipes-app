import React from 'react';
import { Image } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.css';
import RecipesDrinkDetails from '../../hooks/recipesDrinkDetails';
import DrinkCarousel from '../../components/Details/CarouselDrinkDetail';
import ButtonDrink from '../../components/Details/StartButtonDrink';
import ShareButton from '../../components/ShareButton';
import FavoriteButton from '../../components/FavoriteButton';
import DrinkIngredientsDetail from '../../components/Details/DrinkIngredientsDetail';

function DrinksDetails() {
  const [recipesDrink] = RecipesDrinkDetails();

  return (
    <main>
      { recipesDrink ? recipesDrink.map((item, index) => (
        <div key={ index }>
          <Image
            data-testid="recipe-photo"
            src={ item.strDrinkThumb }
            alt="receita pronta"
            fluid
          />
          <h2 data-testid="recipe-title">{ item.strDrink }</h2>
          <p data-testid="recipe-category">{ item.strAlcoholic }</p>
          <ShareButton />
          <FavoriteButton
            infos={ {
              id: item.idDrink,
              type: 'bebida',
              area: '',
              category: item.strCategory,
              alcoholicOrNot: item.strAlcoholic,
              name: item.strDrink,
              image: item.strDrinkThumb,
            } }
          />
          <p data-testid="instructions">{ item.strInstructions }</p>
        </div>
      )) : <p>loading...</p> }
      <DrinkIngredientsDetail />
      <DrinkCarousel />
      <ButtonDrink />
    </main>
  );
}

export default DrinksDetails;
