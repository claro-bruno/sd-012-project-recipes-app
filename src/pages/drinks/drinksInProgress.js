import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import { v4 as uuidv4 } from 'uuid';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Instructions from '../../components/Instructions';
import FavoriteButton from '../../components/FavoriteButton';
import fetchCocktail from '../../Redux/actions/fetchCocktail';
import DrinkscheckIngredients from '../../components/Ingredients/DrinksCheckIngredients';
import ShareButton from '../../components/ShareButton';
import './style.css';
import {
  addDoneItem,
  addDoneLocalStorage,
  getDoneLocalStorage,
} from '../../webStorage/donesHelpers';

class DetailsDrink extends Component {
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
    const { getCocktail, match } = this.props;
    const { params: { id } } = match;
    getCocktail(id);
  }

  redirecPage() {
    const { cocktail } = this.props;
    const date = new Date();
    const formDate = `${date.getDate()}/${date.getMonth() + 1}/${date.getFullYear()}`;
    const recipeDone = [];

    cocktail.forEach(({
      idDrink,
      strCategory,
      strAlcoholic,
      strDrink,
      strDrinkThumb,
      strTags,
    }) => {
      recipeDone.push({
        id: idDrink,
        type: 'bebida',
        area: '',
        category: strCategory,
        alcoholicOrNot: strAlcoholic,
        name: strDrink,
        image: strDrinkThumb,
        doneDate: formDate,
        tags: strTags,
      });
    });

    const storage = getDoneLocalStorage();
    const newstorage = addDoneItem(storage, recipeDone);

    addDoneLocalStorage('doneRecipes', newstorage);
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
    const { loading, cocktail, match: { params: { id } } } = this.props;
    const { disabled, redirect } = this.state;
    return (
      <div>
        {
          !loading
            ? (
              cocktail.map(
                ({
                  strDrink,
                  strCategory,
                  strDrinkThumb,
                  strAlcoholic,
                  idDrink,
                }, index) => (
                  <div key={ uuidv4() }>
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
                      tag="recipe-detail"
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

                    <button
                      className="btn btn-warning"
                      type="button"
                      data-testid="finish-recipe-btn"
                      onClick={ this.redirecPage }
                      disabled={ disabled }
                    >
                      Finalizar drink
                    </button>
                    { redirect ? <Redirect to="/receitas-feitas" />
                      : null }
                  </div>
                ),
              )
            ) : <div>Loading...</div>
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
  loading: state.drinks.loading,
});

const mapDispatchToProps = (dispach) => ({
  getCocktail: (id) => dispach(fetchCocktail(id)),
});

export default connect(mapStateToProps, mapDispatchToProps)(DetailsDrink);
