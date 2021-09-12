import React, { Component } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

class Instructions extends Component {
  render() {
    const { recipe, cocktail } = this.props;
    return (
      <section data-testid="instructions">
        {
          recipe.map(({ strInstructions }) => (
            <p key={ uuidv4() }>{ strInstructions }</p>
          ))
        }
        {
          cocktail.map(({ strInstructions }) => (
            <p key={ uuidv4() }>{ strInstructions }</p>
          ))
        }
      </section>
    );
  }
}

const mapStateToProps = (state) => ({
  recipe: state.foods.recipes,
  cocktail: state.drinks.cocktails,
});

export default connect(mapStateToProps)(Instructions);

Instructions.propTypes = {
  recipe: PropTypes.objectOf(PropTypes.object),
}.isRequired;
