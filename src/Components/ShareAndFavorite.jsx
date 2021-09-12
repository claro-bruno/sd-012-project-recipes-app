import React, { useState, useEffect } from 'react';
import Alert from 'react-bootstrap/Alert';
import { string, objectOf } from 'prop-types';
import whiteHeartIcon from '../images/whiteHeartIcon.svg';
import blackHeartIcon from '../images/blackHeartIcon.svg';
import shareIcon from '../images/shareIcon.svg';
import favoriteRecipes from '../helper/setLocalStorage';
import { verificationIsFavorite } from '../helper/requiredDetails';

function ShareAndFavorite({ recipe, type, id }) {
  const [isFavorite, setIsFavorite] = useState(false);
  const [show, setShow] = useState(false);

  useEffect(() => {
    let bool;
    if (type === 'comida') {
      bool = verificationIsFavorite(recipe.idMeal);
    } else {
      bool = verificationIsFavorite(recipe.idDrink);
    }
    setIsFavorite(bool);
  }, [recipe, type]);

  const handleFavorite = () => {
    if (recipe.idMeal) {
      const favorite = {
        id: recipe.idMeal,
        type,
        area: recipe.strArea,
        category: recipe.strCategory,
        alcoholicOrNot: '',
        name: recipe.strMeal,
        image: recipe.strMealThumb,
      };
      setIsFavorite(favoriteRecipes(favorite));
    } else {
      const favorite = {
        id: recipe.idDrink,
        type,
        area: '',
        category: recipe.strCategory,
        alcoholicOrNot: recipe.strAlcoholic,
        name: recipe.strDrink,
        image: recipe.strDrinkThumb,
      };
      setIsFavorite(favoriteRecipes(favorite));
    }
  };

  const handleShare = async () => {
    const time = 900000;
    if (type === 'comida') {
      navigator.clipboard.writeText(`http://localhost:3000/comidas/${id}`);
    } else {
      navigator.clipboard.writeText(`http://localhost:3000/bebidas/${id}`);
    }
    setShow(true);
    await setTimeout(() => setShow(false), time);
  };

  return (
    <>
      <input
        type="image"
        onClick={ handleShare }
        src={ shareIcon }
        data-testid="share-btn"
        alt="To share"
      />
      <input
        type="image"
        onClick={ handleFavorite }
        src={ isFavorite ? blackHeartIcon : whiteHeartIcon }
        alt="Favorite"
        data-testid="favorite-btn"
      />
      <Alert show={ show }>
        Link copiado!
      </Alert>
    </>
  );
}
ShareAndFavorite.defaultProps = {
  id: '',
};
ShareAndFavorite.propTypes = {
  recipe: objectOf(string).isRequired,
  type: string.isRequired,
  id: string,
};

export default ShareAndFavorite;
