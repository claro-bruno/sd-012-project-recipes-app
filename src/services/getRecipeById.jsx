const getMealRecipe = async (id) => {
  const endpoint = `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`;
  const response = await fetch(endpoint);
  if (!response.ok) return [];
  const result = response.json();
  return result;
};

export default getMealRecipe;
