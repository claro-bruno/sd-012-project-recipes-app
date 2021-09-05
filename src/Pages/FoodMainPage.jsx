import React from 'react';
import { useHistory } from 'react-router-dom';
import { useSelector } from 'react-redux';
import Alert from 'react-bootstrap/Alert';
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
      <Alert variant="danger">
        Sinto muito, não encontramos nenhuma receita para esses filtros.
      </Alert>);
  }

  if (showBar === false) {
    if (meals.length === 1) {
      const obj = meals.find((object) => object.idMeal);
      const path = `/comidas/${obj.idMeal}`;
      push(path);
    }
    return (
      <div className="container">
        <FoodHeader title="Comidas" />
        <section className="cards">
          { meals.map(({ idMeal, strMealThumb, strMeal }, key) => (
            <RecipeCard
              key={ idMeal }
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

  if (mealsBar.length === 1) {
    const obj = mealsBar.find((object) => object.idMeal);
    const path = `/comidas/${obj.idMeal}`;
    push(path);
  }

  if (mealsBar === []) {
    return (
      <Alert variant="danger">
        Sinto muito, não encontramos nenhuma receita para esses filtros.
      </Alert>);
  }
  return (
    <div className="container">
      <FoodHeader title="Comidas" />
      <section className="cards">
        { mealsBar.map((meal) => (
          <RecipeCard
            key={ meal.idMeal }
            id={ meal.key }
            thumbnail={ meal.strMealThumb }
            title={ meal.strMeal }
            index={ meal.key }
          />
        ))}
      </section>
      <Footer />
    </div>
  );
}

export default FoodMainPage;
