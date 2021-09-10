import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import { v4 as uuidv4 } from 'uuid';
import IngredientsDrink from '../../components/Ingredients/IngredientsDrink';
import Instructions from '../../components/Instructions';
import Recomendations from '../../components/Recomendations';
import ShareButton from '../../components/ShareButton';
import FavoriteButton from '../../components/FavoriteButton';
import fetchCocktail from '../../Redux/actions/fetchCocktail';
import './style.css';
import { fetchDrinks } from '../../Redux/actions/fetchDrinks';
import { fetchMeals } from '../../Redux/actions/fetchMeals';

class DetailsDrink extends Component {
  constructor(props) {
    super(props);

    this.state = {
      redirect: false,
      // recipes: [],
    };
    // this.setRecipes = this.setRecipes.bind(this);
    this.setRedirect = this.setRedirect.bind(this);
  }

  componentDidMount() {
    const { setCocktail, setDrinks, setMeals, match } = this.props;
    const { params: { id } } = match;
    setCocktail(id);
    setDrinks();
    setMeals();
  }

  setRedirect() {
    const { redirect } = this.state;
    this.setState({
      redirect: !redirect,
    });
    // const startButton = document.querySelector('start-recipe-button');
    // startButton.style.visibility = 'hidden';
  }

  render() {
    const { cocktail, match, loading } = this.props;
    const { params: { id } } = match;
    const { redirect } = this.state;
    return (
      <div>
        {
          !loading
            ? (
              cocktail.map(
                ({
                  idDrink,
                  strDrink,
                  strCategory,
                  strDrinkThumb,
                  strAlcoholic,
                }, index) => (
                  <div key={ uuidv4() }>
                    <div>
                      <img
                        data-testid="recipe-photo"
                        className="recipe-image"
                        src={ strDrinkThumb }
                        alt="foto"
                      />
                    </div>

                    <ShareButton
                      position={ index }
                      id={ id }
                      type="bebida"
                    />
                    <FavoriteButton
                      id={ idDrink }
                      type="bebida"
                      category={ strCategory }
                      alcoholicOrNot={ strAlcoholic }
                      name={ strDrink }
                      image={ strDrinkThumb }
                      position={ index }
                    />

                    <div>
                      <h1 data-testid="recipe-title">{ strDrink }</h1>
                      <h2 data-testid="recipe-category">
                        { strCategory }
                        { strAlcoholic }
                      </h2>
                    </div>

                    <IngredientsDrink />
                    <Instructions />
                    <Recomendations type="bebida" />

                    <button
                      type="button"
                      onClick={ this.setRedirect }
                      data-testid="start-recipe-btn"
                      className="start-recipe-button"
                    >
                      Iniciar Receita
                    </button>
                  </div>
                ),
              )
            ) : <div>loading...</div>
        }

        { redirect ? <Redirect to={ `/bebidas/${id}/in-progress` } /> : null }
      </div>
    );
  }
}

DetailsDrink.propTypes = {
  match: PropTypes.objectOf(PropTypes.object),
  params: PropTypes.objectOf(PropTypes.object),
  id: PropTypes.string,
}.isRequired;

const mapStateToProps = (state) => ({
  cocktail: state.drinks.cocktails,
  loading: state.drinks.loading,
});

const mapDispatchToProps = (dispatch) => ({
  setCocktail: (id) => dispatch(fetchCocktail(id)),
  setDrinks: () => dispatch(fetchDrinks()),
  setMeals: () => dispatch(fetchMeals()),
});

export default connect(mapStateToProps, mapDispatchToProps)(DetailsDrink);
