import { initialInProgressStorage } from './storages';

export const getInProgressLocalStorage = () => {
  let storage = JSON.parse(localStorage.getItem('inProgressRecipes'));

  if (storage === null) {
    localStorage.setItem('inProgressRecipes', JSON.stringify(initialInProgressStorage));

    storage = JSON.parse(localStorage.getItem('inProgressRecipes'));
  }

  return storage;
};

export const addInProgressLocalStorage = (storageKey, storageObject) => (
  localStorage.setItem(storageKey, JSON.stringify(storageObject))
);

export const addInProgressItem = (type, id, ingredient) => {
  const storage = getInProgressLocalStorage();

  if (storage[type][id] === undefined) {
    const inProgressRecipe = {
      ...storage,
      [type]: {
        ...storage[type],
        [id]: ingredient,
      },
    };

    addInProgressLocalStorage('inProgressRecipes', inProgressRecipe);
  }

  if (storage[type][id] !== undefined) {
    const inProgressRecipe = {
      ...storage,
      [type]: {
        ...storage[type],
        [id]: [...storage[type][id], ingredient[0]],
      },
    };

    addInProgressLocalStorage('inProgressRecipes', inProgressRecipe);
  }
};

export const removeInProgressItem = (type, id, ingredient) => {
  const storage = getInProgressLocalStorage();

  if (storage[type][id].includes(ingredient)) {
    const newIngredients = storage[type][id].filter((ingr) => ingr !== ingredient[0]);

    const inProgressRecipe = {
      ...storage,
      [type]: {
        ...storage[type],
        [id]: newIngredients,
      },
    };

    addInProgressLocalStorage('inProgressRecipes', inProgressRecipe);
  }
};
