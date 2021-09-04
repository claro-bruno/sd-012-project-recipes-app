import React, { Component } from 'react';
import PropTypes from 'prop-types';
import WhiteHeartIcon from '../images/whiteHeartIcon.svg';
import BlackHeartIcon from '../images/blackHeartIcon.svg';
import {
  getLocalStorage,
  addLocalStorage,
  removeItem,
  addItem,
} from '../webStorage/favoritesHelpers';

class FavoriteButton extends Component {
  constructor(props) {
    super(props);

    this.state = {
      favorito: false,
    };

    this.handleClick = this.handleClick.bind(this);
    this.setFavorite = this.setFavorite.bind(this);
    this.makeStorageObject = this.makeStorageObject.bind(this);
  }

  componentDidMount() {
    const { id } = this.props;
    this.setFavorite(id);
  }

  handleClick() {
    const favoriteObject = this.makeStorageObject();
    const { favorito } = this.state;
    const { id } = this.props;

    const favoriteStorage = getLocalStorage();
    const { favoriteRecipes } = favoriteStorage;

    if (favorito) {
      removeItem(favoriteRecipes, id);
      this.setState({ favorito: false });
    }

    if (!favorito) {
      const newFavorites = addItem(favoriteRecipes, favoriteObject);

      addLocalStorage('favoriteRecipes', newFavorites);

      this.setState({ favorito: true });
    }
  }

  setFavorite(recipeId) {
    const favoriteStorage = getLocalStorage();
    const { favoriteRecipes } = favoriteStorage;
    const checkFavorite = () => (
      favoriteRecipes.some(({ id }) => id === recipeId)
    );

    this.setState({ favorito: checkFavorite() });
  }

  makeStorageObject() {
    const {
      id,
      type,
      area,
      category,
      alcoholicOrNot,
      name,
      image,
    } = this.props;

    return {
      id,
      type,
      area,
      category,
      alcoholicOrNot,
      name,
      image,
    };
  }

  render() {
    const { favorito } = this.state;
    const { position } = this.props;

    return (
      <button
        type="button"
        className="share-fill"
        onClick={ this.handleClick }
      >
        <img
          src={ favorito ? BlackHeartIcon : WhiteHeartIcon }
          alt="favorite button"
          data-testid={ `${position}-horizontal-favorite-btn` }
        />
      </button>
    );
  }
}

export default FavoriteButton;

FavoriteButton.propTypes = {
  index: PropTypes.number,
}.isRequired;
