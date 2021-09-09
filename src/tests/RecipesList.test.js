import React from 'react';
import { screen, waitForElementToBeRemoved } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
// import copy from 'clipboard-copy';
import renderWithRouterAndRedux from './renderWithRouterAndRedux';
import App from '../App';

const fetchMock = require('../../cypress/mocks/fetch');
const mealsMock = require('../../cypress/mocks/meals');
const beefMealsMock = require('../../cypress/mocks/beefMeals');
// const breakfastMealsMock = require('../../cypress/mocks/breakfastMeals');
// const chickenMealsMock = require('../../cypress/mocks/chickenMeals');
// const dessertMealsMock = require('../../cypress/mocks/dessertMeals');
// const goatMealsMock = require('../../cypress/mocks/goatMeals');
const mealCategoriesMock = require('../../cypress/mocks/mealCategories');
const drinksMock = require('../../cypress/mocks/drinks');
// const ordinaryDrinksMock = require('../../cypress/mocks/ordinaryDrinks');
// const cocktailDrinksMock = require('../../cypress/mocks/cocktailDrinks');
// const milkDrinksMock = require('../../cypress/mocks/milkDrinks');
// const otherDrinksMock = require('../../cypress/mocks/otherDrinks');
// const cocoaDrinksMock = require('../../cypress/mocks/cocoaDrinks');
const drinkCategoriesMock = require('../../cypress/mocks/drinkCategories');

const foodPage = '/comidas';
const drinkPage = '/bebidas';
const loading = 'Loading...';

const checkFirstTwelveRecipes = (recipes, type) => {
  const maxCards = 12;

  recipes.slice(0, maxCards).forEach((recipe, index) => {
    expect(screen.getByTestId(`${index}-recipe-card`)).toBeInTheDocument();

    // expect(screen.getByTestId(`${index}-card-img`))
    //   .toHaveProperty('src', recipe[`str${type}Thumb`]);

    expect(screen.getByTestId(`${index}-card-name`))
      .toHaveTextContent(recipe[`str${type}`]);
  });

  expect(screen.queryByTestId(`${maxCards}-recipe-card`)).not.toBeInTheDocument();
  expect(screen.queryByTestId(`${maxCards}-card-img`)).not.toBeInTheDocument();
  expect(screen.queryByTestId(`${maxCards}-card-name`)).not.toBeInTheDocument();
};

describe('25 - Verifica se os elementos da tela de receitas foram criados', () => {
  it('Verifica quantidade de cards na página de comidas', async () => {
    renderWithRouterAndRedux(<App />, { initialEntries: [foodPage] });

    global.fetch = jest.fn().mockImplementation(fetchMock);

    const maxCards = 12;
    await waitForElementToBeRemoved(() => screen.queryByText(loading));

    for (let index = 0; index < maxCards; index += 1) {
      expect(screen.getByTestId(`${index}-recipe-card`)).toBeInTheDocument();
      expect(screen.getByTestId(`${index}-card-img`)).toBeInTheDocument();
      expect(screen.getByTestId(`${index}-card-name`)).toBeInTheDocument();
    }

    expect(screen.queryByTestId(`${maxCards}-recipe-card`)).not.toBeInTheDocument();
    expect(screen.queryByTestId(`${maxCards}-card-img`)).not.toBeInTheDocument();
    expect(screen.queryByTestId(`${maxCards}-card-name`)).not.toBeInTheDocument();
  });

  it('Verifica quantidade de cards na página de bebidas', async () => {
    renderWithRouterAndRedux(<App />, { initialEntries: [drinkPage] });

    global.fetch = jest.fn().mockImplementation(fetchMock);

    const maxCards = 12;
    await waitForElementToBeRemoved(() => screen.queryByText(loading));

    for (let index = 0; index < maxCards; index += 1) {
      expect(screen.getByTestId(`${index}-recipe-card`)).toBeInTheDocument();
      expect(screen.getByTestId(`${index}-card-img`)).toBeInTheDocument();
      expect(screen.getByTestId(`${index}-card-name`)).toBeInTheDocument();
    }

    expect(screen.queryByTestId(`${maxCards}-recipe-card`)).not.toBeInTheDocument();
    expect(screen.queryByTestId(`${maxCards}-card-img`)).not.toBeInTheDocument();
    expect(screen.queryByTestId(`${maxCards}-card-name`)).not.toBeInTheDocument();
  });
});

describe('26 - Verifica o conteúdo dos elementos da tela de receitas', () => {
  it('Verifica conteúdo na página de comidas', async () => {
    renderWithRouterAndRedux(<App />, { initialEntries: [foodPage] });

    global.fetch = jest.fn().mockImplementation(fetchMock);
    await waitForElementToBeRemoved(() => screen.queryByText(loading));
    checkFirstTwelveRecipes(mealsMock.meals, 'Meal');
  });

  it('Verifica conteúdo na página de bebidas', async () => {
    renderWithRouterAndRedux(<App />, { initialEntries: [drinkPage] });

    global.fetch = jest.fn().mockImplementation(fetchMock);
    await waitForElementToBeRemoved(() => screen.queryByText(loading));
    checkFirstTwelveRecipes(drinksMock.drinks, 'Drink');
  });
});

describe('27 - Verifica existencia de filtros na tela de receitas', () => {
  it('Verifica se existem 5 filtros na tela de comidas', async () => {
    renderWithRouterAndRedux(<App />, { initialEntries: [foodPage] });

    global.fetch = jest.fn().mockImplementation(fetchMock);
    await waitForElementToBeRemoved(() => screen.queryByText(loading));

    const maxFilters = 5;
    mealCategoriesMock.meals.slice(0, maxFilters).forEach(({ strCategory: category }) => {
      expect(screen.getByTestId(`${category}-category-filter`)).toBeInTheDocument();
    });

    mealCategoriesMock.meals.slice(maxFilters).forEach(({ strCategory: category }) => {
      expect(screen.queryByTestId(`${category}-category-filter`)).not.toBeInTheDocument();
    });
  });

  it('Verifica se existem 5 filtros na tela de bebidas', async () => {
    renderWithRouterAndRedux(<App />, { initialEntries: [drinkPage] });

    global.fetch = jest.fn().mockImplementation(fetchMock);
    await waitForElementToBeRemoved(() => screen.queryByText(loading));

    const maxFilters = 5;
    drinkCategoriesMock.drinks.slice(0, maxFilters).forEach((
      { strCategory: category },
    ) => {
      expect(screen.getByTestId(`${category}-category-filter`)).toBeInTheDocument();
    });

    drinkCategoriesMock.drinks.slice(maxFilters).forEach(({ strCategory: category }) => {
      expect(screen.queryByTestId(`${category}-category-filter`)).not.toBeInTheDocument();
    });
  });
});

describe('28 - Verifica funcionalidade dos botões de filtro', () => {
  it('Verifica filtro Beef na tela de comidas', async () => {
    renderWithRouterAndRedux(<App />, { initialEntries: [foodPage] });

    global.fetch = jest.fn().mockImplementation(fetchMock);
    await waitForElementToBeRemoved(() => screen.queryByText(loading));

    userEvent.click(screen.getByTestId('Beef-category-filter'));
    checkFirstTwelveRecipes(beefMealsMock.meals, 'Meal');
  });
});
