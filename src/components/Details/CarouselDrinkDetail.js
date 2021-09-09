import React, { useState, useEffect } from 'react';
import Carousel from 'react-multi-carousel';
import 'react-multi-carousel/lib/styles.css';
import { Image } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.css';

const responsive = {
  mobile: {
    breakpoint: { max: 360, min: 0 },
    items: 2,
  },
};

function DrinkCarousel() {
  const [recipesRecommendations, setRecipesRecommendations] = useState([]);

  useEffect(() => {
    const getRecommendations = async () => {
      const endpoint = 'https://www.themealdb.com/api/json/v1/1/search.php?s=';
      const { meals } = await fetch(endpoint).then((data) => data.json());
      const maxRecommendations = 5;
      const recommendationList = [];
      for (let index = 0; index <= maxRecommendations; index += 1) {
        recommendationList.push(meals[index]);
      }
      setRecipesRecommendations(recommendationList);
    };
    getRecommendations();
  }, []);

  return (
    <Carousel responsive={ responsive } slidesToSlide={ 2 }>
      { recipesRecommendations.map((food, ind) => (
        <div key={ food.strMeal } data-testid={ `${ind}-recomendation-card` }>
          <h2 data-testid={ `${ind}-recomendation-title` }>{food.strMeal }</h2>
          <Image src={ food.strMealThumb } alt={ food.strMeal } fluid />
        </div>
      )) }
    </Carousel>

  );
}

export default DrinkCarousel;
