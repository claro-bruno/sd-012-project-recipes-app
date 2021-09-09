const getDetails = async (api) => {
  const response = await fetch(api);
  if (!response.ok) return [];
  const result = await response.json();
  return result;
};

export default getDetails;
