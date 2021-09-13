import React from 'react';
import { screen, waitForElementToBeRemoved } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from './renderWithRouter';
import oneDrink from './mocks/oneDrink';
import * as BebidasAPI from '../service/BebidasAPI';
import App from '../App';

const url = '/bebidas/178319/in-progress';

describe('Testes da pagina de bebidas em progresso', () => {
  beforeEach(() => {
    jest.spyOn(BebidasAPI, 'buscarBebidasID').mockResolvedValue(oneDrink);
    const { history } = renderWithRouter(<App />);
    history.push(url);
  });

  it('Verifica se os elementos iniciais renderizam corretamente', async () => {
    const mainImage = await screen.findByTestId('recipe-photo');
    expect(mainImage).toBeInTheDocument();
    expect(mainImage).toHaveProperty('src', 'https://www.thecocktaildb.com/images/media/drink/zvsre31572902738.jpg');

    const mainTitle = await screen.findByTestId('recipe-title');
    expect(mainTitle).toBeInTheDocument();
    expect(mainTitle.innerHTML).toBe('Aquamarine');

    const shareBtn = await screen.findByTestId('share-btn');
    expect(shareBtn).toBeInTheDocument();
    const favoriteBtn = await screen.findByTestId('favorite-btn');
    expect(favoriteBtn).toBeInTheDocument();

    const category = await screen.findByTestId('recipe-category');
    expect(category).toBeInTheDocument();
    expect(category.innerHTML).toBe('Cocktail');

    const storage = localStorage.getItem('inProgressRecipes');
    expect(storage).toBe('{"cocktails":{"178319":[]},"meals":{}}');
  });

  it('Verifica se os ingredientes renderizam corretamente', async () => {
    const ingredientTitle = await screen.findByRole('heading', { name: 'Ingredients' });
    expect(ingredientTitle).toBeInTheDocument();

    const ingredient0 = await screen.findByTestId('0-ingredient-step');
    expect(ingredient0).toBeInTheDocument();

    const ingredient1 = await screen.findByTestId('1-ingredient-step');
    expect(ingredient1).toBeInTheDocument();

    const ingredient2 = await screen.findByTestId('2-ingredient-step');
    expect(ingredient2).toBeInTheDocument();
  });

  it('Verifica se o elemento de instruções da receita é renderizado', async () => {
    const instructions = await screen.findByTestId('instructions');
    expect(instructions).toBeInTheDocument();
  });

  it('Verifica se o botão de finalizar receita é renderizado', async () => {
    const finishButton = await screen.findByTestId('finish-recipe-btn');
    expect(finishButton).toBeInTheDocument();
  });

  it('Verifica se os ingredientes ficam salvos e o botão habilita', async () => {
    await waitForElementToBeRemoved(() => screen.getByText('Loading...'));

    const ingredient0 = await screen.getByLabelText('- Hpnotiq - 2 oz');
    const ingredient1 = await screen.getByLabelText('- Pineapple Juice - 1 oz');
    const ingredient2 = await screen.getByLabelText('- Banana Liqueur - 1 oz');

    userEvent.click(ingredient0);
    userEvent.click(ingredient1);

    const storage1 = localStorage.getItem('inProgressRecipes');
    expect(storage1).toBe('{"cocktails":{"178319":["0","1"]},"meals":{}}');

    const finishButton = await screen.findByTestId('finish-recipe-btn');
    expect(finishButton).toBeInTheDocument();
    expect(finishButton).toHaveAttribute('disabled');

    userEvent.click(ingredient2);
    expect(finishButton).not.toHaveAttribute('disabled');

    const storage2 = localStorage.getItem('inProgressRecipes');
    expect(storage2).toBe('{"cocktails":{"178319":["0","1","2"]},"meals":{}}');
  });
});
