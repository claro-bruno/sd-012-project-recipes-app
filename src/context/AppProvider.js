import React, { useState } from 'react';
import PropTypes from 'prop-types';
import AppContext from './AppContext';

export default function AppProvider({ children }) {
  const [recipeList, setRecipeList] = useState();
  const [categoriesList, setCategoriesList] = useState([]);
  const [filterDoneRecipes, setFilterDoneRecipes] = useState('all');
  const [recipeDetails, setRecipeDetails] = useState();

  const context = {
    recipeList,
    categoriesList,
    setRecipeList,
    setCategoriesList,
    filterDoneRecipes,
    setFilterDoneRecipes,
    recipeDetails,
    setRecipeDetails,
  };

  return (
    <AppContext.Provider value={ context }>
      {children}
    </AppContext.Provider>
  );
}

AppProvider.propTypes = {
  children: PropTypes
    .oneOfType([PropTypes.node, PropTypes.arrayOf(PropTypes.node)]).isRequired,
};
