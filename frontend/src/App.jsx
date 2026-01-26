import { useState } from 'react';
import logo from './assets/pokeindex_logo.png';
import { searchPokemon } from './services/api';
import './App.css';

function App() {
  const [searchQuery, setSearchQuery] = useState('');
  const [pokemonResults, setPokemonResults] = useState([]);
  const [pokemonImages, setPokemonImages] = useState({});
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const getPokemonImage = async (name) => {
    try {
      const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${name.toLowerCase()}`);
      if (!response.ok) return null;
      const data = await response.json();
      // Try official artwork first, fallback to default sprite
      return data.sprites?.other?.['official-artwork']?.front_default || 
             data.sprites?.front_default || null;
    } catch (error) {
      console.error('Error fetching image:', error);
      return null;
    }
  };

  const handleSearch = async (e) => {
    e.preventDefault();
    
    if (!searchQuery.trim()) {
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const data = await searchPokemon(searchQuery);
      setPokemonResults(data.pokemon || []);
      
      // Fetch images for all results
      const imagePromises = data.pokemon.map(async (pokemon) => {
        const imageUrl = await getPokemonImage(pokemon.Name);
        return { name: pokemon.Name, imageUrl };
      });
      
      const images = await Promise.all(imagePromises);
      const imageMap = {};
      images.forEach(({ name, imageUrl }) => {
        imageMap[name] = imageUrl;
      });
      setPokemonImages(imageMap);
    } catch (err) {
      setError('Failed to search Pokemon. Please try again.');
      setPokemonResults([]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} alt="Pokemon Logo" className="logo" />
      </header>
      
      <main>
        <form onSubmit={handleSearch} className="search-form">
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search for a Pokemon..."
            className="search-input"
          />
          <button type="submit" disabled={loading} className="search-button">
            {loading ? 'Searching...' : 'Search'}
          </button>
        </form>

        {error && <div className="error-message">{error}</div>}

        <div className="results">
          {pokemonResults.length > 0 && (
            <div className="pokemon-list">
              {pokemonResults.map((pokemon, index) => (
                <div key={index} className="pokemon-card">
                  {pokemonImages[pokemon.Name] && (
                    <img 
                      src={pokemonImages[pokemon.Name]} 
                      alt={pokemon.Name}
                      className="pokemon-image"
                    />
                  )}
                  <h2>{pokemon.Name}</h2>
                  <p>Type: {pokemon.Type1} {pokemon.Type2 && `/ ${pokemon.Type2}`}</p>
                  <p>HP: {pokemon.HP} | Attack: {pokemon.Attack} | Defense: {pokemon.Defense}</p>
                  <p>Total Stats: {pokemon.Total}</p>
                </div>
              ))}
            </div>
          )}
        </div>
      </main>
    </div>
  );
}

export default App;