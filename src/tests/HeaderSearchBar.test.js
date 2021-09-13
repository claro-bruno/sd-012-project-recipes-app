import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from './renderWithRouter';
import App from '../App';

test('Testa a barra de busca', () => {
  let history = {};

  history = renderWithRouter(<App />).history;
  history.push('/comidas');

  const searchIcon = screen.getByTestId('search-top-btn');
  expect(searchIcon).toBeInTheDocument();
  userEvent.click((searchIcon));

  const inputText = screen.getByTestId('search-input');
  expect(inputText).toBeInTheDocument();
  const ingredientRadio = screen.getByTestId('ingredient-search-radio');
  expect(ingredientRadio).toBeInTheDocument();
  const nameRadio = screen.getByTestId('name-search-radio');
  expect(nameRadio).toBeInTheDocument();
  const firstLetterRadio = screen.getByTestId('first-letter-search-radio');
  expect(firstLetterRadio).toBeInTheDocument();
  const searchButton = screen.getByTestId('exec-search-btn');
  expect(searchButton).toBeInTheDocument();

  userEvent.type(inputText, 'beef');
  expect(inputText).toHaveValue('beef');
  userEvent.type(inputText, 'cocoa');
  expect(inputText).toHaveValue('cocoa');
});
