import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import ShareButton from '../ShareButton';
import FavoriteButton from '../FavoriteButton';

class RecipesFavoriteCard extends Component {
  constructor(props) {
    super(props);

    this.renderFoodCard = this.renderFoodCard.bind(this);
    this.renderDrinkCard = this.renderDrinkCard.bind(this);
  }

  renderFoodCard() {
    const { recipe, index } = this.props;
    const {
      id,
      image,
      category,
      name,
      area,
      type,
    } = recipe;

    return (
      <div className="row">
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
              alcoholicOrNot=""
              name={ name }
              image={ image }
              position={ index }
            />
          </div>

          <div>
            <p data-testid={ `${index}-horizontal-top-text` }>
              <span>{ `${area} - ` }</span>
              <span>{ category }</span>
            </p>
            <Link to={ `/${type}s/${id}` }>
              <p data-testid={ `${index}-horizontal-name` }>{ name }</p>
            </Link>
          </div>
        </div>
      </div>
    );
  }

  renderDrinkCard() {
    const { recipe, index } = this.props;
    const {
      id,
      type,
      image,
      alcoholicOrNot,
      name,
    } = recipe;

    return (
      <div className="row">
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
              alcoholicOrNot={ alcoholicOrNot }
              name={ name }
              image={ image }
              position={ index }
            />
          </div>

          <div>
            <p data-testid={ `${index}-horizontal-top-text` }>{ alcoholicOrNot }</p>
            <Link to={ `/${type}s/${id}` }>
              <p data-testid={ `${index}-horizontal-name` }>{ name }</p>
            </Link>
          </div>
        </div>
      </div>
    );
  }

  render() {
    const { recipe: { type } } = this.props;

    return (
      type === 'comida'
        ? this.renderFoodCard()
        : this.renderDrinkCard()
    );
  }
}

export default RecipesFavoriteCard;

RecipesFavoriteCard.propTypes = {
  recipe: PropTypes.object,
}.isRequired;
