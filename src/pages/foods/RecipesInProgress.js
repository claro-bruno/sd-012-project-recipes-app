import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import fetchRecipes from '../../Redux/actions/fetchRecipes';
import WhiteHeartIcon from '../../images/whiteHeartIcon.svg';
import Instructions from '../../components/Instructions';
import ShareButton from '../../components/shareButton';
import FoodsCheckIngredients from '../../components/FoodsCheckIngredients';
import './style.css';

class RecipesInProgress extends Component {
  constructor(props) {
    super(props);
    this.state = { disabled: true };
    this.finishStatus = this.finishStatus.bind(this);
  }

  componentDidMount() {
    const { match: { params: { id } }, fetchRecipe } = this.props;
    fetchRecipe(id);
  }

  finishStatus() {
    const colectionHTML = document.querySelectorAll('.checkedbox');
    const arrayboolean = [];
    colectionHTML.forEach((element) => {
      arrayboolean.push(element.parentNode.className === 'complete');
    });
    if (arrayboolean.every((element) => element === true)) {
      this.setState({
        disabled: false,
      });
    }
    if (arrayboolean.some((element) => element === false)) {
      this.setState({
        disabled: true,
      });
    }
  }

  render() {
    const { recipe, match: { params: { id } } } = this.props;
    const { disabled } = this.state;
    return (
      <>
        {
          recipe.map(({ strMeal, strCategory, strMealThumb }, index) => (
            <div key={ index }>
              <div>
                <img
                  data-testid="recipe-photo"
                  src={ strMealThumb }
                  alt="foto da receita"
                  className="img-details"
                />
              </div>
              <div>
                <h2 data-testid="recipe-title">{strMeal}</h2>
                <h2 data-testid="recipe-category">{ strCategory }</h2>
                <p>{' '}</p>
              </div>
              <div>
                <ShareButton id={ id } />
                <button type="button" className="share-fill">
                  <img
                    src={ WhiteHeartIcon }
                    alt="favorite button"
                    data-testid="favorite-btn"
                  />
                </button>
                <FoodsCheckIngredients id={ id } handleClick={ this.finishStatus } />
              </div>
            </div>
          ))
        }
        <Instructions />
        <button
          className="btn btn-warning"
          type="button"
          data-testid="finish-recipe-btn"
          onClick={ () => { console.log('clicado'); } }
          disabled={ disabled }
        >
          Finalizar a receita
        </button>
      </>
    );
  }
}

const mapDispatchToProps = (dispach) => ({
  fetchRecipe: (id) => dispach(fetchRecipes(id)),
});

const mapStateToProps = (state) => ({
  recipe: state.foods.recipes,
});

RecipesInProgress.propTypes = {
  match: PropTypes.objectOf(PropTypes.object),
  params: PropTypes.objectOf(PropTypes.object),
  id: PropTypes.string,
}.isRequired;

export default connect(mapStateToProps, mapDispatchToProps)(RecipesInProgress);
