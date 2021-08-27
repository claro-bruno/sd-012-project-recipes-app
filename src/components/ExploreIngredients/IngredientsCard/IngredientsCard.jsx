import React from 'react';
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { requestByIngredient } from '../../../redux/actions/fetchActions';
import { changeFilterType } from '../../../redux/actions/filterAction';

function IngredientsCard({ name, i, image, path }) {
  const dispatch = useDispatch();
  function handleClick() {
    dispatch(changeFilterType('explore'));
    if (path === '/explorar/comidas/ingredientes') {
      dispatch(requestByIngredient(name, '/comidas'));
    } else {
      dispatch(requestByIngredient(name, '/bebidas'));
    }
  }
  function pathCheck(pathname) {
    if (pathname === '/explorar/comidas/ingredientes') {
      return ('/comidas');
    }
    return ('/bebidas');
  }
  return (
    <Link to={ pathCheck(path) } onClick={ handleClick }>
      <div data-testid={ `${i}-ingredient-card` }>
        <img src={ image } alt={ name } data-testid={ `${i}-card-img` } />
        <h3 data-testid={ `${i}-card-name` }>{ name }</h3>
      </div>
    </Link>
  );
}

IngredientsCard.propTypes = {
  name: PropTypes.string.isRequired,
  i: PropTypes.number.isRequired,
  image: PropTypes.string.isRequired,
  path: PropTypes.string.isRequired,
};

export default IngredientsCard;
