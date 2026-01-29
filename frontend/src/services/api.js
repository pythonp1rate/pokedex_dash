const API_BASE_URL = 'http://localhost:8001/api';

const fetchAPI = async (endpoint, options = {}) => {
  try {
    const response = await fetch(`${API_BASE_URL}${endpoint}`, {
      ...options,
  headers: {
    'Content-Type': 'application/json',
        ...options.headers,
  },
});

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    
    return await response.json();
  } catch (error) {
    console.error('API Error:', error);
    throw error;
  }
};

export const searchPokemon = async (query) => {
  return fetchAPI(`/pokemon/search?q=${encodeURIComponent(query)}`);
};

export const comparePokemon = async (pokemonNames) => {
  return fetchAPI('/pokemon/compare', {
    method: 'POST',
    body: JSON.stringify(pokemonNames),
  });
};