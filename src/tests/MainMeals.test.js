import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import fetch from '../../cypress/mocks/fetch';
import renderWithRouterAndRedux from './renderWithRouterAndRedux';
import App from '../App';

describe('testa estrutura padrão de paginas de comidas principal', () => {
  beforeEach(() => {
    global.fetch = jest.fn().mockImplementation(fetch);
    renderWithRouterAndRedux(<App />, { initialEntries: ['/comidas'] });
  });
  it('confere quantidade de cards', () => {
    expect(global.fetch).toHaveBeenCalled();
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
    expect(screen.getByTestId('Goat-category-filter')).toBeInTheDocument();
    userEvent.click(screen.getByTestId('Goat-category-filter'));
    const a = await screen.findByTestId('12-recipe-card');
    expect(a).toBeInTheDocument();
  });
});
