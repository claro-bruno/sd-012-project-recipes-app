import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { v4 as uuidv4 } from 'uuid';
import RecipeCard from './RecipeCard';
import './style/categoryStyle.css';

class RecipesList extends Component {
  constructor(props) {
    super(props);

    this.filterTwelveRecipes = this.filterTwelveRecipes.bind(this);
  }

  filterTwelveRecipes() {
    const { recipes } = this.props;
    const TWELVE = 12;

    return recipes.filter((_element, index) => index < TWELVE);
  }

  renderFoods() {
    const recipes = this.filterTwelveRecipes();

    return (
      <div className="row row-cols-3 row-cols-md-3 g-4 ">
        {
          recipes.map(({ idMeal, strMeal, strMealThumb }, index) => (
            <div key={ uuidv4() }>
              <RecipeCard
                id={ idMeal }
                index={ index }
                name={ strMeal }
                thumb={ strMealThumb }
                type="food"
              />
            </div>
          ))
        }
      </div>
    );
  }

  renderDrinks() {
    const recipes = this.filterTwelveRecipes();

    return (
      <div className="row row-cols-3 row-cols-md-3 g-4">
        {
          recipes.map(({ idDrink, strDrink, strDrinkThumb }, index) => (
            <div key={ uuidv4() }>
              <RecipeCard
                id={ idDrink }
                index={ index }
                name={ strDrink }
                thumb={ strDrinkThumb }
                type="drink"
              />
            </div>
          ))
        }
      </div>
    );
  }

  render() {
    const { type } = this.props;

    if (type === 'foods') return this.renderFoods();
    if (type === 'drinks') return this.renderDrinks();
  }
}

RecipesList.propTypes = {
  recipes: PropTypes.arrayOf(PropTypes.object),
}.isRequired;

export default RecipesList;
