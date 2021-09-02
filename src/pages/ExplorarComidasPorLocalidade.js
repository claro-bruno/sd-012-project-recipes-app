import React, { useContext, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Header from '../components/Header/Header';
import MenuInferior from '../components/MenuInferior';
import Context from '../context/Context';
import { fetchMealsArea } from '../services/requestMealsAPI';
import Loading from '../components/Loading';
import Card from '../components/Card';

export default function ExplorarComidasPorLocalidade() {
  const [selectableAreas, setSelectableAreas] = useState([]);
  const [area, setArea] = useState('Canadian');
  const { meals, setMeals, resetFilter } = useContext(Context);
  const amount = 12;

  const getMealsByArea = async () => {
    const slicedMeals = await fetchMealsArea();
    setSelectableAreas(slicedMeals);
  };

  useEffect(() => {
    getMealsByArea();
  }, []);

  useEffect(() => {
    const filterMealsArea = (origem) => {
      const url = `https://www.themealdb.com/api/json/v1/1/filter.php?a=${origem}`;
      return fetch(url)
        .then((res) => res.json())
        .then((data) => {
          const dataMeals = data.meals;
          setMeals(dataMeals.slice(dataMeals, amount));
        });
    };
    const handleFilter = () => (
      area === 'All' ? resetFilter() : filterMealsArea(area)
    );
    handleFilter();
  }, [area, setMeals]);

  if (selectableAreas.length === 0) {
    return <Loading />;
  }

  return (
    <div>
      <Header>
        Explorar Origem
      </Header>
      <div>
        <select
          data-testid="explore-by-area-dropdown"
          onChange={ ({ target: { value } }) => setArea(value) }
        >
          <option data-testid="All-option" value="All">All</option>
          {(selectableAreas !== []) && selectableAreas.map(({ strArea }, index) => (
            <option key={ index } data-testid={ `${strArea}-option` } value={ strArea }>
              {strArea}
            </option>
          ))}
        </select>
      </div>
      <div>
        { (meals !== []) && meals.map((item, index) => (
          <div key={ item.idMeal }>
            <Link to={ `/comidas/${item.idMeal}` }>
              <Card item={ item } index={ index } />
            </Link>
          </div>
        )) }
      </div>
      <MenuInferior />
    </div>
  );
}
