// base URL for your backend API
const API_BASE_URL = 'http://localhost:8001/api';

// helper function to handle fetch requests
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

// function to get all pokemon (with optional filters)
export const getAllPokemon = async (filters = {}) => {
  const params = new URLSearchParams();
  
  if (filters.types && filters.types.length > 0) {
    filters.types.forEach(type => params.append('type', type));
  }
  if (filters.hp_min) params.append('hp_min', filters.hp_min);
  if (filters.hp_max) params.append('hp_max', filters.hp_max);
  
  const queryString = params.toString();
  const endpoint = queryString ? `/pokemon?${queryString}` : '/pokemon';
  
  return fetchAPI(endpoint);
};

// function to search pokemon by name
export const searchPokemon = async (query) => {
  return fetchAPI(`/pokemon/search?q=${encodeURIComponent(query)}`);
};

// function to get single pokemon by name
export const getPokemonByName = async (name) => {
  return fetchAPI(`/pokemon/${encodeURIComponent(name)}`);
};

// function to get all types
export const getTypes = async () => {
  return fetchAPI('/pokemon/types');
};

// function to get HP range
export const getHpRange = async () => {
  return fetchAPI('/stats/hp-range');
};