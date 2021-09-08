import React, { Component } from 'react';
import { v4 as uuidv4 } from 'uuid';
import PropTypes from 'prop-types';
import RecipesFavoriteCard from './RecipesFavoriteCard';

class RecipesFavoriteList extends Component {
  render() {
    const { recipes } = this.props;

    return (
      <div>
        {
          recipes.map(({
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
          ))
        }
      </div>
    );
  }
}

export default RecipesFavoriteList;

RecipesFavoriteList.propTypes = {
  recipes: PropTypes.arrayOf(PropTypes.object),
}.isRequired;
