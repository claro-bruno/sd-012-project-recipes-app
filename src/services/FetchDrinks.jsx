const getDrink = async (url) => {
  const endpoint = url;
  const response = await fetch(endpoint);
  if (!response.ok) return [];
  const result = response.json();
  return result;
};

export default getDrink;
