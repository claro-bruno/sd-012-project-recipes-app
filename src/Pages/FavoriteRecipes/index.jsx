import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import clipboardCopy from 'clipboard-copy';
import { Share } from '@material-ui/icons';
import Header from '../../Components/Header';
import blackHeartIcon from '../../images/blackHeartIcon.svg';
import Btn from '../../Components/Btn';
import IconButton from '../../Components/IconBtn';
import './index.css';

function ReceitasFavoritas() {
  const getFavoriteStorage = JSON.parse(localStorage.getItem('favoriteRecipes')) || [];
  const [favorited, setFavorited] = useState(getFavoriteStorage);
  const [copied, setCopied] = useState(false);

  function removeFavorite(event, id) {
    event.preventDefault();
    const favoriteStorage = JSON.parse(localStorage.getItem('favoriteRecipes')) || [];
    const newArrayFavorite = favoriteStorage.filter((item) => item.id !== id);
    setFavorited(newArrayFavorite);
  }

  useEffect(() => {
    localStorage.setItem('favoriteRecipes', JSON.stringify(favorited));
  }, [favorited]);

  const allButtonProps = {
    name: 'All',
    'data-testid': 'filter-by-all-btn',
    type: 'button',
    variant: 'contained',
    onClick: () => setFavorited(getFavoriteStorage),
  };

  const foodButtonProps = {
    name: 'Food',
    'data-testid': 'filter-by-food-btn',
    type: 'button',
    variant: 'contained',
    onClick: () => setFavorited(favorited
      .filter((recipes) => recipes.type === 'comida')),
  };

  const drinksButtonProps = {
    name: 'Drinks',
    'data-testid': 'filter-by-drink-btn',
    type: 'button',
    variant: 'contained',
    onClick: () => setFavorited(favorited
      .filter((recipes) => recipes.type === 'bebida')),
  };

  const shareBtn = {
    name: 'share',
    'data-testid': 'share-btn',
    icon: Share,
    alt: 'shareIcon',
    type: 'button',
    variant: 'contained',
  };

  return (
    <div className="favorite-page">
      <Header
        title="Receitas Favoritas"
        searchButton={ false }
      />
      <div className="favorite-buttons">
        <Btn { ...allButtonProps } />
        <Btn { ...foodButtonProps } />
        <Btn { ...drinksButtonProps } />
      </div>
      <div className="favorite-recipes">
        {
          favorited.map((recipe, index) => (
            <div key={ index }>
              {recipe.type === 'bebida' ? (
                <div className="card-recipe">
                  <Link
                    to={ `/bebidas/${recipe.id}` }
                  >
                    <img
                      width="250px"
                      data-testid={ `${index}-horizontal-image` }
                      alt={ recipe.name }
                      src={ recipe.image }
                    />
                  </Link>
                  <Link to={ `/bebidas/${recipe.id}` }>
                    <h3 data-testid={ `${index}-horizontal-name` }>{ recipe.name }</h3>
                  </Link>
                  <p
                    data-testid={ `${index}-horizontal-top-text` }
                  >
                    { recipe.alcoholicOrNot }
                  </p>
                  <div className="buttons">
                    <button
                      type="button"
                      onClick={ () => {
                        clipboardCopy(`http://localhost:3000/bebidas/${recipe.id}`);
                        setCopied(true);
                      } }
                    >
                      { copied ? <span>Link copiado!</span> : <IconButton
                        { ...shareBtn }
                        alt="compartilhar"
                        data-testid={ `${index}-horizontal-share-btn` }
                      /> }
                    </button>
                    <button
                      src={ blackHeartIcon }
                      type="button"
                      onClick={ (e) => removeFavorite(e, recipe.id) }
                    >
                      <img
                        src={ blackHeartIcon }
                        data-testid={ `${index}-horizontal-favorite-btn` }
                        alt="favorited"
                      />
                    </button>
                  </div>
                </div>
              ) : (
                <div className="card-recipe" key={ index }>
                  <Link
                    to={ `/comidas/${recipe.id}` }
                  >
                    <img
                      width="250px"
                      data-testid={ `${index}-horizontal-image` }
                      alt={ recipe.name }
                      src={ recipe.image }
                    />
                  </Link>
                  <Link to={ `/comidas/${recipe.id}` }>
                    <h3 data-testid={ `${index}-horizontal-name` }>{ recipe.name }</h3>
                  </Link>
                  <p
                    data-testid={ `${index}-horizontal-top-text` }
                  >
                    { `${recipe.area} - ${recipe.category}` }
                  </p>
                  <div className="buttons">
                    <button
                      type="button"
                      onClick={ () => {
                        clipboardCopy(`http://localhost:3000/comidas/${recipe.id}`);
                        setCopied(true);
                      } }
                    >
                      { copied ? <span>Link copiado!</span> : <IconButton
                        { ...shareBtn }
                        alt="compartilhar"
                        data-testid={ `${index}-horizontal-share-btn` }
                      /> }
                    </button>
                    <button
                      src={ blackHeartIcon }
                      type="button"
                      onClick={ (e) => removeFavorite(e, recipe.id) }
                    >
                      <img
                        src={ blackHeartIcon }
                        data-testid={ `${index}-horizontal-favorite-btn` }
                        alt="favorited"
                      />
                    </button>
                  </div>
                </div>
              ) }
            </div>
          ))
        }
      </div>
    </div>
  );
}

export default ReceitasFavoritas;
