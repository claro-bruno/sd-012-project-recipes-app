import React, { Component } from 'react';
import { Redirect, Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import ShareButton from './ShareButton';
import CardMadeImg from './CardMadeImg';
import CardMadeTopText from './CardMadeTopText';

class RecipesMadeCard extends Component {
  constructor(props) {
    super(props);

    this.renderFoodCard = this.renderFoodCard.bind(this);
    this.renderDrinkCard = this.renderDrinkCard.bind(this);
    this.redirectToDetails = this.redirectToDetails.bind(this);
  }

  redirectToDetails() {
    const { id, type } = this.props;
    const path = `http://localhost:3000/${type}s/${id}`;

    return <Redirect to={ path } />;
  }

  renderFoodCard() {
    const {
      id,
      image,
      category,
      name,
      doneDate,
      tags,
      area,
      type,
      index,
    } = this.props;

    return (
      <div className="row">
        <div className="card-list-food">
          <div className="d-flex">
            <div>
              <CardMadeImg
                type={ type }
                id={ id }
                image={ image }
                index={ index }
              />
            </div>

            <div>
              <ShareButton
                position={ index }
                id={ id }
                type={ type }
              />
              <CardMadeTopText
                index={ index }
                area={ area }
                category={ category }
              />
            </div>
          </div>

          <div>
            <Link to={ `/${type}s/${id}` }>
              <p data-testid={ `${index}-horizontal-name` }>{ name }</p>
            </Link>
            <p data-testid={ `${index}-horizontal-done-date` }>{ doneDate }</p>
            {
              tags.map((tag, i) => (
                <span
                  data-testid={ `${index}-${tag}-horizontal-tag` }
                  key={ i }
                >
                  { tag }
                </span>
              ))
            }
          </div>
        </div>
      </div>
    );
  }

  renderDrinkCard() {
    const {
      id,
      type,
      image,
      alcoholicOrNot,
      name,
      doneDate,
      index,
    } = this.props;

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
          </div>

          <div>
            <p data-testid={ `${index}-horizontal-top-text` }>{ alcoholicOrNot }</p>
            <Link to={ `/${type}s/${id}` }>
              <p data-testid={ `${index}-horizontal-name` }>{ name }</p>
            </Link>
            <p data-testid={ `${index}-horizontal-done-date` }>{ doneDate }</p>
          </div>
        </div>
      </div>
    );
  }

  render() {
    const { type } = this.props;

    return (
      type === 'comida'
        ? this.renderFoodCard()
        : this.renderDrinkCard()
    );
  }
}

export default RecipesMadeCard;

RecipesMadeCard.propTypes = {
  image: PropTypes.string,
}.isRequired;
