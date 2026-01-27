import { useState } from 'react';
import logo from './assets/pokeindex_logo.png';
import { searchPokemon } from './services/api';
import PokemonRadarChart from './components/RadarChart';
import BattleAdvantageCards from './components/BattleAdvantageCards';
import './App.css';

function App() {
  const [searchQuery, setSearchQuery] = useState('');
  const [pokemonResults, setPokemonResults] = useState([]);
  const [pokemonImages, setPokemonImages] = useState({});
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [comparedPokemon, setComparedPokemon] = useState([]);

  const getPokemonImage = async (name) => {
    try {
      const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${name.toLowerCase()}`);
      if (!response.ok) return null;
      const data = await response.json();
      if (data.sprites && data.sprites.other && data.sprites.other['official-artwork']) {
        return data.sprites.other['official-artwork'].front_default;
      }
      if (data.sprites && data.sprites.front_default) {
        return data.sprites.front_default;
      }
      return null;
    } catch (error) {
      console.log('error getting image', error);
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
      // remove duplicates
      const uniquePokemon = [];
      const seenNames = new Set();
      if (data.pokemon) {
        for (let i = 0; i < data.pokemon.length; i++) {
          const pokemon = data.pokemon[i];
          if (!seenNames.has(pokemon.Name)) {
            seenNames.add(pokemon.Name);
            uniquePokemon.push(pokemon);
          }
        }
      }
      setPokemonResults(uniquePokemon);
      
      // get images
      const newImageMap = { ...pokemonImages };
      for (let i = 0; i < uniquePokemon.length; i++) {
        const pokemon = uniquePokemon[i];
        if (!newImageMap[pokemon.Name]) {
          const imgUrl = await getPokemonImage(pokemon.Name);
          newImageMap[pokemon.Name] = imgUrl;
        }
      }
      setPokemonImages(newImageMap);
    } catch (err) {
      setError('Failed to search Pokemon. Please try again.');
      setPokemonResults([]);
    }
    setLoading(false);
  };

  const addToComparison = async (pokemon) => {
    if (comparedPokemon.some(p => p.Name === pokemon.Name)) {
      return;
    }
    if (comparedPokemon.length >= 4) {
      alert('You can only compare up to 4 Pokemon at once!');
      return;
    }
    
    if (!pokemonImages[pokemon.Name]) {
      const imgUrl = await getPokemonImage(pokemon.Name);
      setPokemonImages(prev => ({
        ...prev,
        [pokemon.Name]: imgUrl
      }));
    }
    
    setComparedPokemon([...comparedPokemon, pokemon]);
  };

  const clearComparison = () => {
    setComparedPokemon([]);
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
              {pokemonResults.map((pokemon) => (
                <div key={pokemon.Name} className="pokemon-card">
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
                  <button 
                    onClick={() => addToComparison(pokemon)}
                    className="compare-button"
                    disabled={comparedPokemon.some(p => p.Name === pokemon.Name) || comparedPokemon.length >= 4}
                  >
                    {comparedPokemon.some(p => p.Name === pokemon.Name) ? 'Already Added' : 'Add to Compare'}
                  </button>
                  <PokemonRadarChart pokemon={pokemon} />
                </div>
              ))}
            </div>
          )}
        </div>

        {comparedPokemon.length > 0 && (
          <div className="comparison-section">
            <div className="comparison-header">
              <button onClick={clearComparison} className="clear-button">Clear All</button>
            </div>
            
            <BattleAdvantageCards comparedPokemon={comparedPokemon} pokemonImages={pokemonImages} />
          </div>
        )}
      </main>
    </div>
  );
}

export default App;