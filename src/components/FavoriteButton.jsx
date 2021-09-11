import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import WhiteHeartIcon from '../images/whiteHeartIcon.svg';
import BlackHeartIcon from '../images/blackHeartIcon.svg';
import {
  addLocalStorage,
  removeItem,
  addItem,
} from '../webStorage/favoritesHelpers';
import {
  addFavoriteItem,
  fetchStorage,
  removeFavoriteItem,
} from '../Redux/actions/storage/getStorage';
import { initialFavoriteStorage } from '../webStorage/storages';

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

  async componentDidMount() {
    const { id, setStorage } = this.props;

    await setStorage('favoriteRecipes', initialFavoriteStorage);
    this.setFavorite(id);
  }

  handleClick() {
    const favoriteObject = this.makeStorageObject();
    const { favorito } = this.state;
    const {
      id,
      favoriteStorage,
      addFavorite,
      removeFavorite,
    } = this.props;

    if (favorito) {
      removeItem(favoriteStorage, id);
      removeFavorite(id);
      this.setState({ favorito: false });
    }

    if (!favorito) {
      const newFavorites = addItem(favoriteStorage, favoriteObject);
      addLocalStorage('favoriteRecipes', newFavorites);
      addFavorite(favoriteObject);
      this.setState({ favorito: true });
    }
  }

  setFavorite(recipeId) {
    const { favoriteStorage } = this.props;

    const checkFavorite = () => (
      favoriteStorage.some(({ id }) => id === recipeId)
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
    const { position, tag } = this.props;

    return (
      <button
        type="button"
        className="share-fill"
        onClick={ this.handleClick }
      >
        <img
          src={ favorito ? BlackHeartIcon : WhiteHeartIcon }
          alt="favorite button"
          data-testid={
            tag === 'recipe-detail'
              ? 'favorite-btn'
              : `${position}-horizontal-favorite-btn`
          }
        />
      </button>
    );
  }
}

const mapStateToProps = (state) => ({
  favoriteStorage: state.storage.favorites,
});

const mapDispatchToProps = (dispatch) => ({
  setStorage: (key, obj) => dispatch(fetchStorage(key, obj)),
  addFavorite: (obj) => dispatch(addFavoriteItem(obj)),
  removeFavorite: (id) => dispatch(removeFavoriteItem(id)),
});

export default connect(mapStateToProps, mapDispatchToProps)(FavoriteButton);

FavoriteButton.propTypes = {
  index: PropTypes.number,
}.isRequired;
