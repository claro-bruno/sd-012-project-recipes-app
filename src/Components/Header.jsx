import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import PerfilIcon from '../images/profileIcon.svg';

function Header({ title }) {
  return (
    <header className="header-container">
      <Link to="/perfil">
        <img data-testid="profile-top-btn" src={ PerfilIcon } alt="perfil" />
      </Link>
      <h2 data-testid="page-title">{ title }</h2>
    </header>
  );
}

Header.propTypes = {
  title: PropTypes.string,
}.isRequired;

export default Header;
