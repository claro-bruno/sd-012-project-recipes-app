import {
  GET_STORAGE,
  GET_STORAGE_SUCCESS,
  GET_STORAGE_ERROR,
} from '../actions/actionTypes';

const INITIAL_STATE = {
  loading: false,
  inProgress: {},
  error: null,
};

const storage = (state = INITIAL_STATE, action) => {
  switch (action.type) {
  case GET_STORAGE:
    return { ...state, loading: true };
  case GET_STORAGE_SUCCESS:
    return { ...state, inProgress: action.payload, loading: false };
  case GET_STORAGE_ERROR:
    return { ...state, error: action.payload, loading: false };
  default:
    return state;
  }
};

export default storage;
