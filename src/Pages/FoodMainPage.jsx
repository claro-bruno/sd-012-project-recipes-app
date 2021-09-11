import React from 'react';
import { v4 as uuidv4 } from 'uuid';
import { useHistory } from 'react-router-dom';
import { useSelector } from 'react-redux';
import Spinner from 'react-bootstrap/Spinner';
import Footer from '../Components/Footer';
import RecipeCard from '../Components/RecipeCard';
import FoodHeader from '../Components/FoodHeader';
import '../styles/MainPages.css';

function FoodMainPage() {
  const { meals } = useSelector((state) => state.foodcategories);
  const { mealsBar, showBar } = useSelector((state) => state.mainPage);
  const { push } = useHistory();

  if (meals === []) {
    return (
      <Spinner animation="grow" variant="danger" />
    );
  }

  if (showBar === false) {
    return (
      <div className="container">
        <FoodHeader title="Comidas" />
        <section className="cards">
          {meals.map(({ idMeal, strMealThumb, strMeal }, key) => (
            <RecipeCard
              key={ uuidv4() }
              id={ idMeal }
              thumbnail={ strMealThumb }
              title={ strMeal }
              index={ key }
            />
          ))}
        </section>
        <Footer />
      </div>
    );
  }

  if (mealsBar === null) {
    return (
      global.alert('Sinto muito, não encontramos nenhuma receita para esses filtros.'));
  }

  if (mealsBar.length === 1) {
    const obj = mealsBar.find((object) => object.idMeal);
    const path = `/comidas/${obj.idMeal}`;
    push(path);
  }

  return (
    <div className="container">
      <FoodHeader title="Comidas" />
      <section className="cards">
        {mealsBar.map(({ idMeal, strMealThumb, strMeal }, key) => (
          <RecipeCard
            key={ idMeal }
            id={ key }
            thumbnail={ strMealThumb }
            title={ strMeal }
            index={ key }
          />
        ))}
      </section>
      <Footer />
    </div>
  );
}

export default FoodMainPage;
