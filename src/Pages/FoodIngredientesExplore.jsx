import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import Header from '../Components/Header';
import Footer from '../Components/Footer';
import { getFoodsApi, changeShowBar } from '../Redux/actions/apiActions';
import mealApi from '../services/GetUrl';

function FoodIngredientesExplore() {
  const [data, setData] = useState([]);
  const dispatch = useDispatch();

  const getIngredient = async () => {
    const END_POINT = 'https://www.themealdb.com/api/json/v1/1/list.php?i=list';
    const response = await fetch(END_POINT);
    const { meals } = await response.json();
    setData(meals);
  };
  useEffect(() => {
    getIngredient();
  }, [setData]);

  const srcImg = (name) => `https://www.themealdb.com/images/ingredients/${name}-Small.png`;

  const MNumber = '12';
  return (
    <>
      <Header title="Explorar Ingredientes" />
      <div className="cards">
        {data
          .slice(0, MNumber)
          .map(({ strIngredient, idIngredient }, index) => (
            <Link
              className="recipe-cards"
              to="/comidas"
              key={ idIngredient }
              id={ idIngredient }
              data-testid={ `${index}-ingredient-card` }
              onClick={ () => {
                dispatch(changeShowBar(true));
                const url = mealApi('ingredient', strIngredient);
                dispatch(getFoodsApi(url));
              } }
            >
              <img
                src={ srcImg(strIngredient) }
                data-testid={ `${index}-card-img` }
                alt={ strIngredient }
              />
              <div>
                <h4
                  data-testid={ `${index}-card-name` }
                >
                  { strIngredient }
                </h4>
              </div>
            </Link>
          ))}
      </div>
      <Footer />
    </>
  );
}

export default FoodIngredientesExplore;
