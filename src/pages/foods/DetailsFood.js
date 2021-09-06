import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Ingredients from '../../components/Ingredients';
import Instructions from '../../components/Instructions';
import Video from '../../components/Video';
import ButtonDetails from '../../components/ButtonDetails';
import RecomendationsDrinks from '../../components/RecomendationsDrinks';
import FavoriteButton from '../../components/FavoriteButton';
import ShareButton from '../../components/ShareButton';
import fetchRecipes from '../../Redux/actions/fetchRecipes';
import { fetchDrinks } from '../../Redux/actions/fetchDrinks';
import './style.css';

class DetailsFood extends Component {
  componentDidMount() {
    const { fetchRecipe, match, setDrinks } = this.props;
    const { params: { id } } = match;
    fetchRecipe(id);
    setDrinks();
  }

  render() {
    const { recipe, match } = this.props;
    const { params: { id } } = match;
    return (
      <div>
        <div>
          {
            recipe.map(({
              idMeal,
              strMeal,
              strCategory,
              strArea,
              strMealThumb,
            }, index) => (
              <div key={ index }>
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
                <Video />
                <RecomendationsDrinks />
                <ButtonDetails />
              </div>
            ))
          }
        </div>
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
});

const mapDispatchToProps = (dispach) => ({
  fetchRecipe: (id) => dispach(fetchRecipes(id)),
  setDrinks: () => dispach(fetchDrinks()),
});

export default connect(mapStateToProps, mapDispatchToProps)(DetailsFood);
