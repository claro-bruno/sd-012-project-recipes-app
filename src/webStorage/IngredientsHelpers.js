import { initialInProgressStorage } from './storages';

const getLocalStorage = async () => {
  let storage = JSON.parse(localStorage.getItem('inProgressRecipes'));

  if (storage === null) {
    localStorage.setItem('inProgressRecipes', JSON.stringify(initialInProgressStorage));

    storage = JSON.parse(localStorage.getItem('inProgressRecipes'));
  }

  return storage;
};

export default getLocalStorage;
