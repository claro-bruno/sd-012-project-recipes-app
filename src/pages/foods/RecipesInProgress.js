import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { v4 as uuidv4 } from 'uuid';
import fetchRecipes from '../../Redux/actions/fetchRecipes';
import FavoriteButton from '../../components/FavoriteButton';
import Instructions from '../../components/Instructions';
import ShareButton from '../../components/ShareButton';
import FoodsCheckIngredients from '../../components/FoodsCheckIngredients';
import './style.css';

class RecipesInProgress extends Component {
  constructor(props) {
    super(props);
    this.state = {
      disabled: true,
      redirect: false,
    };
    this.finishStatus = this.finishStatus.bind(this);
    this.redirecPage = this.redirecPage.bind(this);
  }

  componentDidMount() {
    const { match: { params: { id } }, fetchRecipe } = this.props;
    fetchRecipe(id);
  }

  redirecPage() {
    const { recipe } = this.props;
    const date = new Date();
    const formDate = `${date.getDate()}/${date.getMonth() + 1}/${date.getFullYear()}`;
    const recipeDone = [];
    recipe.forEach(({
      idMeal,
      strArea,
      strCategory,
      strMeal,
      strMealThumb,
      strTags,
    }) => {
      recipeDone.push({
        id: idMeal,
        type: 'comida',
        area: strArea,
        category: strCategory,
        alcoholicOrNot: '',
        name: strMeal,
        image: strMealThumb,
        doneDate: formDate,
        tags: strTags,
      });
    });
    console.log(recipeDone);
    localStorage.setItem('doneRecipes', JSON.stringify(recipeDone));
    this.setState({ redirect: true });
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
    const { loading, recipe, match: { params: { id } } } = this.props;
    const { disabled, redirect } = this.state;
    return (
      <>
        {
          !loading
            ? (
              recipe.map(({
                strMeal,
                strCategory,
                strMealThumb,
                idMeal,
                strArea,
              }, index) => (
                <div key={ uuidv4() }>
                  <div>
                    <img
                      data-testid="recipe-photo"
                      src={ strMealThumb }
                      alt="foto da receita"
                      className="img-details"
                    />
                  </div>
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
                  <div>
                    <h2 data-testid="recipe-title">{strMeal}</h2>
                    <h2 data-testid="recipe-category">{ strCategory }</h2>
                    <p>{' '}</p>
                  </div>
                  <div>
                    <FoodsCheckIngredients id={ id } handleClick={ this.finishStatus } />
                  </div>
                </div>
              ))
            ) : <div>Loading...</div>
        }
        <button
          className="btn btn-warning"
          type="button"
          data-testid="finish-recipe-btn"
          onClick={ this.redirecPage }
          disabled={ disabled }
        >
          Finalizar a receita
        </button>
        <Instructions />
        { redirect ? <Redirect to="/receitas-feitas" />
          : null }
      </>
    );
  }
}

const mapDispatchToProps = (dispach) => ({
  fetchRecipe: (id) => dispach(fetchRecipes(id)),
});

const mapStateToProps = (state) => ({
  recipe: state.foods.recipes,
  loading: state.foods.loading,
});

RecipesInProgress.propTypes = {
  match: PropTypes.objectOf(PropTypes.object),
  params: PropTypes.objectOf(PropTypes.object),
  id: PropTypes.string,
}.isRequired;

export default connect(mapStateToProps, mapDispatchToProps)(RecipesInProgress);
