import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Instructions from '../../components/Instructions';
import Recomendations from '../../components/RecomendationsDrinks';
import FavoriteButton from '../../components/FavoriteButton';
import fetchCocktail from '../../Redux/actions/fetchCocktail';
import DrinkscheckIngredients from '../../components/DrinksCheckIngredients';
import ShareButton from '../../components/ShareButton';
import './style.css';

class DetailsDrink extends Component {
  constructor(props) {
    super(props);
    this.state = { disabled: true };
    this.finishStatus = this.finishStatus.bind(this);
  }

  componentDidMount() {
    const { getCocktail, match } = this.props;
    const { params: { id } } = match;
    getCocktail(id);
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
    const { cocktail, match: { params: { id } } } = this.props;
    const { disabled } = this.state;
    return (
      <div>
        {
          cocktail.map(
            ({
              strDrink,
              strCategory,
              strDrinkThumb,
              strAlcoholic,
              idDrink,
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
                  cardType="/in-progress"
                />
                <div>
                  <h1 data-testid="recipe-title">{ strDrink }</h1>
                  <h2 data-testid="recipe-category">
                    { strCategory }
                    { strAlcoholic }
                  </h2>
                </div>
                <DrinkscheckIngredients id={ id } handleClick={ this.finishStatus } />
                <Instructions />
                <Recomendations />
                <button
                  className="btn btn-warning"
                  type="button"
                  data-testid="finish-recipe-btn"
                  onClick={ () => { console.log('clicado'); } }
                  disabled={ disabled }
                >
                  Finalizar drink
                </button>
              </div>
            ),
          )
        }
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
});

const mapDispatchToProps = (dispach) => ({
  getCocktail: (id) => dispach(fetchCocktail(id)),
});

export default connect(mapStateToProps, mapDispatchToProps)(DetailsDrink);
