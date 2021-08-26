import React, { useContext, useEffect, useState } from 'react';
import Header from '../../components/Header';
import MenuInferior from '../../components/MenuInferior';
import Recipes from '../../components/Recipes';
import FoodCard from '../../components/FoodCard';
import Context from '../../context/Context';

export default function FoodAreaExp() {
  const { requestAreas, requestFoodByName, requestFoodByAreas } = useContext(Context);
  const [areas, setAreas] = useState([]);
  const [areaLoading, setAreaLoading] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedArea, setSelectedArea] = useState('All');
  const [foods, setFoods] = useState([]);

  useEffect(() => {
    const getAreas = async () => {
      const response = await requestAreas();
      setAreas(response);
      setAreaLoading(false);
    };
    getAreas();
  });

  useEffect(() => {
    const filterSwitch = async () => {
      setAreaLoading(true);
      if (selectedArea === 'All') {
        const response = await requestFoodByName('');
        setFoods(response);
        setLoading(false);
      } else {
        const response = await requestFoodByAreas(selectedArea);
        setFoods(response);
        setLoading(false);
      }
    };
    filterSwitch();
  }, [selectedArea]);

  if (areaLoading) return <p>Loading...</p>;

  const cards = [];
  const maxCards = 12;
  for (let index = 0; index < maxCards; index += 1) {
    if (loading === false) {
      cards.push(<FoodCard meal={ foods[index] } index={ index } />);
    }
  }

  const foodPage = (bool) => {
    if (bool === false) {
      return (
        <div>
          <Header title="Comidas" name="meal" search />
          <select
            data-testid="explore-by-area-dropdown"
            onChange={ ({ target: { value } }) => setSelectedArea(value) }
          >
            <option value="All" data-testid="All-option">All</option>
            {
              areas.map(({ strArea }) => (
                <option
                  key={ `${strArea}-select-option` }
                  data-testid={ `${strArea}-option` }
                >
                  { strArea }
                </option>
              ))
            }
          </select>
          { cards }
          <Recipes />
          <MenuInferior />
        </div>
      );
    }
  };

  return (
    <main>
      { foodPage(loading) }
    </main>
  );
}
