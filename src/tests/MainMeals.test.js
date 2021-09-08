import React from 'react';
import { screen, waitForElementToBeRemoved } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import fetch from '../../cypress/mocks/fetch';
import renderWithRouterAndRedux from './renderWithRouterAndRedux';
import App from '../App';

describe('testa estrutura padrão de paginas de comidas principal', () => {
  beforeEach(() => {
    global.fetch = jest.fn().mockImplementation(fetch);
  });
  it('confere quantidade de cards', async () => {
    renderWithRouterAndRedux(<App />, { initialEntries: ['/comidas'] });
    expect(global.fetch).toHaveBeenCalled();
    await waitForElementToBeRemoved(() => screen.queryByText('Loading...'));
    expect(screen.getByTestId('0-recipe-card')).toBeInTheDocument();
    expect(screen.getByTestId('1-recipe-card')).toBeInTheDocument();
    expect(screen.getByTestId('2-recipe-card')).toBeInTheDocument();
    expect(screen.getByTestId('3-recipe-card')).toBeInTheDocument();
    expect(screen.getByTestId('4-recipe-card')).toBeInTheDocument();
    expect(screen.getByTestId('5-recipe-card')).toBeInTheDocument();
    expect(screen.getByTestId('6-recipe-card')).toBeInTheDocument();
    expect(screen.getByTestId('7-recipe-card')).toBeInTheDocument();
    expect(screen.getByTestId('8-recipe-card')).toBeInTheDocument();
    expect(screen.getByTestId('9-recipe-card')).toBeInTheDocument();
    expect(screen.getByTestId('10-recipe-card')).toBeInTheDocument();
    expect(screen.getByTestId('11-recipe-card')).toBeInTheDocument();
  });

  it('confere card unico de categoria', async () => {
    renderWithRouterAndRedux(<App />, { initialEntries: ['/comidas'] });
    await waitForElementToBeRemoved(() => screen.queryByText('Loading...'));
    expect(screen.getByTestId('Goat-category-filter')).toBeInTheDocument();
    userEvent.click(screen.getByTestId('search-top-btn'));
    userEvent.type(screen.getByTestId('search-input'), 'apples');
    userEvent.click(screen.getByTestId('ingredient-search-radio'));
    userEvent.click(screen.getByTestId('exec-search-btn'));
    expect(global.fetch).toHaveBeenCalledWith('https://www.themealdb.com/api/json/v1/1/filter.php?i=apples');
    await new Promise((r) => setTimeout(r, 2000));
    const a = screen.getByText('-card');
    expect(a).toBeInTheDocument();
  });
});
