const getFood = async (api) => {
  const endpoint = api;
  const response = await fetch(endpoint);
  if (!response.ok) return [];
  const result = response.json();
  return result;
};

export default getFood;
