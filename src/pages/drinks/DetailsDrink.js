import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import IngredientsDrink from '../../components/IngredientsDrink';
import Instructions from '../../components/Instructions';
import RecomendationsFoods from '../../components/RecomendationsFoods';
import ShareButton from '../../components/ShareButton';
import FavoriteButton from '../../components/FavoriteButton';
import fetchCocktail from '../../Redux/actions/fetchCocktail';
import { fetchMeals } from '../../Redux/actions/fetchMeals';
import './style.css';

class DetailsDrink extends Component {
  constructor(props) {
    super(props);

    this.state = {
      red: false,
      // recipes: [],
    };
    // this.setRecipes = this.setRecipes.bind(this);
    this.setRedirect = this.setRedirect.bind(this);
  }

  componentDidMount() {
    const { setCocktail, match, setMeals } = this.props;
    const { params: { id } } = match;
    // const startButton = document.querySelector('start-recipe-button');
    // console.log(startButton);
    // startButton.style.visibility = 'visible';
    setCocktail(id);
    setMeals();
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
    const { red } = this.state;
    this.setState({
      red: !red,
    });
    // const startButton = document.querySelector('start-recipe-button');
    // startButton.style.visibility = 'hidden';
  }

  render() {
    const { cocktail, match } = this.props;
    const { params: { id } } = match;
    const { red } = this.state;
    return (
      <div>
        <div>
          {
            cocktail.map(
              ({
                idDrink,
                strDrink,
                strCategory,
                strDrinkThumb,
                strAlcoholic,
              }, index) => (
                <div key={ index }>
                  <div>
                    <img
                      className="img-details"
                      data-testid="recipe-photo"
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
                  <RecomendationsFoods />

                  <button
                    className="start-recipe-button"
                    type="button"
                    data-testid="start-recipe-btn"
                    onClick={ () => this.setRedirect() }
                  >
                    Iniciar Receita
                  </button>
                </div>
              ),
            )
          }
          {
            red ? <Redirect to={ `/bebidas/${id}/in-progress` } /> : console.log('chamou')
          }
        </div>
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
  meals: state.foods.meals,
});

const mapDispatchToProps = (dispach) => ({
  setCocktail: (id) => dispach(fetchCocktail(id)),
  setMeals: () => dispach(fetchMeals()),
});

export default connect(mapStateToProps, mapDispatchToProps)(DetailsDrink);
