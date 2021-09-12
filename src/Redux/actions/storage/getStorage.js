import {
  GET_STORAGE,
  GET_STORAGE_SUCCESS,
  GET_STORAGE_ERROR,
  FILTER_FAVORITES_FOOD,
  ADD_FAVORITE_ITEM,
  REMOVE_FAVORITE_ITEM,
  ENABLE_BUTTON,
} from '../actionTypes';

const getStorage = () => ({
  type: GET_STORAGE,
});

const getStorageSuccess = (storage) => ({
  type: GET_STORAGE_SUCCESS,
  payload: storage,
});

const getStorageError = (error) => ({
  type: GET_STORAGE_ERROR,
  payload: error,
});

export const filterFavorite = (favorites) => ({
  type: FILTER_FAVORITES_FOOD,
  payload: favorites,
});

export const addFavoriteItem = (item) => ({
  type: ADD_FAVORITE_ITEM,
  payload: item,
});

export const removeFavoriteItem = (id) => ({
  type: REMOVE_FAVORITE_ITEM,
  payload: id,
});

export const fetchStorage = (storageKey, initialStorage) => async (dispatch) => {
  dispatch(getStorage);

  let storage = await JSON.parse(localStorage.getItem(storageKey));

  if (storage === null) {
    await localStorage.setItem(storageKey, JSON.stringify(initialStorage));

    storage = await JSON.parse(localStorage.getItem(storageKey));
  }

  try {
    dispatch(getStorageSuccess(storage));
  } catch (error) {
    dispatch(getStorageError(error));
  }
};

export const checkEnableButton = (bool) => ({
  type: ENABLE_BUTTON,
  payload: bool,
});
