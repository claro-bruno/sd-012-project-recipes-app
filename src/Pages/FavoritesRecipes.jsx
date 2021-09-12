import React, { useState, useEffect } from 'react';
import { v4 as uuidv4 } from 'uuid';
// import DoneRecipesCard from '../Components/DoneRecipeCard';
import Alert from 'react-bootstrap/Alert';
import { Link } from 'react-router-dom';
import Header from '../Components/Header';
import shareIcon from '../images/shareIcon.svg';
import BlackHeart from '../images/blackHeartIcon.svg';

function FavoritesRecipes() {
  const [show, setShow] = useState(false);
  const [recipes, setRecipe] = useState([]);
  const [filterFood, setFilterFood] = useState([]);

  useEffect(() => {
    function getFavRecipe() {
      const favoritRecipes = JSON.parse(localStorage.getItem('favoriteRecipes'));
      if (favoritRecipes) {
        setRecipe(favoritRecipes);
        setFilterFood(favoritRecipes);
      }
    }
    getFavRecipe();
  }, []);

  const foodFilterBtn = (filtro) => {
    setFilterFood(recipes.filter(({ type }) => type === filtro));
  };

  const titleTopText = (recipe) => {
    if (recipe.type === 'comida') {
      return `${recipe.area} - ${recipe.category}`;
    } return `${recipe.alcoholicOrNot}`;
  };

  const handleShare = async (id) => {
    const time = 2000;
    const URL = `http://localhost:3000/comidas/${id}`;
    navigator.clipboard.writeText(URL);
    setShow(true);
    await setTimeout(() => setShow(false), time);
  };

  console.log('filterFood', filterFood);
  console.log('recipes', recipes);

  if (filterFood === undefined) {
    return <h1>Loading</h1>;
  }

  const handleFavoriteClick = (id) => {
    const favoriteRecipes = JSON.parse(localStorage.getItem('favoriteRecipes'));
    const removeFav = favoriteRecipes.filter((each) => each.id !== id);
    localStorage.setItem('favoriteRecipes', JSON.stringify(removeFav));
  };

  return (
    <div>
      <Header title="Receitas Favoritas" />
      <button
        type="button"
        data-testid="filter-by-all-btn"
        onClick={ () => setFilterFood(recipes) }
      >
        All
      </button>
      <button
        type="button"
        data-testid="filter-by-food-btn"
        onClick={ () => foodFilterBtn('comida') }
      >
        Food
      </button>
      <button
        type="button"
        data-testid="filter-by-drink-btn"
        onClick={ () => foodFilterBtn('bebida') }
      >
        Drinks
      </button>
      {
        recipes.map((recipe, index) => (
          <div
            key={ uuidv4() }
          >
            <Link
              to={ `/comidas/${recipe.id}` }
            >
              <img
                src={ recipe.image }
                data-testid={ `${index}-horizontal-image` }
                alt={ recipe.name }
              />
            </Link>

            <p
              data-testid={ `${index}-horizontal-top-text` }
            >
              { titleTopText(recipe) }
            </p>

            <Link to={ `/bebidas/${recipe.id}` }>
              <h2
                data-testid={ `${index}-horizontal-name` }
              >
                { recipe.name }
              </h2>
            </Link>

            <p
              data-testid={ `${index}-horizontal-done-date` }
            >
              { recipe.doneDate }
            </p>

            <button
              type="button"
              onClick={ () => handleShare(recipe.id) }
            >
              <img
                src={ shareIcon }
                data-testid={ `${index}-horizontal-share-btn` }
                alt="shareImage"
              />
            </button>
            { show ? <Alert>Link copiado!</Alert> : null }

            <button
              onClick={ () => handleFavoriteClick(recipe.id) }
              type="button"
            >
              <img
                data-testid={ `${index}-horizontal-favorite-btn` }
                src={ BlackHeart }
                alt="favorite"
              />
            </button>

          </div>
        ))
      }
    </div>

  );
}

export default FavoritesRecipes;
