import React, { useState } from 'react';
import PropTypes from 'prop-types';
import './componentCSS/HeaderFood.css';
import SearchBar from './SearchBar';
import searchIcon from '../images/searchIcon.svg';
import SubHeader from './SubHeader';

export default function Header({ title }) {
  const [search, setSearch] = useState(false);
  const showSearch = () => setSearch(!search);

  return (
    <header className="header-food">
      {
        search ? <SearchBar title={ title } />
          : <SubHeader title={ title } />
      }

      <button
        type="button"
        className="search-btn"
        onClick={ showSearch }
        data-testid="search-top-btn"
      >
        <img
          alt="button-icon"
          src={ searchIcon }
        />
      </button>
    </header>
  );
}

Header.propTypes = {
  title: PropTypes.string.isRequired,
};
