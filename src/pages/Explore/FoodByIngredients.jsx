import React, { useEffect, useState } from 'react';
import IngredientsCard from './IngredientsCard';
import Header from '../../components/Header';
import Footer from '../../components/Footer';

function ExploreFoodByIngredients() {
  const [ingredients, setIngredients] = useState([]);
  const exploreLimits = 12;

  const fetchIngredients = async () => {
    const endPoint = 'https://www.themealdb.com/api/json/v1/1/list.php?i=list';
    const response = await fetch(endPoint);
    return response.json();
  };

  useEffect(() => {
    fetchIngredients().then((response) => {
      setIngredients(response.meals);
    });
  }, []);

  const headerProps = {
    title: 'Explorar Ingredientes',
    renderSearchBar: false,
  };

  return (
    <div>
      <Header { ...headerProps } />
      <section className="explore-ingredients-list">
        { ingredients.slice(0, exploreLimits).map((ingredient, index) => (
          <IngredientsCard
            key={ index }
            ingredientImg={ ingredient.strIngredient }
            ingredientName={ ingredient.strIngredient }
            index={ index }
            path="themealdb"
          />
        ))}
      </section>
      <p className="gambi" />
      <Footer />
    </div>
  );
}

export default ExploreFoodByIngredients;
