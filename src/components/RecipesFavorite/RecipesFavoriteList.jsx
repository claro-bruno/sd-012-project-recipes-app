import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
// import { v4 as uuidv4 } from 'uuid';
import { Link } from 'react-router-dom';
import ShareButton from '../ShareButton';
import FavoriteButton from '../FavoriteButton';

class RecipesFavoriteList extends Component {
  render() {
    const { favoriteStorage } = this.props;

    return (
      <div>
        {favoriteStorage
          ? (favoriteStorage.map(({
            id,
            image,
            category,
            name,
            area,
            type,
            alcoholicOrNot,
          }, index) => (
            <div className="row" key={ id }>
              <div className="card-list-food">
                <div className="d-flex">
                  <Link to={ `/${type}s/${id}` }>
                    <img
                      src={ image }
                      className="card-img"
                      alt="card"
                      data-testid={ `${index}-horizontal-image` }
                    />
                  </Link>

                  <ShareButton
                    position={ index }
                    id={ id }
                    type={ type }
                  />
                  <FavoriteButton
                    id={ id }
                    type={ type }
                    area={ area }
                    category={ category }
                    alcoholicOrNot={ alcoholicOrNot }
                    name={ name }
                    image={ image }
                    position={ index }
                  />
                </div>

                <div>
                  {
                    type === 'comida'
                      ? (
                        <p data-testid={ `${index}-horizontal-top-text` }>
                          <span>{ `${area} - ` }</span>
                          <span>{ category }</span>
                        </p>
                      )
                      : (
                        <p data-testid={ `${index}-horizontal-top-text` }>
                          { alcoholicOrNot }
                        </p>
                      )
                  }

                  <Link to={ `/${type}s/${id}` }>
                    <p data-testid={ `${index}-horizontal-name` }>{ name }</p>
                  </Link>
                </div>
              </div>
            </div>
          )))
          : null}
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  favoriteStorage: state.storage.favorites,
});

export default connect(mapStateToProps)(RecipesFavoriteList);

RecipesFavoriteList.propTypes = {
  recipes: PropTypes.arrayOf(PropTypes.object),
}.isRequired;
