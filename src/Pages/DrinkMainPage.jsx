import React from 'react';
import { v4 as uuidv4 } from 'uuid';
import { useHistory } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { Spinner } from 'react-bootstrap';
import DrinkHeader from '../Components/DrinkHeader';
import RecipeCard from '../Components/RecipeCard';
import Footer from '../Components/Footer';
// import '../styles/MainPages.css';

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
        <section className="cards">
          {drinks.map(({ idDrink, strDrinkThumb, strDrink }, index) => (
            <RecipeCard
              key={ uuidv4() }
              id={ idDrink }
              index={ index }
              thumbnail={ strDrinkThumb }
              title={ strDrink }
            />
          ))}
        </section>
        <Footer />
      </div>
    );
  }

  if (drinksBar === null) {
    return (
      global.alert('Sinto muito, não encontramos nenhuma receita para esses filtros.'));
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
        {drinksBar.map(({ strDrinkThumb, strDrink }, index) => (
          <RecipeCard
            key={ uuidv4() }
            id={ strDrink }
            index={ index }
            thumbnail={ strDrinkThumb }
            title={ strDrink }
          />
        ))}
      </section>
      <Footer />
    </div>
  );
}

export default DrinkMainPage;
