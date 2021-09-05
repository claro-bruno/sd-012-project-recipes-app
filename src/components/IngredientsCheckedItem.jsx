import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

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
    const { checked } = this.state;

    if (checked) this.setState({ checked: false });
    if (!checked) this.setState({ checked: true });
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

    if (ingredients) {
      checkdIngredients = ingredients[id];

      return checkdIngredients.indexOf(ingredientName) >= 0;
    }
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
          checked={ checked || isChecked }
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

const mapStateToProps = (state) => ({
  storage: state.storage.inProgress,
});

export default connect(mapStateToProps)(IngredientsCheckedList);

IngredientsCheckedList.propTypes = {
  index: PropTypes.number,
}.isRequired;
