const initialDone = [];

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
  if (storageArray.length === 0 || []) {
    const newfinishRecipes = [...storageArray, ...finishRecipe];

    return newfinishRecipes;
  }
};
