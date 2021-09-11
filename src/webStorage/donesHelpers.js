import { initialDoneStorage } from './storages';

export const getDoneLocalStorage = () => {
  let storage = JSON.parse(localStorage.getItem('doneRecipes'));

  if (storage === null) {
    localStorage.setItem(
      'doneRecipes',
      JSON.stringify(initialDoneStorage),
    );

    storage = JSON.parse(localStorage.getItem('doneRecipes'));
  }

  return storage;
};

export const addDoneLocalStorage = (storageKey, storageArrayObject) => (
  localStorage.setItem(storageKey, JSON.stringify(storageArrayObject))
);

export const addDoneItem = (storageArray, finishRecipe) => {
  if (storageArray.length === 0 || []) {
    const newfinishRecipes = [...storageArray, ...finishRecipe];

    return newfinishRecipes;
  }
};
