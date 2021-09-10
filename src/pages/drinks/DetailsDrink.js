import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import { v4 as uuidv4 } from 'uuid';
import IngredientsDrink from '../../components/IngredientsDrink';
import Instructions from '../../components/Instructions';
import RecomendationsDrinks from '../../components/RecomendationsDrinks';
import ShareButton from '../../components/ShareButton';
import FavoriteButton from '../../components/FavoriteButton';
import fetchCocktail from '../../Redux/actions/fetchCocktail';
import './style.css';

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
    const { setCocktail, match } = this.props;
    const { params: { id } } = match;
    // const startButton = document.querySelector('start-recipe-button');
    // console.log(startButton);
    // startButton.style.visibility = 'visible';
    setCocktail(id);
    // this.setRecipes();
  }

  // setRecipes() {
  //   const recipesMock = [
  //     {
  //       id: '52771',
  //       type: 'comida',
  //       area: 'Italian',
  //       category: 'Vegetarian',
  //       alcoholicOrNot: '',
  //       name: 'Spicy Arrabiata Penne',
  //       image: 'https://www.themealdb.com/images/media/meals/ustsqw1468250014.jpg',
  //       doneDate: '23/06/2020',
  //       tags: ['Pasta', 'Curry'],
  //     },
  //     {
  //       id: '178319',
  //       type: 'bebida',
  //       area: '',
  //       category: 'Cocktail',
  //       alcoholicOrNot: 'Alcoholic',
  //       name: 'Aquamarine',
  //       image: 'https://www.thecocktaildb.com/images/media/drink/zvsre31572902738.jpg',
  //       doneDate: '23/06/2020',
  //       tags: [],
  //     },
  //   ];
  //   localStorage.setItem('recipesMock', JSON.stringify(recipesMock));
  //   const savedRecipes = JSON.parse(localStorage.getItem('recipesMock'));

  //   this.setState({ recipesMock: recipes });
  // }

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
                    <RecomendationsDrinks />
                    <button
                      className="start-recipe-button"
                      type="button"
                      data-testid="start-recipe-btn"
                      onClick={ this.setRedirect }
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

const mapDispatchToProps = (dispach) => ({
  setCocktail: (id) => dispach(fetchCocktail(id)),
});

export default connect(mapStateToProps, mapDispatchToProps)(DetailsDrink);
