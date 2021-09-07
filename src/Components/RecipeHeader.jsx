import React from 'react';
import { string, objectOf } from 'prop-types';
import ShareAndFavorite from './ShareAndFavorite';

function RecipeHeader({ thumb, title, category, recipe, type }) {
  return (
    <header className="header-detail">
      <img
        className="header-img"
        src={ thumb }
        alt={ title }
        data-testid="recipe-photo"
      />
      <h1 data-testid="recipe-title">{ title }</h1>
      <h2 data-testid="recipe-category">{ category }</h2>
      <ShareAndFavorite recipe={ recipe } type={ type } />
    </header>
  );
}

RecipeHeader.propTypes = {
  title: string.isRequired,
  thumb: string.isRequired,
  category: string.isRequired,
  recipe: objectOf(string).isRequired,
  type: string.isRequired,
};

export default RecipeHeader;
