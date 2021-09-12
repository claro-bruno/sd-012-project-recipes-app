const favoriteRecipes = (recipe) => {
  const arrayOfFavorites = JSON.parse(localStorage.getItem('favoriteRecipes'));
  if (arrayOfFavorites) {
    const checkName = arrayOfFavorites.filter(({ name }) => name === recipe.name);
    if (!checkName.length) {
      localStorage.setItem('favoriteRecipes', JSON.stringify(
        [...arrayOfFavorites, recipe],
      ));
      return (true);
    }
    const filteredName = arrayOfFavorites.filter((food) => food.name !== recipe.name);
    if (!filteredName.length) {
      localStorage.removeItem('favoriteRecipes');
    } else {
      localStorage.removeItem('favoriteRecipes');
      localStorage.setItem('favoriteRecipes', JSON.stringify(
        filteredName,
      ));
      return (false);
    }
  } else {
    localStorage.setItem('favoriteRecipes', JSON.stringify([recipe]));
    return (true);
  }
};

export default favoriteRecipes;
