import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import fetchRecipes from '../Redux/actions/fetchRecipes';
import IngredientsCheckedItem from './IngredientsCheckedItem';
import fetchStorage from '../Redux/actions/storage/getStorage';
import { initialInProgressStorage } from '../webStorage/storages';
import '../pages/foods/style.css';

class IngredientsCheckedList extends Component {
  constructor(props) {
    super(props);

    // this.state = {
    //   localStorage: {},
    // };

    // this.getprogress = this.getprogress.bind(this);
    // this.setLocalStorage = this.setLocalStorage.bind(this);
    // this.finishStatus = this.finishStatus.bind(this);
    // this.taskItem = this.taskItem.bind(this);
    this.setIngredients = this.setIngredients.bind(this);
  }

  componentDidMount() {
    const { setStorage } = this.props;

    setStorage('inProgressRecipes', initialInProgressStorage);
  }

  setIngredients() {
    const { recipe } = this.props;
    const object = recipe[0];
    const keys = Object.keys(object);
    const values = Object.values(object);

    const ingredientsKeys = keys.filter((item, index) => (
      item.includes('strIngredient') && values[index] !== ''
      && item.includes('strIngredient') && values[index] !== null
    ));

    const measurementsKeys = keys.filter((item, index) => (
      item.includes('strMeasure') && values[index] !== ' '
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

    return (
      <div className="form">
        {
          ingredients.map((ingredient, index) => (
            <div key={ index }>
              <IngredientsCheckedItem
                id={ id }
                index={ index }
                ingredient={ ingredient }
                type={ type }
              />
            </div>
          ))
        }
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  recipe: state.foods.recipes,
});

const mapDispatchToProps = (dispach) => ({
  setRecipes: (id) => dispach(fetchRecipes(id)),
  setStorage: (key, obj) => dispach(fetchStorage(key, obj)),
});

export default connect(mapStateToProps, mapDispatchToProps)(IngredientsCheckedList);

IngredientsCheckedList.propTypes = {
  recipe: PropTypes.objectOf(PropTypes.object),
  setRecipe: PropTypes.func,
}.isRequired;

// setLocalStorage() {
//   const { id } = this.props;
//   const progress = document.querySelectorAll('.complete');
//   const localprogress = JSON.parse(localStorage.getItem('inProgressRecipes'));
//   const result = [];
//   progress.forEach((element) => result.push(element.firstElementChild.value));
//   const progressObject = {
//     ...localprogress,
//     meals: {
//       ...localprogress.meals,
//       [id]: [...result],
//     },
//   };
//   localStorage.setItem('inProgressRecipes', JSON.stringify(progressObject));
// }
