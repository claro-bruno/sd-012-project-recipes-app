import React from 'react';
// import Header from '../Components/Header';
// import ButtonCard from '../Components/ButtonCard';
// import Footer from '../Components/Footer';

function Profile() {
/*
  const getUser = localStorage.getItem('user');
  const user = JSON.parse(getUser);
*/
  return (
    <h1>hi</h1>
  );
/*
  if (getUser === null) {
    return (
      <>
        <Header title="Perfil" />
        <h3
          data-testid="profile-email"
        >
          email@email.com
        </h3>
        <ButtonCard
          page="/receitas-feitas"
          testId="profile-done-btn"
          buttonText="Receitas Feitas"
        />
        <ButtonCard
          page="/receitas-favoritas"
          testId="profile-favorite-btn"
          buttonText="Receitas Favoritas"
        />
        <ButtonCard
          page="/"
          testId="profile-logout-btn"
          onClick={ () => {
            localStorage.removeItem('cocktailsToken', 'mealsToken');
            localStorage.clear();
          } }
          buttonText="Sair"
        />
        <Footer />
      </>
    );
  }

  return (
    <>
      <Header title="Perfil" />
      <h3
        data-testid="profile-email"
      >
        { user.email }
      </h3>
      <ButtonCard
        page="/receitas-feitas"
        testId="profile-done-btn"
        buttonText="Receitas Feitas"
      />
      <ButtonCard
        page="/receitas-favoritas"
        testId="profile-favorite-btn"
        buttonText="Receitas Favoritas"
      />
      <ButtonCard
        page="/"
        testId="profile-logout-btn"
        onClick={ () => {
          localStorage.removeItem('cocktailsToken', 'mealsToken');
          localStorage.clear();
        } }
        buttonText="Sair"
      />
      <Footer />
    </>
  );
  */
}

export default Profile;
