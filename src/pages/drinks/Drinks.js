import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { fetchDrinks } from '../../Redux/actions/fetchDrinks';
import fetchDrinksByCategory from '../../Redux/actions/fetchDrinksByCategory';
import fetchDrinksCategories from '../../Redux/actions/fetchDrinksCategories';
import CategoriesFilter from '../../components/CategoriesFilter';
import RecipesList from '../../components/RecipesList';
import Header from '../../components/Header';
import MenuFooter from '../../components/MenuFooter';

class Drinks extends Component {
  constructor(props) {
    super(props);

    this.state = {
      filteredCategory: 'All',
    };

    this.setDrinkCategory = this.setDrinkCategory.bind(this);
    this.filterMealsByCategory = this.filterMealsByCategory.bind(this);
  }

  componentDidMount() {
    const { setDrinks, setDrinksCategories } = this.props;

    setDrinks();
    setDrinksCategories();
  }

  setDrinkCategory(filteredCategory) {
    this.setState({ filteredCategory });
  }

  filterMealsByCategory({ target }) {
    const { setDrinks, setDrinksByCategory } = this.props;
    const { filteredCategory } = this.state;
    const category = target.innerText;

    if (category !== 'All') {
      if (category === filteredCategory) {
        setDrinks();
        this.setDrinkCategory('All');
      } else {
        setDrinksByCategory(category);
        this.setDrinkCategory(category);
      }
    } else {
      setDrinks();
      this.setDrinkCategory(category);
    }
  }

  render() {
    const { drinks, drinksCategories, loading } = this.props;

    return (
      <div>
        <Header title="Bebidas" showSearchBottom />
        {loading
          ? (
            <CategoriesFilter
              categories={ drinksCategories }
              handleClick={ this.filterMealsByCategory }
            />
          )
          : <div>Loading...</div>}
        {
          loading
            ? <RecipesList recipes={ drinks } type="drinks" />
            : <div>Loading...</div>
        }
        <MenuFooter />
      </div>
    );
  }
}

const mapDispatchToProps = (dispatch) => ({
  setDrinksByCategory: (value) => dispatch(fetchDrinksByCategory(value)),
  setDrinksCategories: () => dispatch(fetchDrinksCategories()),
  setDrinks: () => dispatch(fetchDrinks()),
});

const mapStateToProps = (state) => ({
  drinks: state.drinks.drinks,
  drinksCategories: state.drinks.categories,
  loading: state.foods.loading,
});

Drinks.propTypes = {
  setDrinks: PropTypes.func,
  setDrinksCategories: PropTypes.func,
}.isRequired;

export default connect(mapStateToProps, mapDispatchToProps)(Drinks);
