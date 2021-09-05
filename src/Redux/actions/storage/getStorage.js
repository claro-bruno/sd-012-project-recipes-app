import {
  GET_STORAGE,
  GET_STORAGE_SUCCESS,
  GET_STORAGE_ERROR,
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

const fetchStorage = (storageKey, initialStorage) => async (dispatch) => {
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

export default fetchStorage;
