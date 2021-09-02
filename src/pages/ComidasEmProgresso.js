import React, { useState, useEffect } from 'react';
import { Redirect } from 'react-router';
import { Image, Button } from 'react-bootstrap';
import PropTypes from 'prop-types';
import ShareButton from '../components/ShareButton';
import FavoriteButton from '../components/FavoriteButton';
import DoneButton from '../components/DoneButton';
import * as fetchAPI from '../service/fetchAPI';
import './ComidasEmProgresso.css';

const INITIAL_STORAGE_STATE = { cocktails: {}, meals: {} };

function ComidasEmProgresso(props) {
  const [recipe, setRecipe] = useState([]);
  const [isLoaded, setIsLoaded] = useState(false);
  const [completeIngredient, setCompleteIngredient] = useState([]);
  const [ingredients, setIngredients] = useState([]);
  const [measures, setMeasures] = useState([]);
  const [shouldRedirect, setShouldRedirect] = useState(false);
  const { history: { location: { pathname } } } = props;
  const id = pathname.split('/')[2];
  const pathToCopy = `${pathname.split('/')[1]}/${pathname.split('/')[2]}`;
  const { strMealThumb, strMeal, strCategory, strInstructions } = recipe;
  useEffect(() => {
    fetchAPI.fetchRecipeById(id)
      .then(({ meals }) => setRecipe(meals[0]))
      .then(() => setIsLoaded(true));
    if (localStorage.getItem('inProgressRecipes') === null) {
      localStorage.setItem('inProgressRecipes', JSON.stringify(INITIAL_STORAGE_STATE));
    }
    const savedProgress = JSON.parse(localStorage.getItem('inProgressRecipes'));
    if (savedProgress.meals[id] !== undefined) {
      setCompleteIngredient([...savedProgress.meals[id]]);
    }
  }, [id]);

  useEffect(() => {
    const recipeKeys = Object.keys(recipe)
      .filter((item) => item.includes('strIngredient'));
    setIngredients(recipeKeys.map((item) => recipe[item]));

    const measureKeys = Object.keys(recipe)
      .filter((item) => item.includes('strMeasure'));
    setMeasures(measureKeys.map((item) => recipe[item]));
  }, [isLoaded]);

  useEffect(() => {
    const savedProgress = JSON.parse(localStorage.getItem('inProgressRecipes'));
    const newProgress = {
      ...savedProgress,
      meals: {
        ...savedProgress.meals,
        [id]: [...completeIngredient],
      },
    };
    localStorage.setItem('inProgressRecipes', JSON.stringify(newProgress));
  }, [completeIngredient]);

  const doneIngredient = ({ target }, item) => {
    target.parentNode.classList.toggle('complete');
    if (completeIngredient.includes(item)) {
      return setCompleteIngredient(completeIngredient
        .filter((ingredient) => ingredient !== item));
    }
    setCompleteIngredient([...completeIngredient, item]);
  };

  const checkStorage = (ingrediente) => {
    const check = completeIngredient.includes(ingrediente);
    return check;
  };

  const finaleRecipe = () => {
    const typeRecipe = 'comida';
    DoneButton({ recipe, typeRecipe });
    setShouldRedirect(true);
  };

  const displayList = (item, index) => {
    if (item !== null && item.length > 0) {
      return (
        <span key={ index }>
          <label
            htmlFor="ingredient"
            data-testid={ `${index}-ingredient-step` }
            className={ checkStorage(item) ? 'complete' : '' }
          >
            <input
              type="checkbox"
              onClick={ (event) => doneIngredient(event, item) }
              defaultChecked={ checkStorage(item) }
            />
            { ` ${item}` }
          </label>
          <span data-testid="instructions">{ ` - ${measures[index]}` }</span>
          <br />
        </span>
      );
    }
  };

  const disableButton = () => {
    const listItem = document.getElementsByTagName('li').length;
    return listItem !== completeIngredient.length;
  };

  if (isLoaded) {
    return (
      <section className="main-containe">
        <Image
          fluid
          src={ strMealThumb }
          alt="Imagem da receita"
          data-testid="recipe-photo"
        />
        <div className="favorite-container">
          <h2 data-testid="recipe-title">
            { strMeal }
          </h2>
          <div className="icons">
            <ShareButton pathname={ pathToCopy } />
            <FavoriteButton recipe={ recipe } id={ id } type="food" />
          </div>
        </div>
        <h5 data-testid="recipe-category">
          { strCategory }
        </h5>
        <h4>Ingredientes</h4>
        <div className="ingredients-container">
          { ingredients.map((item, index) => displayList(item, index)) }
        </div>
        <div>
          <h4>Instrucões</h4>
          <p>{ strInstructions }</p>
        </div>
        <Button
          type="button"
          data-testid="finish-recipe-btn"
          disabled={ disableButton() }
          onClick={ () => finaleRecipe() }
        >
          Finalizar Receita
        </Button>
        { shouldRedirect ? <Redirect to="/receitas-feitas" /> : null }
      </section>
    );
  }

  return <div className="c-loader" />;
}

ComidasEmProgresso.propTypes = {
  history: PropTypes.shape({
    location: PropTypes.shape({
      pathname: PropTypes.string,
    }),
  }),
}.isRequired;

export default ComidasEmProgresso;
