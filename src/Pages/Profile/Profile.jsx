import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import Btn from '../../Components/Btn';
import BottomMenu from '../../Components/Footer/BottomMenu';
import { ContextApp } from '../../Context/ContextApp';
import Header from '../../Components/Header/index';
import './Profile.css';

function Profile() {
  const getUser = JSON.parse(localStorage.getItem('user'));
  const email = getUser ? getUser.email : 'email não encontrado';

  const { setRedirect } = useContext(ContextApp);

  const clearUser = () => {
    localStorage.clear();
    setRedirect(false);
  };

  const logOutProps = {
    name: 'Sair',
    'data-testid': 'profile-logout-btn',
    type: 'button',
    variant: 'contained',
    onClick: clearUser,
  };

  const favoriteProps = {
    name: 'Receitas Favoritas',
    'data-testid': 'profile-favorite-btn',
    type: 'button',
    variant: 'contained',
  };

  const doneProps = {
    name: 'Receitas Feitas',
    'data-testid': 'profile-done-btn',
    type: 'button',
    variant: 'contained',
  };

  return (
    <div className="profile-page">
      <Header
        title="Perfil"
        searchButton={ false }
      />
      <div className="user-name">
        <h3 data-testid="profile-email">
          {email}
        </h3>
      </div>
      <section className="profile-buttons">
        <Link to="/receitas-feitas">
          <Btn { ...doneProps } />
        </Link>
        <Link to="/receitas-favoritas">
          <Btn { ...favoriteProps } />
        </Link>
        <Link to="/">
          <Btn { ...logOutProps } />
        </Link>
      </section>
      <BottomMenu />
    </div>
  );
}

export default Profile;
