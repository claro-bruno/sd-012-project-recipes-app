import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import IngredientsCheckedItem from './IngredientsCheckedItem';
import '../../pages/foods/style.css';
import { getInProgressLocalStorage } from '../../webStorage/inProgressHelpers';

class IngredientsCheckedList extends Component {
  constructor(props) {
    super(props);

    this.setIngredients = this.setIngredients.bind(this);
  }

  setIngredients() {
    const { meal, cocktail } = this.props;

    let recipe;
    if (meal.length !== 0) recipe = meal;
    if (cocktail.length !== 0) recipe = cocktail;

    const object = recipe[0];
    const keys = Object.keys(object);
    const values = Object.values(object);

    const ingredientsKeys = keys.filter((item, index) => (
      item.includes('strIngredient') && values[index] !== ''
      && item.includes('strIngredient') && values[index] !== null
    ));

    const measurementsKeys = keys.filter((item, index) => (
      item.includes('strMeasure') && values[index] !== ''
    ));

    return ingredientsKeys.reduce((acc, curr, index) => (
      [
        ...acc,
        {
          [object[curr]]: object[measurementsKeys[index]],
        },
      ]
    ), []);
  }

  render() {
    const { id, type } = this.props;
    const ingredients = this.setIngredients();
    const inProgressStorage = getInProgressLocalStorage();

    return (
      <div className="form">
        {
          ingredients.map((ingredient, index) => (
            <div key={ index }>
              <IngredientsCheckedItem
                id={ id }
                type={ type }
                index={ index }
                storage={ inProgressStorage }
                ingredient={ ingredient }
                ingredients={ ingredients }
              />
            </div>
          ))
        }
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  meal: state.foods.recipes,
  cocktail: state.drinks.cocktails,
});

export default connect(mapStateToProps)(IngredientsCheckedList);

IngredientsCheckedList.propTypes = {
  recipe: PropTypes.objectOf(PropTypes.object),
  setRecipe: PropTypes.func,
}.isRequired;
