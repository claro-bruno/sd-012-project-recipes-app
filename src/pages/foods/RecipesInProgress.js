import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import fetchRecipes from '../../Redux/actions/fetchRecipes';
import FavoriteButton from '../../components/FavoriteButton';
import Instructions from '../../components/Instructions';
import ShareButton from '../../components/ShareButton';
import IngredientsCheckedList from '../../components/IngredientsCheckedList';
import './style.css';

class RecipesInProgress extends Component {
  constructor(props) {
    super(props);

    this.state = {
      disabled: true,
    };

    // this.finishStatus = this.finishStatus.bind(this);
  }

  componentDidMount() {
    const { match: { params: { id } }, fetchRecipe } = this.props;
    fetchRecipe(id);
  }

  // finishStatus() {
  //   const colectionHTML = document.querySelectorAll('.checkedbox');
  //   const arrayboolean = [];
  //   colectionHTML.forEach((element) => {
  //     arrayboolean.push(element.parentNode.className === 'complete');
  //   });
  //   if (arrayboolean.every((element) => element === true)) {
  //     this.setState({
  //       disabled: false,
  //     });
  //   }
  //   if (arrayboolean.some((element) => element === false)) {
  //     this.setState({
  //       disabled: true,
  //     });
  //   }
  // }

  render() {
    const { recipe, match: { params: { id } } } = this.props;
    const { disabled } = this.state;
    return (
      <>
        {
          recipe.map(({ strMeal, strCategory, strMealThumb, idMeal, strArea }, index) => (
            <div key={ index }>
              <div className="d-flex">
                <img
                  data-testid="recipe-photo"
                  src={ strMealThumb }
                  alt="foto da receita"
                  className="img-details"
                />

                <ShareButton
                  position={ index }
                  id={ id }
                  type="comida"
                />
                <FavoriteButton
                  id={ idMeal }
                  type="comida"
                  area={ strArea }
                  category={ strCategory }
                  alcoholicOrNot=""
                  name={ strMeal }
                  image={ strMealThumb }
                  position={ index }
                />
              </div>

              <div>
                <h2 data-testid="recipe-title">{strMeal}</h2>
                <h2 data-testid="recipe-category">{ strCategory }</h2>
                <p>{' '}</p>
              </div>

              <IngredientsCheckedList
                type="comida"
                id={ id }
              />
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
            </div>
          ))
        }
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
