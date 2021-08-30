import React, { createContext } from 'react';
import PropTypes from 'prop-types';
import LoginHook from '../Hooks/LoginHook';

import BtnFilterCategory from '../Hooks/BtnFilterCategory';

import FoodHook from '../Hooks/FoodHook';
import recipesHooks from '../Hooks/recipesHooks';

export const ContextApp = createContext();

export const AppProvider = ({ children }) => {
  const { searchRecipes, recipes, setRecipes } = recipesHooks();
  const { categoryMeal, categoryDrinks, filterIngredient, filter } = BtnFilterCategory();
  const {
    handleInput,
    Login,
    disabled,
    handleClick,
    redirect,
    setRedirect } = LoginHook();
  const { drinks, meal, getRecipes } = FoodHook();

  const ContProps = {
    recipes,
    searchRecipes,
    disabled,
    handleInput,
    Login,
    handleClick,
    redirect,
    categoryMeal,
    categoryDrinks,
    filterIngredient,
    filter,
    getRecipes,
    setRecipes,
    setRedirect,
    drinks,
    meal,
  };

  return (
    <ContextApp.Provider value={ { ...ContProps } }>
      {children}
    </ContextApp.Provider>
  );
};

AppProvider.propTypes = {
  children: PropTypes.node.isRequired,
};
