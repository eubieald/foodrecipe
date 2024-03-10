// authenticateApiCall.js

const authenticateApiCall = async (
  query,
  apiUrl = import.meta.env.VITE_SPOONACULAR_API_RECIPE_URL,
  apiKey = import.meta.env.VITE_SPOONACULAR_API_KEY
) => {
  try {
    const response = await fetch(`${apiUrl}?apiKey=${apiKey}&${query}`);
    console.log(response);
    
    if (!response.ok) {
      throw new Error("Api authentication failed.");
    }

    return response;
  } catch (error) {
    console.error(error);
    throw new Error(error.message);
  }
};

export default authenticateApiCall; // Export the function as default
