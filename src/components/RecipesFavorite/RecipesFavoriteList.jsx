import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { v4 as uuidv4 } from 'uuid';
import RecipesFavoriteCard from './RecipesFavoriteCard';

class RecipesFavoriteList extends Component {
  render() {
    const { recipes } = this.props;

    return (
      <div>
        {recipes
          ? (recipes.map((recipe, i) => (
            <div key={ uuidv4() }>
              <RecipesFavoriteCard
                recipe={ recipe }
                index={ i }
              />
            </div>
          )))
          : null}
      </div>
    );
  }
}

export default RecipesFavoriteList;

RecipesFavoriteList.propTypes = {
  recipes: PropTypes.arrayOf(PropTypes.object),
}.isRequired;
