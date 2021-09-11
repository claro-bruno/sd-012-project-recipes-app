import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { v4 as uuidv4 } from 'uuid';
import { Redirect } from 'react-router-dom';
import Ingredients from '../../components/Ingredients/Ingredients';
import Instructions from '../../components/Instructions';
// import Video from '../../components/Video';
import Recomendations from '../../components/Recomendations';
import FavoriteButton from '../../components/FavoriteButton';
import ShareButton from '../../components/ShareButton';
import fetchRecipes from '../../Redux/actions/fetchRecipes';
import { fetchDrinks } from '../../Redux/actions/fetchDrinks';
import { fetchMeals } from '../../Redux/actions/fetchMeals';
import './style.css';
import { getLocalStorage } from '../../webStorage/donesHelpers';

class DetailsFood extends Component {
  constructor(props) {
    super(props);

    this.state = {
      redirect: false,
      hiddenBtn: false,
    };

    this.hideButton = this.hideButton.bind(this);
    this.setRedirect = this.setRedirect.bind(this);
  }

  componentDidMount() {
    const { match, setRecipe, setDrinks, setMeals } = this.props;
    const { params: { id } } = match;

    this.hideButton();

    setRecipe(id);
    setDrinks();
    setMeals();
  }

  setRedirect() {
    const { redirect } = this.state;
    this.setState({
      redirect: !redirect,
    });
  }

  hideButton() {
    const { match: { params: { id } } } = this.props;
    const doneStorage = getLocalStorage();

    const isDone = doneStorage.some((recipe) => recipe.id === id);

    this.setState({ hiddenBtn: isDone });
  }

  render() {
    const { loading, recipe, match } = this.props;
    const { params: { id } } = match;
    const { redirect, hiddenBtn } = this.state;

    return (
      <div>
        {
          !loading
            ? (
              recipe.map(({
                idMeal,
                strMeal,
                strCategory,
                strArea,
                strMealThumb,
                // strYoutube,
              }, index) => (
                <div key={ uuidv4() }>
                  <div>
                    <img
                      className="img-details"
                      data-testid="recipe-photo"
                      src={ strMealThumb }
                      alt="foto"
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
                    <h1 data-testid="recipe-title">{ strMeal }</h1>
                    <h2 data-testid="recipe-category">{ strCategory }</h2>
                  </div>

                  <Ingredients />
                  <Instructions />

                  {/* <Video
                    src={ strYoutube.replace('watch?v', 'embed/') }
                    title={ strMeal }
                  /> */}

                  <Recomendations type="comida" />

                  <button
                    type="button"
                    hidden={ hiddenBtn }
                    className="start-recipe-button"
                    data-testid="start-recipe-btn"
                    onClick={ this.setRedirect }
                  >
                    Iniciar Receita
                  </button>
                </div>
              ))
            ) : <div>Loading...</div>
        }

        { redirect ? <Redirect to={ `/comidas/${id}/in-progress` } /> : null }
      </div>
    );
  }
}

DetailsFood.propTypes = {
  match: PropTypes.objectOf(PropTypes.object),
  params: PropTypes.objectOf(PropTypes.object),
  id: PropTypes.string,
}.isRequired;

const mapStateToProps = (state) => ({
  recipe: state.foods.recipes,
  loading: state.foods.loading,
});

const mapDispatchToProps = (dispatch) => ({
  setRecipe: (id) => dispatch(fetchRecipes(id)),
  setDrinks: () => dispatch(fetchDrinks()),
  setMeals: () => dispatch(fetchMeals()),
});

export default connect(mapStateToProps, mapDispatchToProps)(DetailsFood);
