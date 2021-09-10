import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { changeFoodSearch, getFoodsApi } from '../Redux/actions/apiActions';
import mealApi from '../services/GetUrl';

function FoodSearchBar() {
  const [search, setSearch] = useState({ type: '', entry: '' });
  const [showAlert, setShowAlert] = useState(false);
  const dispatch = useDispatch();

  const handleChange = ({ target }) => setSearch(
    (prevState) => ({ ...prevState, type: target.value }),
  );

  const handleShowAlert = async () => {
    const time = 2000;
    setShowAlert(true);
    await setTimeout(() => setShowAlert(false), time);
  };

  return (
    <section className="search-bar">
      { showAlert ? global.alert('Sua busca deve conter somente 1 (um) caracter') : null }
      <input
        type="text"
        data-testid="search-input"
        name="search"
        onChange={ ({ target }) => setSearch(
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
          if (search.type === 'first-letter' && search.entry.length > 1) {
            handleShowAlert();
          }
          dispatch(changeFoodSearch(search));
          const url = mealApi(search.type, search.entry);
          dispatch(getFoodsApi(url));
          setSearch((prevState) => ({ ...prevState, type: '', entry: '' }));
        } }
      >
        Buscar
      </button>
    </section>
  );
}

export default FoodSearchBar;
