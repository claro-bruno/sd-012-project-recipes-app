import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from './renderWithRouter';
import * as BebidasAPI from '../service/BebidasAPI';
import * as ComidasAPI from '../service/ComidasAPI';
import oneDrink from './mocks/oneDrink';
import recomendedFoods from './mocks/RecomendedFoods';
import whiteHeartIcon from '../images/whiteHeartIcon.svg';
import blackHeartIcon from '../images/blackHeartIcon.svg';
import shareIcon from '../images/shareIcon.svg';
import App from '../App';

const url = '/bebidas/178319';

const copyToClipBoard = require('clipboard-copy');

jest.mock('clipboard-copy', () => jest.fn());

describe('Testes da página de detalhes de bebidas', () => {
  beforeEach(() => {
    jest.spyOn(BebidasAPI, 'buscarBebidaPeloID').mockResolvedValue({ drinks: oneDrink });
    jest.spyOn(ComidasAPI, 'buscarComidasAleatoria').mockResolvedValue(recomendedFoods);
  });

  it('Verifica se a imagem da bebida renderiza normalmente', async () => {
    const { history } = renderWithRouter(<App />);
    history.push(url);

    const image = await screen.findByTestId('recipe-photo');

    expect(image).toHaveProperty('src', 'https://www.thecocktaildb.com/images/media/drink/zvsre31572902738.jpg');
  });

  it('Verifica se existe o título da bebida', async () => {
    const { history } = renderWithRouter(<App />);
    history.push(url);

    const title = await screen.findByTestId('recipe-title');

    expect(title.innerHTML).toBe('Aquamarine');
  });

  it('Verifica se existe os botãoes de compartilhar e favoritar', async () => {
    const { history } = renderWithRouter(<App />);
    history.push(url);

    const shareBtn = await screen.findByTestId('share-btn');
    const favoriteBtn = await screen.findByTestId('favorite-btn');

    expect(shareBtn).toHaveProperty('src', `http://localhost/${shareIcon}`);
    expect(favoriteBtn).toHaveProperty('src', `http://localhost/${whiteHeartIcon}`);
  });

  it('Verifica se ao clicar em compartilhar, a função é chamada corretamente',
    async () => {
      const { history } = renderWithRouter(<App />);
      history.push(url);

      const shareBtn = await screen.findByTestId('share-btn');
      userEvent.click(shareBtn);

      expect(copyToClipBoard).toHaveBeenCalledTimes(1);
    });

  it('Verifica se ao clicar em favoritar, a receita é favoritada', async () => {
    const { history } = renderWithRouter(<App />);
    history.push(url);

    const favoriteBtn = await screen.findByTestId('favorite-btn');
    userEvent.click(favoriteBtn);

    expect(favoriteBtn).toHaveProperty('src', `http://localhost/${blackHeartIcon}`);

    const storage = JSON.parse(localStorage.getItem('favoriteRecipes'));
    const hasDrink = storage.some((drink) => drink.id === oneDrink[0].idDrink);

    expect(hasDrink).toBe(true);
  });

  it('Verifica se a informação "Alcoholic" aparece na pagina como categoria',
    async () => {
      const { history } = renderWithRouter(<App />);
      history.push(url);

      const category = await screen.findByTestId('recipe-category');

      expect(category.innerHTML).toBe('Alcoholic');
    });

  it('Verifica se existe o título "Ingredients"', async () => {
    const { history } = renderWithRouter(<App />);
    history.push(url);

    const ingredientTitle = await screen.findByRole('heading', { name: 'Ingredients' });

    expect(ingredientTitle).toBeDefined();
  });

  it('Verifica se todos os ingredients são renderizados corretamente', async () => {
    const { history } = renderWithRouter(<App />);
    history.push(url);

    const ingredient1 = await screen.findByTestId('0-ingredient-name-and-measure');
    const ingredient2 = await screen.findByTestId('1-ingredient-name-and-measure');
    const ingredient3 = await screen.findByTestId('2-ingredient-name-and-measure');

    expect(ingredient1.innerHTML).toBe('- Hpnotiq - 2 oz');
    expect(ingredient2.innerHTML).toBe('- Pineapple Juice - 1 oz');
    expect(ingredient3.innerHTML).toBe('- Banana Liqueur - 1 oz');
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

  it('Verifica se existe o título "Recomendadas"', async () => {
    const { history } = renderWithRouter(<App />);
    history.push(url);

    const recomendedTitle = await screen.findByRole('heading', { name: 'Recomendadas' });

    expect(recomendedTitle).toBeDefined();
  });

  it('Verifica se existe 6 cards de comidas recomendadas', async () => {
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
});
