import React, { Component } from 'react';
import FilterRecipesMade from '../components/RecipesMade/FilterRecipesMade';
import Header from '../components/Header';
import RecipesFavoriteList from '../components/RecipesFavorite/RecipesFavoriteList';

class RecipesFavorite extends Component {
  constructor(props) {
    super(props);

    this.filterRecipesFavorite = this.filterRecipesFavorite.bind(this);
  }

  filterRecipesFavorite({ target }) {
    const filterType = target.innerText;

    switch (filterType) {
    case 'All':
      return this.setFavoriteRecipes();
    case 'Foods':
      this.setFavoriteRecipes();
      return this.setState((state) => ({
        favoritedRecipes: state.favoritedRecipes.filter(({ type }) => type === 'comida'),
      }));
    case 'Drinks':
      this.setFavoriteRecipes();
      return this.setState((state) => ({
        favoritedRecipes: state.favoritedRecipes.filter(({ type }) => type === 'bebida'),
      }));
    default:
      return this.setFavoriteRecipes();
    }
  }

  render() {
    const categories = [
      { strCategory: 'food', strName: 'Foods' },
      { strCategory: 'drink', strName: 'Drinks' },
    ];

    return (
      <div>
        <Header title="Receitas Favoritas" showSearchBottom={ false } />
        <FilterRecipesMade
          categories={ categories }
          handleClick={ this.filterRecipesFavorite }
        />
        <RecipesFavoriteList />
      </div>
    );
  }
}

export default RecipesFavorite;
