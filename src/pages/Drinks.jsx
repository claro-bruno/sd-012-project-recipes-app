import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchDrinksRedux,
  fetchDrinksCategoriesRedux } from '../redux/actions/foodActions';
import DrinksCards from '../components/DrinksCard';
import CategoryButton from '../components/CategoryButton';

function Drinks() {
  const dispatch = useDispatch();
  const drinksLimits = 12;
  const buttonLimits = 5;

  const drinks = useSelector((state) => state.foodsAndDrinks.drinks);
  const { categories } = useSelector((state) => state.foodsAndDrinks);

  useEffect(() => {
    dispatch(fetchDrinksRedux);
    dispatch(fetchDrinksCategoriesRedux);
  }, [dispatch]);

  if (!drinks) {
    return (
      <h1>Loading</h1>
    );
  }

  return (
    <div>
      { categories.drinks.slice(0, buttonLimits).map(
        (category, id) => CategoryButton(category.strCategory, id),
      )}

      { drinks.slice(0, drinksLimits).map(
        (drink, id) => DrinksCards(
          drink, 'bebidas', id,
        ),
      )}

    </div>
  );
}

export default Drinks;
