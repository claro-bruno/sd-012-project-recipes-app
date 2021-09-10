import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Header from '../components/Header';
import FilterRecipesMade from '../components/RecipesMade/FilterRecipesMade';
import RecipesFavoriteList from '../components/RecipesFavorite/RecipesFavoriteList';
// import { getLocalStorage } from '../webStorage/favoritesHelpers';
import { fetchStorage, filterFavorite } from '../Redux/actions/storage/getStorage';
// import { initialFavoriteStorage } from '../webStorage/storages';

class RecipesFavorite extends Component {
  constructor(props) {
    super(props);

    this.filterRecipesFavorite = this.filterRecipesFavorite.bind(this);
  }

  filterRecipesFavorite({ target }) {
    const { favoriteStorage, filterRecipes } = this.props;
    const filterType = target.innerText;

    switch (filterType) {
    case 'All':
      return filterRecipes(favoriteStorage);
    case 'Foods':
      // this.setFavoriteRecipes();
      return filterRecipes(favoriteStorage.filter(({ type }) => type === 'comida'));
      // favoritedRecipes: state.favoritedRecipes.filter(({ type }) => type === 'comida'),
    case 'Drinks':
      // this.setFavoriteRecipes();
      return this.setState((state) => ({
        favoritedRecipes: state.favoritedRecipes.filter(({ type }) => type === 'bebida'),
      }));
    default:
      return filterRecipes(favoriteStorage);
    }
  }

  render() {
    const categories = [
      { strCategory: 'food', strName: 'Foods' },
      { strCategory: 'drink', strName: 'Drinks' },
    ];

    const { favoriteStorage } = this.props;

    return (
      <div>
        <Header title="Receitas Favoritas" showSearchBottom={ false } />

        <FilterRecipesMade
          categories={ categories }
          handleClick={ this.filterRecipesFavorite }
        />

        <RecipesFavoriteList recipes={ favoriteStorage } />
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  favoriteStorage: state.storage.favorites,
});

const mapDispatchToProps = (dispatch) => ({
  setStorage: (key, obj) => dispatch(fetchStorage(key, obj)),
  filter: (arr) => dispatch(filterFavorite(arr)),
});

export default connect(mapStateToProps, mapDispatchToProps)(RecipesFavorite);

RecipesFavorite.propTypes = {
  favoriteStorage: PropTypes.arrayOf(PropTypes.object),
  setStorage: PropTypes.func,
  filter: PropTypes.func,
}.isRequired;
