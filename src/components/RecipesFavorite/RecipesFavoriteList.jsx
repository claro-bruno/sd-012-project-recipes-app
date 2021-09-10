import React, { Component } from 'react';
import { v4 as uuidv4 } from 'uuid';
import RecipesFavoriteCard from './RecipesFavoriteCard';
import { getLocalStorage } from '../../webStorage/favoritesHelpers';

class RecipesFavoriteList extends Component {
  render() {
    const favoriteStorage = getLocalStorage();
    const { favoriteRecipes } = favoriteStorage;

    return (
      <div>
        {favoriteRecipes
          ? (favoriteRecipes.map(({
            id,
            image,
            category,
            name,
            tags,
            doneDate,
            type,
            alcoholicOrNot,
            area,
          }, i) => (
            <div key={ uuidv4() }>
              <RecipesFavoriteCard
                id={ id }
                index={ i }
                image={ image }
                category={ category }
                name={ name }
                tags={ tags }
                doneDate={ doneDate }
                type={ type }
                alcoholicOrNot={ alcoholicOrNot }
                area={ area }
              />
            </div>
          )))
          : null}
      </div>
    );
  }
}

export default RecipesFavoriteList;
