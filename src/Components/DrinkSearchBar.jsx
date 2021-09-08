import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { changeDrinkSearch, getDrinksApi } from '../Redux/actions/apiActions';
import drinkApi from '../services/GetDrinkUrl';

function FoodSearchBar() {
  const [param, setParam] = useState({ type: '', entry: '' });
  const [showAlert, setShowAlert] = useState(false);
  const dispatch = useDispatch();

  const handleChange = ({ target }) => setParam(
    (prevState) => ({ ...prevState, type: target.value }),
  );

  const handleShowAlert = async () => {
    const time = 10000;
    setShowAlert(true);
    await setTimeout(() => setShowAlert(false), time);
  };

  return (
    <section className="search-bar">
      { showAlert ? window.alert('Sua busca deve conter somente 1 (um) caracter') : null }
      <input
        type="text"
        data-testid="search-input"
        name="search"
        onChange={ ({ target }) => setParam(
          (prevState) => ({ ...prevState, entry: target.value }),
        ) }
      />
      <label htmlFor="ingredient">
        Ingrediente
        <input
          id="ingredient"
          type="radio"
          value="ingredient"
          name="radio-search"
          data-testid="ingredient-search-radio"
          onChange={ handleChange }
        />
      </label>
      <label htmlFor="name">
        Nome
        <input
          id="name"
          value="name"
          name="radio-search"
          type="radio"
          data-testid="name-search-radio"
          onChange={ handleChange }
        />
      </label>
      <label htmlFor="first-letter">
        Primeira letra
        <input
          id="first-letter"
          value="first-letter"
          name="radio-search"
          type="radio"
          data-testid="first-letter-search-radio"
          onChange={ handleChange }
        />
      </label>
      <button
        data-testid="exec-search-btn"
        type="button"
        className="btn btn-outline-danger btn-sm"
        onClick={ () => {
          if (param.type === 'first-letter' && param.entry.length > 1) {
            handleShowAlert();
          }
          dispatch(changeDrinkSearch(param));
          const drinkUrl = drinkApi(param.type, param.entry);
          dispatch(getDrinksApi(drinkUrl));
          setParam((prevState) => ({ ...prevState, type: '', entry: '' }));
        } }
      >
        Buscar
      </button>
    </section>
  );
}

export default FoodSearchBar;
