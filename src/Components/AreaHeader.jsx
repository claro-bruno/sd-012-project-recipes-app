import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { useDispatch, useSelector } from 'react-redux';
import profileIcon from '../images/profileIcon.svg';
import searchIcon from '../images/searchIcon.svg';
import FoodSearchBar from './FoodSearchBar';
import { changeShowBar, getFoodsApi } from '../Redux/actions/apiActions';
import mealApi from '../services/GetUrl';

function AreaHeader({ title }) {
  const { showBar, foodSearch: { type, entry } } = useSelector((state) => state.mainPage);

  const dispatch = useDispatch();

  const handleClick = () => {
    dispatch(changeShowBar(!showBar));
    const url = mealApi(type, entry);
    dispatch(getFoodsApi(url));
  };

  if (showBar === false) {
    return (
      <section className="fixing">
        <header className="header-container">
          <Link to="/perfil">
            <button type="button">
              <img
                data-testid="profile-top-btn"
                src={ profileIcon }
                alt="profile"
              />
            </button>
          </Link>
          <h2 data-testid="page-title">{ title }</h2>
          <button
            src={ searchIcon }
            className="header-button"
            type="button"
            data-testid="search-top-btn"
            onClick={ handleClick }
          >
            <img src={ searchIcon } alt="search icon" />
          </button>
        </header>
      </section>
    );
  }

  return (
    <section className="fixing">
      <header className="header-container">
        <Link to="/perfil">
          <button type="button">
            <img
              data-testid="profile-top-btn"
              src={ profileIcon }
              alt="profile"
            />
          </button>
        </Link>
        <h2 data-testid="page-title">{ title }</h2>
        <button
          src={ searchIcon }
          className="header-button"
          type="button"
          data-testid="search-top-btn"
          onClick={ handleClick }
        >
          <img src={ searchIcon } alt="search icon" />
        </button>
      </header>
      <FoodSearchBar />
    </section>
  );
}

AreaHeader.propTypes = {
  title: PropTypes.string,
}.isRequired;

export default AreaHeader;
