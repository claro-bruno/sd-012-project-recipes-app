import React from 'react';
import { Link } from 'react-router-dom';
import drinkIcon from '../images/drinkIcon.svg';
import exploreIcon from '../images/exploreIcon.svg';
import mealIcon from '../images/mealIcon.svg';

function Footer() {
  return (
    <footer data-testid="footer">
      <Link src={ drinkIcon } data-testid="drinks-bottom-btn" to="/bebidas">
        <img src={ drinkIcon } alt="Drink" />
      </Link>
      <Link src={ exploreIcon } data-testid="explore-bottom-btn" to="/explorar">
        <img src={ exploreIcon } alt="Explore" />
      </Link>
      <Link src={ mealIcon } data-testid="food-bottom-btn" to="/comidas">
        <img src={ mealIcon } alt="Meal" />
      </Link>
    </footer>);
}

export default Footer;
