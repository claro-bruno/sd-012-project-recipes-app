import React, { Component } from 'react';
import { connect } from 'react-redux';
import { v4 as uuidv4 } from 'uuid';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import PropTypes from 'prop-types';

class Recomendations extends Component {
  constructor(props) {
    super(props);

    this.filterSixRecomendations = this.filterSixRecomendations.bind(this);
  }

  filterSixRecomendations(recipes) {
    const SIX = 6;
    return recipes.filter((_element, index) => index < SIX);
  }

  renderRecomendations(type, recomendations) {
    if (type === 'bebida') {
      return recomendations.map(({ strMealThumb, strMeal }, index) => (
        <div key={ uuidv4() }>
          <h3
            data-testid={ `${index}-recomendation-title` }
          >
            { strMeal }
          </h3>
          <img
            data-testid={ `${index}-recomendation-card` }
            src={ strMealThumb }
            alt="foto"
            width="30%"
          />
        </div>
      ));
    }

    if (type === 'comida') {
      return recomendations.map(({ strDrinkThumb, strDrink }, index) => (
        <div key={ uuidv4() }>
          <h3
            data-testid={ `${index}-recomendation-title` }
          >
            { strDrink }
          </h3>
          <img
            data-testid={ `${index}-recomendation-card` }
            src={ strDrinkThumb }
            alt="foto"
            width="30%"
          />
        </div>
      ));
    }
  }

  render() {
    const { type, meals, drinks } = this.props;

    let recomendations = [];

    if (type === 'comida') recomendations = this.filterSixRecomendations(drinks);
    if (type === 'bebida') recomendations = this.filterSixRecomendations(meals);

    const settings = {
      dots: true,
      infinite: false,
      speed: 500,
      slidesToShow: 2,
      slidesToScroll: 1,
    };

    return (
      <Slider { ...settings }>
        { this.renderRecomendations(type, recomendations) }
      </Slider>
    );
  }
}

const mapStateToProps = (state) => ({
  drinks: state.drinks.drinks,
  meals: state.foods.meals,
});

export default connect(mapStateToProps)(Recomendations);

Recomendations.propTypes = {
  drinks: PropTypes.objectOf(PropTypes.object),
}.isRequired;
