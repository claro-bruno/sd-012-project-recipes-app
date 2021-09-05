import getFood from '../../services/FetchFoods';
import getDrink from '../../services/FetchDrinks';

export const CHANGE_FOOD_SEARCH = 'CHANGE_FOOD_SEARCH';
export const CHANGE_DRINK_SEARCH = 'CHANGE_DRINK_SEARCH';
export const GET_FOODS_SUCCESS = 'GET_FOODS_SUCCESS';
export const GET_DRINKS_SUCCESS = 'GET_DRINKS_SUCCESS';
export const CHANGE_SHOWBAR = 'CHANGE_SHOWBAR';
export const GET_URL = 'GET_URL';

export const getFoodsSuccess = (meal) => ({
  type: GET_FOODS_SUCCESS,
  payload: meal,
});

export const getDrinksSuccess = (cocktail) => ({
  type: GET_DRINKS_SUCCESS,
  payload: cocktail,
});

export const changeShowBar = (showBar) => ({
  type: CHANGE_SHOWBAR,
  payload: showBar,
});

export function getFoodsApi(api) {
  return async (dispatch) => {
    const meal = await getFood(api);
    dispatch(getFoodsSuccess(meal));
  };
}

export function getDrinksApi(url) {
  return async (dispatch) => {
    const cocktail = await getDrink(url);
    dispatch(getDrinksSuccess(cocktail));
  };
}

export const changeFoodSearch = (search) => ({
  type: CHANGE_FOOD_SEARCH,
  payload: search,
});

export const changeDrinkSearch = (search) => ({
  type: CHANGE_DRINK_SEARCH,
  payload: search,
});
