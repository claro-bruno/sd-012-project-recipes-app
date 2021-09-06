import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import fetchRecipes from '../Redux/actions/fetchRecipes';
import fetchCocktail from '../Redux/actions/fetchCocktail';

class ButtonDetails extends Component {
  constructor(props) {
    super(props);

    this.state = {
      red: false,
    };

    this.setRedirect = this.setRedirect.bind(this);
  }

  setRedirect() {
    const { red } = this.state;
    this.setState({
      red: !red,
    });
  }

  render() {
    const { id } = this.props;
    const { red } = this.state;
    return (
      <div>
        <button
          className="start-recipe-button"
          type="button"
          data-testid="start-recipe-btn"
          onClick={ () => this.setRedirect() }
        >
          Iniciar Receita
        </button>
        {
          red ? <Redirect to={ `/comidas/${id}/in-progress` } /> : null
        }
      </div>
    );
  }
}

ButtonDetails.propTypes = {
  id: PropTypes.string,
}.isRequired;

const mapStateToProps = (state) => ({
  recipe: state.foods.recipes,
  cocktail: state.drinks.cocktails,
});

const mapDispatchToProps = (dispach) => ({
  fetchRecipe: (id) => dispach(fetchRecipes(id)),
  setCocktail: (id) => dispach(fetchCocktail(id)),
});

export default connect(mapStateToProps, mapDispatchToProps)(ButtonDetails);
