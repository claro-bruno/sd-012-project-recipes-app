import React, { useEffect, useState, useContext } from 'react';
import Card from 'react-bootstrap/Card';
import { Redirect } from 'react-router-dom';
import Footer from '../components/Footer';
import Header from '../components/Header';
import '../cssPages/Ingredients.css';
import fetchFoods from '../fetchs/FetchFood';
import MyContext from '../context/MyContext';

function ComidaIng() {
  const { setFilterByIng } = useContext(MyContext);
  const [ingredients, setIngredients] = useState();
  const [redirect, setRedirect] = useState({
    redirect: false,
  });
  const getIngredients = async () => {
    const list = await fetchFoods('food', 'ingredients');
    const { meals } = list;
    const limitator = 12;
    const foods = meals.filter((food, index) => index < limitator);
    setIngredients(foods);
  };

  const getFoodById = async (ingredient) => {
    const list = await fetchFoods('food', 'filterIngredient', ingredient);
    setFilterByIng({
      ...list,
    });
  };

  function onClick(event) {
    const { name } = event.target;
    setRedirect({
      redirect: true,
    });
    getFoodById(name);
  }

  useEffect(() => {
    getIngredients();
  }, []);

  if (redirect.redirect) return <Redirect to="/comidas" />;
  if (!ingredients) return <p>Loading...</p>;
  return (
    <div>
      <Header titulo="Explorar Ingredientes" />
      <main className="div">
        { ingredients.map(({ strIngredient }, index) => (
          <Card
            data-testid={ `${index}-ingredient-card` }
            style={ { width: '18rem' } }
            name={ strIngredient }
            key={ index }
            onClick={ onClick }
          >
            <Card.Img
              data-testid={ `${index}-card-img` }
              variant="top"
              name={ strIngredient }
              src={ `https://www.themealdb.com/images/ingredients/${strIngredient}-Small.png` }
            />
            <Card.Body>
              <Card.Title
                data-testid={ `${index}-card-name` }
                name={ strIngredient }
              >
                { strIngredient }
              </Card.Title>
            </Card.Body>
          </Card>
        )) }
      </main>
      <Footer />
    </div>
  );
}

export default ComidaIng;
