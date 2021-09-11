import { initialInProgressStorage } from './storages';

const getInProgressLocalStorage = () => {
  let storage = JSON.parse(localStorage.getItem('inProgressRecipes'));

  if (storage === null) {
    localStorage.setItem('inProgressRecipes', JSON.stringify(initialInProgressStorage));

    storage = JSON.parse(localStorage.getItem('inProgressRecipes'));
  }

  return storage;
};

export default getInProgressLocalStorage;
