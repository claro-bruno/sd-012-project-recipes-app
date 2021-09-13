import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { checkEnableButton } from '../../Redux/actions/storage/getStorage';
import {
  addInProgressItem,
  getInProgressLocalStorage,
  removeInProgressItem,
} from '../../webStorage/inProgressHelpers';
import { enableButton } from '../../services/inProgressService';

class IngredientsCheckedList extends Component {
  constructor(props) {
    super(props);

    this.state = {
      ingredientName: '',
      measure: '',
      checked: false,
    };

    this.checkStorage = this.checkStorage.bind(this);
    this.getIngredients = this.getIngredients.bind(this);
    this.handleClick = this.handleClick.bind(this);
  }

  componentDidMount() {
    this.getIngredients();
  }

  handleClick() {
    const { id, ingredient, ingredients, type, setEnableBtn } = this.props;
    const { checked } = this.state;

    if (checked) {
      this.setState({ checked: false });
      removeInProgressItem(
        type === 'comida' ? 'meals' : 'cocktails',
        id,
        Object.keys(ingredient),
      );
    }
    if (!checked) {
      this.setState({ checked: true });
      addInProgressItem(
        type === 'comida' ? 'meals' : 'cocktails',
        id,
        Object.keys(ingredient),
      );

      const inProgressStorage = getInProgressLocalStorage();

      if (inProgressStorage) {
        const ingredientsList = ingredients.map((element) => Object.keys(element)[0]);
        const ingredientsChecked = inProgressStorage[
          type === 'comida' ? 'meals' : 'cocktails'
        ][id];

        const isDisabled = enableButton(ingredientsList, ingredientsChecked);

        setEnableBtn(isDisabled);
      }
    }
  }

  getIngredients() {
    const { ingredient } = this.props;

    const ingredientName = Object.keys(ingredient);
    const measure = Object.values(ingredient);

    this.setState({ ingredientName, measure });
  }

  checkStorage() {
    const { id, ingredient, storage, type } = this.props;
    const ingredientName = Object.keys(ingredient)[0];

    let ingredients;

    if (type === 'comida') ingredients = storage.meals;
    if (type === 'bebida') ingredients = storage.cocktails;

    let checkdIngredients;

    if (ingredients && ingredients[id]) {
      checkdIngredients = ingredients[id];

      return checkdIngredients.indexOf(ingredientName) >= 0;
    }

    return false;
  }

  render() {
    const { ingredientName, measure, checked } = this.state;
    const { index } = this.props;

    const isChecked = this.checkStorage();

    return (
      <label
        htmlFor={ `${index}-ingredient-step` }
        data-testid={ `${index}-ingredient-step` }
        className={ checked || isChecked ? 'mb-1 complete' : 'mb-1' }
      >
        <input
          type="checkbox"
          checked={ checked || isChecked || '' }
          className="checkedbox"
          value={ ingredientName }
          onChange={ this.handleClick }
          id={ `${index}-ingredient-step` }
        />
        { `${ingredientName}: ${measure}` }
      </label>
    );
  }
}

const mapDispatchToProps = (dispatch) => ({
  setEnableBtn: (bool) => dispatch(checkEnableButton(bool)),
});

export default connect(null, mapDispatchToProps)(IngredientsCheckedList);

IngredientsCheckedList.propTypes = {
  index: PropTypes.number,
}.isRequired;
