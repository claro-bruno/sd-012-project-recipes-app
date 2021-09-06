import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import ButtonDetails from '../../components/ButtonDetails';
import IngredientsDrink from '../../components/IngredientsDrink';
import Instructions from '../../components/Instructions';
import RecomendationsFoods from '../../components/RecomendationsFoods';
import ShareButton from '../../components/ShareButton';
import FavoriteButton from '../../components/FavoriteButton';
import fetchCocktail from '../../Redux/actions/fetchCocktail';
import { fetchMeals } from '../../Redux/actions/fetchMeals';
import './style.css';

class DetailsDrink extends Component {
  componentDidMount() {
    const { setCocktail, match, setMeals } = this.props;
    const { params: { id } } = match;
    setCocktail(id);
    setMeals();
  }

  setRedirect() {
    const { red } = this.state;
    this.setState({
      red: !red,
    });
  }

  render() {
    const { cocktail, match } = this.props;
    const { params: { id } } = match;
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
                  <RecomendationsFoods />
                  <ButtonDetails />
                </div>
              ),
            )
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
