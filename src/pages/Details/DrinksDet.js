import React from 'react';
import { Image } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.css';
import IngredientsAndMeasuresDrinkDetails from '../../hooks/ingredientsDrinkDetail';
import RecipesDrinkDetails from '../../hooks/recipesDrinkDetails';
import DrinkCarousel from '../../components/Details/CarouselDrinkDetail';
import ButtonDrink from '../../components/Details/StartButtonDrink';
import ShareButton from '../../components/ShareButton';
import FavoriteButton from '../../components/FavoriteButton';

function DrinksDetails() {
  const [recipesDrink] = RecipesDrinkDetails();
  const [ingredients, measure] = IngredientsAndMeasuresDrinkDetails();

  return (
    <main>
      { recipesDrink ? recipesDrink.map((item) => (
        <div key={ item.strDrink }>
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
          <div>
            <h3>Ingredientes</h3>
            <ul>
              { ingredients.map((ingredient, indx) => (
                <li
                  key={ indx }
                  data-testid={ `${indx}-ingredient-name-and-measure` }
                >
                  { `${measure[indx]} ${ingredient}` }

                </li>
              )) }
            </ul>
          </div>
          <p data-testid="instructions">{ item.strInstructions }</p>
          <DrinkCarousel />
          <ButtonDrink />
        </div>
      )) : <p>loading...</p> }
    </main>
  );
}

export default DrinksDetails;
