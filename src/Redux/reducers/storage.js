import {
  GET_STORAGE,
  GET_STORAGE_SUCCESS,
  GET_STORAGE_ERROR,
  FILTER_FAVORITES_FOOD,
  ADD_FAVORITE_ITEM,
  REMOVE_FAVORITE_ITEM,
} from '../actions/actionTypes';

const INITIAL_STATE = {
  loading: false,
  favorites: [],
  error: null,
};

const storage = (state = INITIAL_STATE, action) => {
  switch (action.type) {
  case GET_STORAGE:
    return { ...state, loading: true };
  case GET_STORAGE_SUCCESS:
    return { ...state, favorites: action.payload, loading: false };
  case GET_STORAGE_ERROR:
    return { ...state, error: action.payload, loading: false };
  case FILTER_FAVORITES_FOOD:
    return { ...state, favorites: action.payload };
  case ADD_FAVORITE_ITEM:
    return { ...state, favorites: [...state.favorites, action.payload] };
  case REMOVE_FAVORITE_ITEM:
    return {
      ...state,
      favorites: state.favorites.filter(({ id }) => id !== action.payload),
    };
  default:
    return state;
  }
};

export default storage;
