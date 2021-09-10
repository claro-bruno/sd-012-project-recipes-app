const initialDone = [{
  id: '',
  type: '',
  area: '',
  category: '',
  alcoholicOrNot: '',
  name: '',
  image: '',
  doneDate: '',
  tags: '',
}];

export const getLocalStorage = () => {
  let storage = JSON.parse(localStorage.getItem('doneRecipes'));

  if (storage === null) {
    localStorage.setItem(
      'doneRecipes',
      JSON.stringify(initialDone),
    );

    storage = JSON.parse(localStorage.getItem('doneRecipes'));
  }

  return storage;
};

export const addLocalStorage = (storageKey, storageArrayObject) => (
  localStorage.setItem(storageKey, JSON.stringify(storageArrayObject))
);

export const addItem = (storageArray, finishRecipe) => {
  if (storageArray.length === 0) {
    const newFavorites = {
      doneRecipes: [...storageArray, finishRecipe],
    };

    return newFavorites;
  }

  storageArray.push(finishRecipe);

  const filteredFavorites = storageArray.filter((recipe, i) => {
    const recipeStr = JSON.stringify(recipe);

    return i === storageArray.findIndex((obj) => (
      JSON.stringify(obj) === recipeStr
    ));
  });

  const newFavorites = {
    doneRecipes: filteredFavorites,
  };

  return newFavorites;
};

export const removeItem = (doneRecipes, recipeId) => {
  const cleanRecipes = doneRecipes.filter(({ id }) => id !== recipeId);
  const newFavorites = {
    doneRecipes: cleanRecipes,
  };

  addLocalStorage('doneRecipes', newFavorites);
};
