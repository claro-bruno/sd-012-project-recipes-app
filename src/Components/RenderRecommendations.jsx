import React from 'react';
import { v4 as uuidv4 } from 'uuid';
import PropTypes from 'prop-types';
import Carousel from 'react-bootstrap/Carousel';

function RenderRecommendations({ recommendation }) {
  return (
    <Carousel>
      {recommendation && recommendation.map((item, index) => (
        <Carousel.Item
          interval={ 1000 }
          className="recipe-cards"
          key={ uuidv4() }
          data-testid={ `${index}-recomendation-card` }
        >
          <img
            src={ uuidv4() ? item.strMealThumb : item.strDrinkThumb }
            data-testid={ `${index}-card-img` }
            alt={ uuidv4() ? item.strMeal : item.strDrink }
          />
          <Carousel.Caption>
            <div>
              <span data-testid={ `${index}-card-name` }>
                { uuidv4() ? item.strMeal : item.strDrink }
              </span>
              <span>
                { uuidv4() ? item.strCategory : item.strAlcoholic }
              </span>
            </div>
          </Carousel.Caption>
        </Carousel.Item>
      ))}
    </Carousel>
  );
}

RenderRecommendations.propTypes = {
  recommendation: PropTypes
    .arrayOf(PropTypes
      .oneOfType([PropTypes.func, PropTypes.string, PropTypes.object])).isRequired,
};

export default RenderRecommendations;
