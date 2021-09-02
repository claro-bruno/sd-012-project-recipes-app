import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import DrinkContext from './DrinkContext';
import { fetchInicialDrinks, fetchDrinkCategories } from '../services/cocktailAPI';

function DrinkProvider({ children }) {
  const [Drinks, setDrinks] = useState([]);
  const [drinksCategories, setDrinksCategories] = useState([]);
  const [checkedDrinkOptions, setCheckedDrinkOptions] = useState([]);

  useEffect(() => {
    fetchInicialDrinks().then(({ drinks }) => setDrinks(drinks));
    fetchDrinkCategories().then(({ drinks }) => setDrinksCategories(drinks));
  }, []);
  localStorage.setItem('inProgressRecipes', JSON.stringify({ cocktails: {}, meals: {} }));

  const context = {
    Drinks,
    setDrinks,
    drinksCategories,
    setDrinksCategories,
    checkedDrinkOptions,
    setCheckedDrinkOptions,
  };

  return (
    <DrinkContext.Provider value={ context }>
      { children }
    </DrinkContext.Provider>
  );
}

DrinkProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export default DrinkProvider;
