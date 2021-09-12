export const enableButton = (ingredientsList, ingredientsChecked) => {
  if (ingredientsList && ingredientsChecked) {
    if (ingredientsList.length === ingredientsChecked.length) {
      return false;
    }

    return true;
  }

  return true;
};

export const setIngredients = (cocktail) => {
  if (cocktail.length !== 0) {
    const object = cocktail[0];
    const keys = Object.keys(object);
    const values = Object.values(object);

    const ingredientsKeys = keys.filter((item, index) => (
      item.includes('strIngredient') && values[index] !== ''
      && item.includes('strIngredient') && values[index] !== null
    ));

    const measurementsKeys = keys.filter((item, index) => (
      item.includes('strMeasure') && values[index] !== ''
    ));

    return ingredientsKeys.reduce((acc, curr, index) => (
      [
        ...acc,
        {
          [object[curr]]: object[measurementsKeys[index]],
        },
      ]
    ), []);
  }
};
