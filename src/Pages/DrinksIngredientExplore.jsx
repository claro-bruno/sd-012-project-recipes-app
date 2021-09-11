import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { v4 as uuidv4 } from 'uuid';
import Header from '../Components/Header';
import Footer from '../Components/Footer';
import { getDrinksApi, changeShowBar } from '../Redux/actions/apiActions';
import drinkApi from '../services/GetDrinkUrl';

function DrinkIngredientesExplore() {
  const [data, setData] = useState([]);
  const dispatch = useDispatch();

  const getIngredient = async () => {
    const END_POINT = 'https://www.thecocktaildb.com/api/json/v1/1/list.php?i=list';
    const response = await fetch(END_POINT);
    const { drinks } = await response.json();
    setData(drinks);
  };
  useEffect(() => {
    getIngredient();
  }, [setData]);

  const srcImg = (name) => `https://www.thecocktaildb.com/images/ingredients/${name}-Small.png`;

  const MNumber = '12';
  return (
    <>
      <Header title="Explorar Ingredientes" />
      <div className="cards">
        {data
          .slice(0, MNumber)
          .map(({ strIngredient1 }, index) => (
            <Link
              className="recipe-cards"
              to="/bebidas"
              key={ uuidv4() }
              data-testid={ `${index}-ingredient-card` }
              onClick={ () => {
                dispatch(changeShowBar(true));
                const url = drinkApi('ingredient', strIngredient1);
                dispatch(getDrinksApi(url));
              } }
            >
              <img
                src={ srcImg(strIngredient1) }
                data-testid={ `${index}-card-img` }
                alt={ strIngredient1 }
              />
              <div>
                <h4
                  data-testid={ `${index}-card-name` }
                >
                  {strIngredient1}
                </h4>
              </div>
            </Link>
          ))}
      </div>
      <Footer />
    </>
  );
}

export default DrinkIngredientesExplore;
