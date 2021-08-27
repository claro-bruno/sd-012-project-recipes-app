import React, { useEffect, useState } from 'react';
import Footer from '../components/Footer';
import Header from '../components/Header';
import '../cssPages/Explore.css';
import fetchFoods from '../fetchs/FetchFood';
import CardList from '../components/CardList';

function LocalDeOrigem() {
  const [area, setArea] = useState([]);
  const [receitas, setReceitas] = useState();
  const [areaSelected, setAreaSelected] = useState({
    selected: 'All',
  });

  const getLocalOrigem = async () => {
    const list = await fetchFoods('food', 'area');
    const { meals } = list;
    const all = { strArea: 'All' };
    setArea([all, ...meals]);
    const receitasList = await fetchFoods('food', 'procuraComida');
    setReceitas([...receitasList.meals]);
  };

  useEffect(() => {
    getLocalOrigem();
  }, []);

  useEffect(() => {
    const getReceitas = async () => {
      if (areaSelected.selected === 'All') {
        const list = await fetchFoods('food', 'procuraComida');
        const { meals } = list;
        setReceitas([...meals]);
      } else {
        const list = await fetchFoods('food', 'filterByArea', areaSelected.selected);
        const { meals } = list;
        setReceitas([...meals]);
      }
    };
    getReceitas();
  }, [areaSelected]);

  function handleChange(event) {
    const { value } = event.target;
    setAreaSelected({
      selected: value,
    });
  }

  if (!area) return <p>Loading...</p>;
  return (
    <div>
      <Header titulo="Explorar Origem" pesquisa="true" />
      <main className="origem">
        <select
          className="select-area"
          data-testid="explore-by-area-dropdown"
          onChange={ handleChange }
        >
          { area.map(({ strArea }, index) => (
            <option
              data-testid={ `${strArea}-option` }
              value={ strArea }
              key={ index }
            >
              { strArea }
            </option>
          ))}
        </select>
        <CardList
          list={ receitas }
          apiType="Meal"
          page="comidas"
        />
      </main>
      <Footer />
    </div>
  );
}

export default LocalDeOrigem;
