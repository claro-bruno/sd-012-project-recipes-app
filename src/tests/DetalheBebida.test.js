import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from './renderWithRouter';
import * as BebidasAPI from '../service/BebidasAPI';
import oneDrink from './mocks/oneDrink';
import App from '../App';

const url = '/bebidas/178319';

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
});
