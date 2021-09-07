import React, { useContext, useState } from 'react';
import { useHistory } from 'react-router';
import PropTypes from 'prop-types';
import { Share, Favorite as blackHeartIcon,
  FavoriteBorder as whiteHeartIcon, ArrowBack } from '@material-ui/icons';
import { Link } from 'react-router-dom';
import Modal from 'react-modal';
import IconButton from '../../Components/IconBtn';
import Vid from '../../Components/Vid';
import Btn from '../../Components/Btn';
import Food from '../../Components/Food';
import './RecipeDetails.css';
import { ContextApp } from '../../Context/ContextApp';
import List from '../../Components/List';
import ModalHook from '../../Hooks/ModalHook';

Modal.setAppElement('#root');

function RecipeDetails({ match: { params } }) {
  const history = useHistory();
  const { feedType, id } = params;
  const [carousel, setCarousel] = useState([]);
  const { handleCopy, closeModal, modal, modalStyles } = ModalHook();
  const {
    handleRecipe, singleRecipe, handleStart, doneRecipe,
    handleBtnType, handleFav, fav,
  } = useContext(ContextApp);

  const urlRender = feedType !== 'comidas' ? 'https://www.themealdb.com/api/json/v1/1/' : 'https://www.thecocktaildb.com/api/json/v1/1/';
  const fetchApi = async (url, type, searchInput = '') => {
    const request = await fetch(`${url}${type}${searchInput}`);
    const response = await request.json();
    return setCarousel(response.meals || response.drinks);
  };
  fetchApi(urlRender, 'search.php?s=');

  if (!singleRecipe) {
    handleRecipe(params);
    return (
      <div>Loading</div>
    );
  }

  const titleProps = {
    'data-testid': 'recipe-title',
  };
  const imgProps = {
    width: '360',
    src: singleRecipe.strMealThumb || singleRecipe.strDrinkThumb,
    'data-testid': 'recipe-photo',
  };

  const shareBtn = {
    name: 'share',
    'data-testid': 'share-btn',
    icon: Share,
    alt: 'shareIcon',
    type: 'button',
    variant: 'contained',
    onClick: handleCopy,
  };
  const backBtn = {
    name: 'back',
    icon: ArrowBack,
    alt: 'backIcon',
    type: 'button',
    variant: 'contained',
    onClick: () => history.goBack(),
  };
  const favBtn = {
    name: 'favorite',
    'data-testid': 'favorite-btn',
    icon: fav ? blackHeartIcon : whiteHeartIcon,
    alt: 'favoriteIcon',
    type: 'button',
    variant: 'contained',
    onClick: handleFav,
    src: fav ? 'whiteHeartIcon' : 'blackHeartIcon',
  };
  const categoryProps = {
    'data-testid': 'recipe-category',
  };
  const InstructionProps = {
    'data-testid': 'instructions',
  };
  const vidProps = {
    'data-testid': 'video',
    className: 'video',
    width: '360',
    height: '202',
    frameBorder: '0',
    allow: 'clipboard-write; encrypted-media; gyroscope; picture-in-picture',
    allowFullScreen: '1',
    src: singleRecipe.strYoutube ? `https://www.youtube.com/embed/${singleRecipe.strYoutube.split('=')[1]}` : null,
  };
  const btnProps = {
    name: handleBtnType(params),
    'data-testid': 'start-recipe-btn',
    type: 'button',
    variant: 'contained',
    style: {
      position: 'fixed',
      bottom: 0,
    },
    onClick: () => handleStart(params),
  };
  const modalProps = {
    isOpen: modal,
    onRequestClose: closeModal,
    style: modalStyles,
  };
  const arr = Object.keys(singleRecipe)
    .filter((e) => e.includes('strIngredient')
    && singleRecipe[e] !== null && singleRecipe[e] !== '');

  return (
    <div className="recipe-details">
      <div className="header">
        <IconButton { ...backBtn } />
        <h1 { ...titleProps }>{singleRecipe.strMeal || singleRecipe.strDrink}</h1>
      </div>
      <img alt="pgo" { ...imgProps } />
      <div className="buttons">
        <h2 { ...categoryProps }>
          { singleRecipe.strAlcoholic
            ? singleRecipe.strAlcoholic : singleRecipe.strCategory}
        </h2>
        <IconButton { ...shareBtn } />
        <IconButton { ...favBtn } />
      </div>
      <h3>Ingredientes</h3>
      {arr.map((e, i) => (<List
        primary={ `${singleRecipe[e]}: ${singleRecipe[`strMeasure${i + 1}`]}` }
        key={ i }
        testid={ `${i}-ingredient-name-and-measure` }
      />))}
      <h3>Instruções</h3>
      <p { ...InstructionProps }>{singleRecipe.strInstructions}</p>
      <Vid { ...vidProps } />
      <h3>Acompanhamentos</h3>
      <div className="carousel">
        <Food recipes={ carousel } maxRecipes={ 6 } />
      </div>
      {!doneRecipe.some((e) => e.id === id)
        ? <Link to={ `/${feedType}/${id}/in-progress` }><Btn { ...btnProps } /></Link>
        : null}
      <Modal { ...modalProps }>Link copiado!</Modal>
    </div>
  );
}

RecipeDetails.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      id: PropTypes.string.isRequired,
      feedType: PropTypes.string.isRequired,
    }),
  }).isRequired,
};

export default RecipeDetails;
