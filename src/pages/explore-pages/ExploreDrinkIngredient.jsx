import React, { useContext } from 'react';
import Header from '../../components/Header';
import myContext from '../../context/myContext';
import '../../styles/Header.css';
import Footer from '../../components/Footer';
import '../../styles/Footer.css';

function ExploreDrinkIngredient() {
  const doze = 12;
  const { drinkIngredients } = useContext(myContext);
  return (
    <div>
      <Header brand="Explorar Ingredientes" className="img-search" />
      {
        drinkIngredients && drinkIngredients.map((ingredient, index) => index < doze && (
          <div
            key={ index }
            className="div-card"
            data-testid={ `${index}-ingredient-card` }
          >
            <button type="button" className="section-card">
              <p
                className="card-title"
                data-testid={ `${index}-card-name` }
              >
                { ingredient.strIngredient1 }
              </p>
              <img
                className="card-img"
                src={ `https://www.thecocktaildb.com/images/ingredients/${ingredient.strIngredient1}-Small.png` }
                alt=""
                data-testid={ `${index}-card-img` }
              />
            </button>
          </div>
        ))
      }
      <Footer />
    </div>
  );
}

export default ExploreDrinkIngredient;
