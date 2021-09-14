import { getMealRecipe, getDrinkRecipe} from '../../services/getRecipeById';

export const MEAL_RECIPE = 'MEAL_RECIPE';
export const DRINK_RECIPE = 'DRINK_RECIPE';

export const setMealDetails = (recipe) => ({
  type: MEAL_RECIPE,
  payload: recipe,
});

export const setDrinkDetails = (recipe) => ({
  type: DRINK_RECIPE,
  payload: recipe,
});

export const getMealRecipeById = (id) => async (dispatch) => {
  const resposta = await getMealRecipe(id);
  dispatch(setMealDetails(resposta));
};

export const getDrinkRecipeById = (id) => async(dispatch) => {
  const resposta = await getDrinkRecipe(id);
  dispatch(setDrinkDetails(resposta));
}
