import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from './renderWithRouter';
import oneMeal from './mocks/oneMeal';
import recomendedDrinks from './mocks/RecomendedDrinks';
import * as ComidasAPI from '../service/ComidasAPI';
import * as BebidasAPI from '../service/BebidasAPI';
import shareIcon from '../images/shareIcon.svg';
import whiteHeartIcon from '../images/whiteHeartIcon.svg';
import blackHeartIcon from '../images/blackHeartIcon.svg';
import App from '../App';

const url = '/comidas/52771';
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

jest.mock('clipboard-copy', () => jest.fn());
const copyToClipBoard = require('clipboard-copy');

describe('Testes da pagina de detalhes de comida', () => {
  beforeEach(() => {
    jest.spyOn(ComidasAPI, 'buscarComidaPeloID').mockResolvedValue(oneMeal);
    jest.spyOn(BebidasAPI, 'buscarBebidaAleatoria').mockResolvedValue(recomendedDrinks);
  });

  it('Verifica se a imagem principal renderiza corretamente', async () => {
    const { history } = renderWithRouter(<App />);
    history.push(url);

    const mainImage = await screen.findByTestId('recipe-photo');

    expect(mainImage).toHaveProperty('src', 'https://www.themealdb.com/images/media/meals/ustsqw1468250014.jpg');
  });

  it('Verifica se o título da comida renderiza corretamente', async () => {
    const { history } = renderWithRouter(<App />);
    history.push(url);

    const mainTitle = await screen.findByTestId('recipe-title');

    expect(mainTitle.innerHTML).toBe('Spicy Arrabiata Penne');
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

    expect(category.innerHTML).toBe('Vegetarian');
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

    expect(ingredient1.innerHTML).toBe('- penne rigate - 1 pound');
    expect(ingredient2.innerHTML).toBe('- olive oil - 1/4 cup');
    expect(ingredient3.innerHTML).toBe('- garlic - 3 cloves');
    expect(ingredient4.innerHTML).toBe('- chopped tomatoes - 1 tin');
    expect(ingredient5.innerHTML).toBe('- red chile flakes - 1/2 teaspoon');
    expect(ingredient6.innerHTML).toBe('- italian seasoning - 1/2 teaspoon');
    expect(ingredient7.innerHTML).toBe('- basil - 6 leaves');
    expect(ingredient8.innerHTML).toBe('- Parmigiano-Reggiano - spinkling');
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

  it('Verifica se o vídeo é renderizado normalmente', async () => {
    const { history } = renderWithRouter(<App />);
    history.push(url);

    const video = await screen.findByTestId('video');

    expect(video).toHaveProperty('src', 'https://www.youtube.com/embed/1IszT_guI08');
  });

  it('Verifica se existe o título "Recomended"', async () => {
    const { history } = renderWithRouter(<App />);
    history.push(url);

    const recomendedTitle = await screen.findByRole('heading', { name: 'Recomended' });

    expect(recomendedTitle).toBeDefined();
  });

  it('Verifica se existe 6 cards de bebidas recomendadas', async () => {
    const { history } = renderWithRouter(<App />);
    history.push(url);

    const card1 = await screen.findByTestId('0-recomendation-card');
    const card2 = await screen.findByTestId('1-recomendation-card');
    const card3 = await screen.findByTestId('2-recomendation-card');
    const card4 = await screen.findByTestId('3-recomendation-card');
    const card5 = await screen.findByTestId('4-recomendation-card');
    const card6 = await screen.findByTestId('5-recomendation-card');

    expect(card1).toBeDefined();
    expect(card2).toBeDefined();
    expect(card3).toBeDefined();
    expect(card4).toBeDefined();
    expect(card5).toBeDefined();
    expect(card6).toBeDefined();
  });

  it('Verifica se existe o botão de iniciar receita', async () => {
    const { history } = renderWithRouter(<App />);
    history.push(url);

    const startBtn = await screen.findByTestId('start-recipe-btn');

    expect(startBtn).toBeDefined();
  });

  it('Verifica se ao clicar no botão de compartilhar, a função é chamada', async () => {
    const { history } = renderWithRouter(<App />);
    history.push(url);

    const shareBtn = await screen.findByTestId('share-btn');
    userEvent.click(shareBtn);

    expect(copyToClipBoard).toHaveBeenCalledTimes(1);
  });

  it('Verifica se ao clicar no botão de favoritar, a comida é favoritada', async () => {
    const { history } = renderWithRouter(<App />);
    history.push(url);

    const favoriteBtn = await screen.findByTestId('favorite-btn');
    userEvent.click(favoriteBtn);

    expect(favoriteBtn).toHaveProperty('src', `http://localhost/${blackHeartIcon}`);

    const storage = JSON.parse(localStorage.getItem('favoriteRecipes'));
    const hasFood = storage.some((item) => item.id === oneMeal[0].idMeal);

    expect(hasFood).toBe(true);
  });
});
