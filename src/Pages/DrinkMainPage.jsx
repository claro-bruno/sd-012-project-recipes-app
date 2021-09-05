import React from 'react';
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

  console.log(drinksBar.length);
  console.log(drinks.length);

  if (drinks === []) {
    return <Spinner animation="border" variant="danger" />;
  }

  if (showBar === false) {
    return (
      <div className="container">
        <DrinkHeader title="Bebidas" />
        <session className="cards">
          { drinks.map(({ idDrink, strDrinkThumb, strDrink }, key) => (
            <RecipeCard
              key={ idDrink }
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

  if (drinksBar.length === 1) {
    const obj = drinksBar.find((object) => object.idDrink);
    const path = `/bebidas/${obj.idDrink}`;
    push(path);
  }
  return (
    <div className="container">
      <DrinkHeader title="Bebidas" />
      <section className="cards">
        { drinksBar.map((drink) => (
          <RecipeCard
            key={ drink.idDrink }
            id={ drink.key }
            thumbnail={ drink.strDrinkThumb }
            title={ drink.strDrink }
            index={ drink.key }
          />
        ))}
      </section>
      <Footer />
    </div>
  );
}

export default DrinkMainPage;
