import React from 'react';
import { v4 as uuidv4 } from 'uuid';
import { useHistory } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { Spinner } from 'react-bootstrap';
import Footer from '../Components/Footer';
import DrinkHeader from '../Components/DrinkHeader';
import RecipeCard from '../Components/RecipeCard';
import '../styles/MainPages.css';

function DrinkMainPage() {
  const { drinks } = useSelector((state) => state.drinksReducer);
  const { drinksBar, showBar } = useSelector((state) => state.mainPage);
  const { push } = useHistory();

  if (drinks === []) {
    return <Spinner animation="border" variant="danger" />;
  }

  if (showBar === false) {
    return (
      <div className="container">
        <DrinkHeader title="Bebidas" />
        <session className="cards">
          {drinks.map(({ idDrink, strDrinkThumb, strDrink }, key) => (
            <RecipeCard
              key={ uuidv4() }
              id={ idDrink }
              thumbnail={ strDrinkThumb }
              title={ strDrink }
              index={ key }
            />
          ))}
        </session>
        <Footer />
      </div>
    );
  }

  if (drinksBar === null) {
    return (
      // eslint-disable-next-line no-alert
      window.alert('Sinto muito, não encontramos nenhuma receita para esses filtros.'));
  }

  if (drinksBar.length === 1) {
    const obj = drinksBar.find((object) => object.idDrink);
    const path = `/bebidas/${obj.idDrink}`;
    push(path);
  }
  return (
    <div className="container">
      <DrinkHeader title="Bebidas" />
      <section className="cards">
        {drinksBar.map(({ strDrinkThumb, strDrink }, key) => (
          <RecipeCard
            key={ uuidv4() }
            id={ key }
            thumbnail={ strDrinkThumb }
            title={ strDrink }
            index={ key }
          />
        ))}
      </section>
      <Footer />
    </div>
  );
}

export default DrinkMainPage;
