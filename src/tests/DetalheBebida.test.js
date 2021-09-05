import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from './renderWithRouter';
import * as BebidasAPI from '../service/BebidasAPI';
import oneDrink from './mocks/oneDrink';
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
});
