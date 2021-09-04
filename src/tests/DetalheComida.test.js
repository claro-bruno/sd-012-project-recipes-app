import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from './renderWithRouter';
import * as ComidasAPI from '../service/ComidasAPI';
import App from '../App';

const url = '/comidas/52772';

const foodResult = [
  {
    idMeal: '52772',
    strCategory: 'Chicken',
    strIngredient1: 'soy sauce',
    strIngredient2: 'water',
    strIngredient3: 'brown sugar',
    strIngredient4: 'ground ginger',
    strIngredient5: 'minced garlic',
    strIngredient6: 'cornstarch',
    strIngredient7: 'chicken breasts',
    strIngredient8: 'stir-fry vegetables',
    strIngredient9: 'brow rice',
    strInstructions: `Preheat oven to 350° F.
      Spray a 9x13-inch baking pan with non-stick spray.
      Combine soy sauce, ½ cup water, brown sugar,
      ginger and garlic in a small saucepan and cover.
      Bring to a boil over medium heat.
      Remove lid and cook for one minute once boiling.
      Meanwhile, stir together the corn starch and 2
      tablespoons of water in a separate dish until smooth.
      Once sauce is boiling, add mixture
      to the saucepan and stir to combine.
      Cook until the sauce starts to thicken
      then remove from heat. Place the chicken breasts in the prepared pan.
      Pour one cup of the sauce over top of chicken.
      Place chicken in oven and bake 35 minutes or until cooked through.
      Remove from oven and shred chicken in the dish using two forks.
      *Meanwhile, steam or cook the vegetables according to package directions.
      Add the cooked vegetables and rice to the casserole dish with the chicken.
      Add most of the remaining sauce, reserving
      a bit to drizzle over the top when serving.
      Gently toss everything together in the casserole
      dish until combined. Return to oven and cook 15 minutes.
      Remove from oven and let stand 5 minutes before serving.
      Drizzle each serving with remaining sauce. Enjoy!`,
    strMeal: 'Teriyaki Chicken Casserole',
    strMealThumb: 'https://www.themealdb.com/images/media/meals/wvpsxx1468256321.jpg',
    strMeasure1: '3/4 cup',
    strMeasure2: '1/2 cup',
    strMeasure3: '1/4 cup',
    strMeasure4: '1/2 teaspoon',
    strMeasure5: '1/2 teaspoon',
    strMeasure6: '4 Tablespoons',
    strMeasure7: '2',
    strMeasure8: '1 (12 oz.)',
    strMeasure9: '3 cups',
    strYoutube: 'https://www.youtube.com/watch?v=4aZr5hZXP_s',
  },
];

describe('Testes da pagina de detalhes de comida', () => {
  beforeEach(() => {
    jest.spyOn(ComidasAPI, 'buscarComidaPeloID').mockResolvedValue(foodResult);
  });
  it('Verifica se a imagem principal de comida existe', async () => {
    const { history } = renderWithRouter(<App />);
    history.push(url);

    const mainImage = await screen.findByTestId('recipe-photo');

    expect(mainImage).toHaveProperty('src', 'https://www.themealdb.com/images/media/meals/wvpsxx1468256321.jpg');
  });
});
