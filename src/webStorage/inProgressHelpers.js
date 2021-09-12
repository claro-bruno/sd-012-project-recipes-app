import { initialInProgressStorage } from './storages';

export const getInProgressLocalStorage = () => {
  let storage = JSON.parse(localStorage.getItem('inProgressRecipes'));

  if (storage === null) {
    localStorage.setItem('inProgressRecipes', JSON.stringify(initialInProgressStorage));

    storage = JSON.parse(localStorage.getItem('inProgressRecipes'));
  }

  return storage;
};

export const addInProgressItem = (storage, type, id, ingredient) => {

  console.log(id);
  console.log(storage[type][id]);
  console.log(type);
  console.log(ingredient[0]);
};
