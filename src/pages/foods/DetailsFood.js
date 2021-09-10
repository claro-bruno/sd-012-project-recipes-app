import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { v4 as uuidv4 } from 'uuid';
import { Redirect } from 'react-router-dom';
import Ingredients from '../../components/Ingredients';
import Instructions from '../../components/Instructions';
// import Video from '../../components/Video';
import RecomendationsDrinks from '../../components/RecomendationsDrinks';
import FavoriteButton from '../../components/FavoriteButton';
import ShareButton from '../../components/ShareButton';
import fetchRecipes from '../../Redux/actions/fetchRecipes';
import { fetchDrinks } from '../../Redux/actions/fetchDrinks';
import './style.css';

class DetailsFood extends Component {
  constructor(props) {
    super(props);

    this.state = {
      red: false,
    };

    this.setRedirect = this.setRedirect.bind(this);
  }

  componentDidMount() {
    const { fetchRecipe, match, setDrinks } = this.props;
    const { params: { id } } = match;
    fetchRecipe(id);
    setDrinks();
  }

  setRedirect() {
    const { red } = this.state;
    this.setState({
      red: !red,
    });
  }

  render() {
    const { loading, recipe, match } = this.props;
    const { params: { id } } = match;
    const { red } = this.state;

    return (
      <div>
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
                    <RecomendationsDrinks />

                    <button
                      className="start-recipe-button"
                      type="button"
                      data-testid="start-recipe-btn"
                      onClick={ () => this.setRedirect() }
                    >
                      Iniciar Receita
                    </button>
                  </div>
                ))
              ) : <div>Loading...</div>
          }
          {
            red ? <Redirect to={ `/comidas/${id}/in-progress` } /> : null
          }
        </div>
        {/* <Video /> */}
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
  drinks: state.drinks.drinks,
  loading: state.foods.loading,
});

const mapDispatchToProps = (dispach) => ({
  fetchRecipe: (id) => dispach(fetchRecipes(id)),
  setDrinks: () => dispach(fetchDrinks()),
});

export default connect(mapStateToProps, mapDispatchToProps)(DetailsFood);
