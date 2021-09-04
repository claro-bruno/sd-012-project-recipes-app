import React from 'react';
import { findByRole, findByTestId, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from './renderWithRouter';
import * as ComidasAPI from '../service/ComidasAPI';
import shareIcon from '../images/shareIcon.svg';
import whiteHeartIcon from '../images/whiteHeartIcon.svg';
import App from '../App';

const url = '/comidas/52772';
const ingredientsIds = {
  ingredient1: '0-ingredient-name-and-measure',
  ingredient2: '1-ingredient-name-and-measure',
  ingredient3: '2-ingredient-name-and-measure',
  ingredient4: '3-ingredient-name-and-measure',
  ingredient5: '4-ingredient-name-and-measure',
  ingredient6: '5-ingredient-name-and-measure',
  ingredient7: '6-ingredient-name-and-measure',
  ingredient8: '7-ingredient-name-and-measure',
  ingredient9: '8-ingredient-name-and-measure',
};

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
    strIngredient9: 'brown rice',
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

  it('Verifica se a imagem principal renderiza corretamente', async () => {
    const { history } = renderWithRouter(<App />);
    history.push(url);

    const mainImage = await screen.findByTestId('recipe-photo');

    expect(mainImage).toHaveProperty('src', 'https://www.themealdb.com/images/media/meals/wvpsxx1468256321.jpg');
  });

  it('Verifica se o título da comida renderiza corretamente', async () => {
    const { history } = renderWithRouter(<App />);
    history.push(url);

    const mainTitle = await screen.findByTestId('recipe-title');

    expect(mainTitle.innerHTML).toBe('Teriyaki Chicken Casserole');
  });

  it('Verifica se os botões de compartilhar e favoritar renderizam normalmente',
    async () => {
      const { history } = renderWithRouter(<App />);
      history.push(url);

      const shareBtn = await screen.findByTestId('share-btn');
      const favoriteBtn = await screen.findByTestId('favorite-btn');

      expect(shareBtn).toHaveProperty('src', `http://localhost/${shareIcon}`);
      expect(favoriteBtn).toHaveProperty('src', `http://localhost/${whiteHeartIcon}`);
    });

  it('Verifica se a categoria da comida é renderizada normalmente', async () => {
    const { history } = renderWithRouter(<App />);
    history.push(url);

    const category = await screen.findByTestId('recipe-category');

    expect(category.innerHTML).toBe('Chicken');
  });

  it('Verifica se existe o título "Ingredients"', async () => {
    const { history } = renderWithRouter(<App />);
    history.push(url);

    const ingredientTitle = await screen.findByRole('heading', { name: 'Ingredients' });

    expect(ingredientTitle.innerHTML).toBeDefined();
  });

  it('Verifica se todos os ingredientes são renderizados corretamente', async () => {
    const { history } = renderWithRouter(<App />);
    history.push(url);

    const ingredient1 = await screen.findByTestId(ingredientsIds.ingredient1);
    const ingredient2 = await screen.findByTestId(ingredientsIds.ingredient2);
    const ingredient3 = await screen.findByTestId(ingredientsIds.ingredient3);
    const ingredient4 = await screen.findByTestId(ingredientsIds.ingredient4);
    const ingredient5 = await screen.findByTestId(ingredientsIds.ingredient5);
    const ingredient6 = await screen.findByTestId(ingredientsIds.ingredient6);
    const ingredient7 = await screen.findByTestId(ingredientsIds.ingredient7);
    const ingredient8 = await screen.findByTestId(ingredientsIds.ingredient8);
    const ingredient9 = await screen.findByTestId(ingredientsIds.ingredient9);

    expect(ingredient1.innerHTML).toBe('- soy sauce - 3/4 cup');
    expect(ingredient2.innerHTML).toBe('- water - 1/2 cup');
    expect(ingredient3.innerHTML).toBe('- brown sugar - 1/4 cup');
    expect(ingredient4.innerHTML).toBe('- ground ginger - 1/2 teaspoon');
    expect(ingredient5.innerHTML).toBe('- minced garlic - 1/2 teaspoon');
    expect(ingredient6.innerHTML).toBe('- cornstarch - 4 Tablespoons');
    expect(ingredient7.innerHTML).toBe('- chicken breasts - 2');
    expect(ingredient8.innerHTML).toBe('- stir-fry vegetables - 1 (12 oz.)');
    expect(ingredient9.innerHTML).toBe('- brown rice - 3 cups');
  });

  it('Verifica se existe o título "Instructions"', async () => {
    const { history } = renderWithRouter(<App />);
    history.push(url);

    const instructionsTitle = await screen.findByRole(
      'heading', { name: 'Instructions' },
    );

    expect(instructionsTitle).toBeDefined();
  });

  it('Verifica se as instruções são renderizadas normalmente', async () => {
    const { history } = renderWithRouter(<App />);
    history.push(url);

    const instructions = await screen.findByTestId('instructions');
    expect(instructions).toBeDefined();
  });

  it('Verifica se existe o título "Video"', async () => {
    const { history } = renderWithRouter(<App />);
    history.push(url);

    const videoTitle = await screen.findByRole(
      'heading', { name: 'Video' },
    );

    expect(videoTitle).toBeDefined();
  });
});
