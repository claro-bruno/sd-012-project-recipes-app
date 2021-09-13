import React from 'react';
import { screen, waitForElementToBeRemoved } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from './renderWithRouter';
import oneMeal from './mocks/oneMeal';
import * as ComidasAPI from '../service/ComidasAPI';
import App from '../App';

const url = '/comidas/52771/in-progress';

describe('Testes da pagina de comidas em progresso', () => {
  beforeEach(() => {
    jest.spyOn(ComidasAPI, 'buscarComidaPeloID').mockResolvedValue(oneMeal);
    const { history } = renderWithRouter(<App />);
    history.push(url);
  });

  it('Verifica se os elementos iniciais renderizam corretamente', async () => {
    const mainImage = await screen.findByTestId('recipe-photo');
    expect(mainImage).toBeInTheDocument();
    expect(mainImage).toHaveProperty('src', 'https://www.themealdb.com/images/media/meals/ustsqw1468250014.jpg');

    const mainTitle = await screen.findByTestId('recipe-title');
    expect(mainTitle).toBeInTheDocument();
    expect(mainTitle.innerHTML).toBe('Spicy Arrabiata Penne');

    const shareBtn = await screen.findByTestId('share-btn');
    expect(shareBtn).toBeInTheDocument();
    const favoriteBtn = await screen.findByTestId('favorite-btn');
    expect(favoriteBtn).toBeInTheDocument();

    const category = await screen.findByTestId('recipe-category');
    expect(category).toBeInTheDocument();
    expect(category.innerHTML).toBe('Vegetarian');

    const storage = localStorage.getItem('inProgressRecipes');
    expect(storage).toBe('{"cocktails":{},"meals":{"52771":[]}}');
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

    const ingredient3 = await screen.findByTestId('3-ingredient-step');
    expect(ingredient3).toBeInTheDocument();

    const ingredient4 = await screen.findByTestId('4-ingredient-step');
    expect(ingredient4).toBeInTheDocument();

    const ingredient5 = await screen.findByTestId('5-ingredient-step');
    expect(ingredient5).toBeInTheDocument();

    const ingredient6 = await screen.findByTestId('6-ingredient-step');
    expect(ingredient6).toBeInTheDocument();

    const ingredient7 = await screen.findByTestId('7-ingredient-step');
    expect(ingredient7).toBeInTheDocument();
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

    const ingredient0 = await screen.getByLabelText('- penne rigate - 1 pound');
    const ingredient1 = await screen.getByLabelText('- olive oil - 1/4 cup');
    const ingredient2 = await screen.getByLabelText('- garlic - 3 cloves');
    const ingredient3 = await screen.getByLabelText('- chopped tomatoes - 1 tin');
    const ingredient4 = await screen.getByLabelText('- red chile flakes - 1/2 teaspoon');
    const ingredient5 = await screen.getByLabelText('- italian seasoning - 1/2 teaspoon');
    const ingredient6 = await screen.getByLabelText('- basil - 6 leaves');
    const ingredient7 = await screen.getByLabelText('- Parmigiano-Reggiano - spinkling');

    userEvent.click(ingredient0);
    userEvent.click(ingredient1);
    userEvent.click(ingredient2);
    userEvent.click(ingredient3);
    userEvent.click(ingredient4);
    userEvent.click(ingredient5);

    const storage1 = localStorage.getItem('inProgressRecipes');
    expect(storage1).toBe('{"cocktails":{},"meals":{"52771":["0","1","2","3","4","5"]}}');

    const finishButton = await screen.findByTestId('finish-recipe-btn');
    expect(finishButton).toBeInTheDocument();
    expect(finishButton).toHaveAttribute('disabled');

    userEvent.click(ingredient6);
    userEvent.click(ingredient7);
    expect(finishButton).not.toHaveAttribute('disabled');

    const storage2 = localStorage.getItem('inProgressRecipes');
    expect(storage2).toBe(
      '{"cocktails":{},"meals":{"52771":["0","1","2","3","4","5","6","7"]}}',
    );
  });
});
