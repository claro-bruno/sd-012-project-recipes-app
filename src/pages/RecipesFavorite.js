import React, { Component } from 'react';
import FilterRecipesMade from '../components/FilterRecipesMade';
import RecipesFavoriteList from '../components/RecipesFavoriteList';
import initialFavoriteStorage from '../webStorage/storages';

class RecipesFavorite extends Component {
  constructor(props) {
    super(props);

    this.state = {
      favoritedRecipes: [],
    };

    this.setFavoriteRecipes = this.setFavoriteRecipes.bind(this);
    this.filterRecipesFavorite = this.filterRecipesFavorite.bind(this);
  }

  componentDidMount() {
    this.setFavoriteRecipes();
  }

  setFavoriteRecipes() {
    const { favoriteRecipes } = initialFavoriteStorage;
    const favoriteStorage = JSON.parse(localStorage.getItem('favoriteRecipes'));

    if (favoriteStorage === null) {
      localStorage.setItem(
        'favoriteRecipes',
        JSON.stringify(initialFavoriteStorage),
      );

      this.setState({ favoritedRecipes: favoriteRecipes });
    } else {
      this.setState({ favoritedRecipes: favoriteStorage.favoriteRecipes });
    }
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

    const { favoritedRecipes } = this.state;

    return (
      <div>
        <FilterRecipesMade
          categories={ categories }
          handleClick={ this.filterRecipesFavorite }
        />
        <RecipesFavoriteList recipes={ favoritedRecipes } />
      </div>
    );
  }
}

export default RecipesFavorite;
