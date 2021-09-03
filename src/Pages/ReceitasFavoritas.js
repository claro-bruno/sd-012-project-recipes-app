import React, { useEffect, useState } from 'react';
import { Redirect } from 'react-router-dom';
import Header from '../Components/Header';
import './ReceitasFavoritas.css';
import FavoriteCards from '../Components/FavoriteCards';

export default function ReceitasFeitas() {
  const [favorites, setFavorites] = useState([]);
  const [favoritesFiltered, setFavoritesFiltered] = useState([]);
  const [canRedirect, setCanRedirect] = useState({ redirect: false, to: '' });

  useEffect(() => {
    const getFavorites = () => {
      const favoritesResults = JSON.parse(localStorage.getItem('favoriteRecipes'));
      if (favoritesResults !== null) {
        setFavorites(favoritesResults);
        setFavoritesFiltered(favoritesResults);
      }
    };

    getFavorites();
  }, []);

  const onFavoriteClick = (id) => {
    const newFavorites = favorites.filter((favorite) => favorite.id !== id);
    localStorage.setItem('favoriteRecipes', JSON.stringify(newFavorites));
    setFavorites(newFavorites);

    const newFilter = favoritesFiltered.filter((favorite) => favorite.id !== id);
    setFavoritesFiltered(newFilter);
  };

  const onFilterClick = ({ target: { name } }) => {
    if (name === 'all') {
      setFavoritesFiltered(favorites);
      return;
    }
    if (name === 'food') {
      const newFilter = favorites.filter((favorite) => (
        favorite.type === 'comida'));

      setFavoritesFiltered(newFilter);
      return;
    }
    // bebida
    const newFilter = favorites.filter((favorite) => favorite.type === 'bebida');
    setFavoritesFiltered(newFilter);
  };

  const handleRedirect = (id, type) => {
    let url = `/bebidas/${id}`;

    if (type === 'comida') {
      url = `/comidas/${id}`;
      setCanRedirect({ redirect: true, to: url });
      return;
    }

    setCanRedirect({ redirect: true, to: url });
  };

  if (canRedirect.redirect) {
    return <Redirect to={ canRedirect.to } />;
  }

  return (
    <section className="main-section">
      <section className="header-section">
        <Header title="Receitas Favoritas" />
      </section>
      <div className="filter-section">
        <button
          className="btn btn-success"
          data-testid="filter-by-all-btn"
          type="button"
          name="all"
          onClick={ onFilterClick }
        >
          All
        </button>
        <button
          className="btn btn-success"
          data-testid="filter-by-food-btn"
          type="button"
          name="food"
          onClick={ onFilterClick }
        >
          Food
        </button>
        <button
          className="btn btn-success"
          data-testid="filter-by-drink-btn"
          type="button"
          name="drink"
          onClick={ onFilterClick }
        >
          Drinks
        </button>
      </div>
      <div className="favorite-section">
        { favoritesFiltered.map((favorite, index) => (
          <FavoriteCards
            key={ favorite.id }
            recipe={ favorite }
            index={ index }
            onFavoriteClick={ onFavoriteClick }
            handleRedirect={ handleRedirect }
          />
        )) }
      </div>
    </section>
  );
}
