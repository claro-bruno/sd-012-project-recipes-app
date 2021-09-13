import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { v4 as uuidv4 } from 'uuid';
import fetchRecipes from '../../Redux/actions/fetchRecipes';
import FavoriteButton from '../../components/FavoriteButton';
import Instructions from '../../components/Instructions';
import ShareButton from '../../components/ShareButton';
import IngredientsCheckedList from '../../components/Ingredients/IngredientsCheckedList';
import './style.css';
import {
  addDoneItem,
  addDoneLocalStorage,
  getDoneLocalStorage,
} from '../../webStorage/donesHelpers';

class RecipesInProgress extends Component {
  constructor(props) {
    super(props);

    this.state = {
      redirect: false,
    };

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

    const storage = getDoneLocalStorage();
    const newstorage = addDoneItem(storage, recipeDone);

    addDoneLocalStorage('doneRecipes', newstorage);
    this.setState({ redirect: true });
  }

  render() {
    const { disabled, loading, recipe, match: { params: { id } } } = this.props;
    const { redirect } = this.state;

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
                      tag="recipe-detail"
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
                      tag="recipe-detail"
                    />
                  </div>

                  <div>
                    <h2 data-testid="recipe-title">{strMeal}</h2>
                    <h2 data-testid="recipe-category">{ strCategory }</h2>
                  </div>

                  <IngredientsCheckedList id={ id } type="comida" />
                  <Instructions />

                  <button
                    className="btn btn-warning fixed-bottom"
                    type="button"
                    data-testid="finish-recipe-btn"
                    onClick={ this.redirecPage }
                    disabled={ disabled }
                  >
                    Finalizar drink
                  </button>
                </div>
              ))
            ) : <div>Loading...</div>
        }

        { redirect ? <Redirect to="/receitas-feitas" /> : null }
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
  disabled: state.storage.disableButton,
});

RecipesInProgress.propTypes = {
  match: PropTypes.objectOf(PropTypes.object),
  params: PropTypes.objectOf(PropTypes.object),
  id: PropTypes.string,
}.isRequired;

export default connect(mapStateToProps, mapDispatchToProps)(RecipesInProgress);
