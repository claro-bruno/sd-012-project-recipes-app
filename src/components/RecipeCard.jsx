import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import './style/categoryStyle.css';

class RecipeCard extends Component {
  constructor(props) {
    super(props);

    this.renderFoodCard = this.renderFoodCard.bind(this);
    this.renderDrinkCard = this.renderDrinkCard.bind(this);
  }

  renderFoodCard() {
    const { id, name, thumb, index } = this.props;

    return (
      <Link className="remove-line" to={ `/comidas/${id}` }>
        <div className="row">
          <div
            className="card card-list-food"
            data-testid={ `${index}-recipe-card` }
          >
            <img
              src={ thumb }
              alt={ name }
              data-testid={ `${index}-card-img` }
            />
            <p data-testid={ `${index}-card-name` }>{name}</p>
          </div>
        </div>
      </Link>
    );
  }

  renderDrinkCard() {
    const { id, name, thumb, index } = this.props;

    return (
      <Link className="remove-line" to={ `/bebidas/${id}` }>
        <div className="row">
          <div
            className="card card-list-food"
            data-testid={ `${index}-recipe-card` }
          >
            <img
              src={ thumb }
              alt={ name }
              data-testid={ `${index}-card-img` }
            />
            <p data-testid={ `${index}-card-name` }>{name}</p>
          </div>
        </div>
      </Link>
    );
  }

  render() {
    const { type } = this.props;

    if (type === 'food') return this.renderFoodCard();
    if (type === 'drink') return this.renderDrinkCard();
  }
}

RecipeCard.propTypes = {
  id: PropTypes.string,
  name: PropTypes.string,
  thumb: PropTypes.string,
  index: PropTypes.number,
}.isRequired;

export default RecipeCard;
