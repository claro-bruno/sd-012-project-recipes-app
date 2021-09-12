import React from 'react';
import { useHistory } from 'react-router-dom';
import { useSelector } from 'react-redux';
import Spinner from 'react-bootstrap/Spinner';
import { v4 as uuidv4 } from 'uuid';
import Footer from '../Components/Footer';
import RecipeCard from '../Components/RecipeCard';
import FoodHeader from '../Components/FoodHeader';
import './details.css';

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
          {meals.map(({ idMeal, strMealThumb, strMeal }, index) => (
            <RecipeCard
              key={ uuidv4() }
              index={ index }
              id={ idMeal }
              thumbnail={ strMealThumb }
              title={ strMeal }
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
        {mealsBar.map(({ strMealThumb, strMeal }, index) => (
          <RecipeCard
            key={ uuidv4() }
            id={ index }
            index={ index }
            thumbnail={ strMealThumb }
            title={ strMeal }
          />
        ))}
      </section>
      <Footer />
    </div>
  );
}

export default FoodMainPage;
