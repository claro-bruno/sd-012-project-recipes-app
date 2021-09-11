import React from 'react';
import { v4 as uuidv4 } from 'uuid';
import PropTypes from 'prop-types';
import Carousel from 'react-multi-carousel';
import 'react-multi-carousel/lib/styles.css';
import { Link } from 'react-router-dom';

function RecommendationsDrink({ recommendation }) {
  console.log(recommendation);

  const responsive = {
    desktop: {
      breakpoint: { max: 3000, min: 1024 },
      items: 2,
      slidesToSlide: 2,
    },
    tablet: {
      breakpoint: { max: 1024, min: 464 },
      items: 2,
      slidesToSlide: 2,
    },
    mobile: {
      breakpoint: { max: 464, min: 0 },
      items: 2,
      slidesToSlide: 2,
    },
  };

  return (
    <ul>
      <Carousel
        swipeable={ false }
        draggable={ false }
        showDots
        responsive={ responsive }
        autoPlaySpeed={ 1000 }
        keyBoardControl
        customTransition="all .5"
        transitionDuration={ 500 }
        containerClass="carousel-container"
        removeArrowOnDeviceType={ ['tablet', 'mobile'] }
        dotListClass="custom-dot-list-style"
        itemClass="carousel-item-padding-40-px"
      >
        {recommendation.map((item, index) => (
          <div
            key={ uuidv4() }
            data-testid={ `${index}-recomendation-card` }
          >
            <Link to={ `/bebidas/${item.idDrink} /` }>
              <img src={ item.strDrinkThumb } alt="drink-recomendation" />
              <p
                data-testid={ `${index}-recomendation-title` }
              >
                { item.strDrink }
              </p>
            </Link>
          </div>
        ))}
      </Carousel>
    </ul>
  );
}

RecommendationsDrink.propTypes = {
  recommendation: PropTypes
    .arrayOf(PropTypes
      .oneOfType([PropTypes.func, PropTypes.string, PropTypes.object])).isRequired,
};

export default RecommendationsDrink;
