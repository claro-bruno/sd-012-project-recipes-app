import {
  SEARCH_INGREDIENT_DRINKS,
  SEARCH_INGREDIENT_DRINKS_SUCCESS,
  SEARCH_INGREDIENT_DRINKS_ERROR,
} from './actionTypes';

const getSearch = () => ({
  type: SEARCH_INGREDIENT_DRINKS,
});

const getSearchSuccess = (search) => ({
  type: SEARCH_INGREDIENT_DRINKS_SUCCESS,
  payload: search,
});

const getSearchError = (error) => ({
  type: SEARCH_INGREDIENT_DRINKS_ERROR,
  payload: error,
});

const fetchSearchIngredientDrinks = (text) => async (dispatch) => {
  dispatch(getSearch());
  const response = await fetch(`https://www.thecocktaildb.com/api/json/v1/1/filter.php?i=${text}`);
  const json = await response.json();
  if (json.drinks === null) {
    global.alert('Sinto muito, não encontramos nenhuma receita para esses filtros.');
  } else {
    try {
      dispatch(getSearchSuccess(json.drinks));
    } catch (error) {
      dispatch(getSearchError(error));
    }
  }
};

export default fetchSearchIngredientDrinks;
