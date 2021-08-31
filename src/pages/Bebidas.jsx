import React, { useEffect, useState, useContext } from 'react';
import Footer from '../components/Footer';
import Header from '../components/Header';
import HookBebidas from '../hooks/HookBebidas';
import CardList from '../components/CardList';
import Categories from '../components/Categories';
import MyContext from '../context/MyContext';
import '../cssPages/Refeicao.css';

function Bebidas() {
  const { filterByIng, renderDrinks, dataDrinks } = useContext(MyContext);
  const [drinkData, setDrinkData] = useState({});
  const [drinkCategories, setDrinkCategories] = useState([]);
  const [drink, loading, categories, setLoading] = HookBebidas();
  const [toggleCategory, setToggleCategory] = useState('');

  useEffect(() => {
    setDrinkData({
      ...drink,
    });
    setDrinkCategories(
      categories.drinks,
    );
  }, [drink, categories]);

  const changeRender = (condition) => {
    if (condition) {
      return (<CardList
        list={ dataDrinks }
        apiType="Drink"
        page="bebidas"
      />);
    }
    return (
      <CardList
        list={ filterByIng ? filterByIng.drinks : drinkData.drinks }
        apiType="Drink"
        page="bebidas"
      />
    );
  };

  return loading
    ? <div>Loading... </div>
    : (
      <>
        <Header titulo="Bebidas" pesquisa="true" />
        <Categories
          type="drink"
          action="filterCategory"
          list={ drinkCategories }
          callback={ setDrinkData }
          setLoading={ setLoading }
          toggle={ toggleCategory }
          toggleCallback={ setToggleCategory }
        />
        {changeRender(renderDrinks)}
        <Footer />
      </>
    );
}

export default Bebidas;
