import { initialFavoriteStorage } from './storages';

export const getLocalStorage = () => {
  let storage = JSON.parse(localStorage.getItem('favoriteRecipes'));

  if (storage === null) {
    localStorage.setItem(
      'favoriteRecipes',
      JSON.stringify(initialFavoriteStorage),
    );

    storage = JSON.parse(localStorage.getItem('favoriteRecipes'));
  }

  return storage;
};

export const addLocalStorage = (storageKey, storageObject) => (
  localStorage.setItem(storageKey, JSON.stringify(storageObject))
);

export const addItem = (storageArray, favoriteObject) => {
  if (storageArray.length === 0) {
    const newFavorites = {
      favoriteRecipes: [...storageArray, favoriteObject],
    };

    return newFavorites;
  }

  storageArray.push(favoriteObject);

  const filteredFavorites = storageArray.filter((recipe, i) => {
    const recipeStr = JSON.stringify(recipe);

    return i === storageArray.findIndex((obj) => (
      JSON.stringify(obj) === recipeStr
    ));
  });

  const newFavorites = {
    favoriteRecipes: filteredFavorites,
  };

  return newFavorites;
};

export const removeItem = (favoriteRecipes, recipeId) => {
  const cleanRecipes = favoriteRecipes.filter(({ id }) => id !== recipeId);
  const newFavorites = {
    favoriteRecipes: cleanRecipes,
  };

  addLocalStorage('favoriteRecipes', newFavorites);
};
