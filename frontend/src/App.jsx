import { useState } from 'react';
import logo from './assets/pokeindex_logo.png';
import pokeballIcon from './assets/pokeball.png';
import { searchPokemon } from './services/api';
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
      const lowerName = name.toLowerCase();
      const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${lowerName}`);
      if (!response.ok) {
        return null;
      }
      const data = await response.json();
      if (data.sprites && data.sprites.other && data.sprites.other['official-artwork'] && data.sprites.other['official-artwork'].front_default) {
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
      const newImageMap = {};
      // copy existing images
      for (let key in pokemonImages) {
        newImageMap[key] = pokemonImages[key];
      }
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
      const updatedImages = {};
      for (let key in pokemonImages) {
        updatedImages[key] = pokemonImages[key];
      }
      updatedImages[pokemon.Name] = imgUrl;
      setPokemonImages(updatedImages);
    }
    
    setComparedPokemon([...comparedPokemon, pokemon]);
  };

  const removeFromComparison = (pokemonName) => {
    const updated = [];
    for (let i = 0; i < comparedPokemon.length; i++) {
      if (comparedPokemon[i].Name !== pokemonName) {
        updated.push(comparedPokemon[i]);
      }
    }
    setComparedPokemon(updated);
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
            placeholder="Catch 'em all!"
            className="search-input"
          />
          <button type="submit" disabled={loading} className="search-button">
            <img src={pokeballIcon} alt="Search" className="search-icon" />
          </button>
        </form>

        {error && <div className="error-message">{error}</div>}

        <div className="results">
          {pokemonResults.length > 0 && (
            <div className="search-results-list">
              {pokemonResults.map((pokemon) => {
                // check if already added
                let isAlreadyAdded = false;
                for (let i = 0; i < comparedPokemon.length; i++) {
                  if (comparedPokemon[i].Name === pokemon.Name) {
                    isAlreadyAdded = true;
                    break;
                  }
                }
                
                let isDisabled = false;
                if (isAlreadyAdded || comparedPokemon.length >= 4) {
                  isDisabled = true;
                }
                
                let opacityStyle = 1;
                if (isDisabled) {
                  opacityStyle = 0.6;
                }
                
                // build type string
                let typeString = pokemon.Type1;
                // check if pokemon has a second type that is not empty
                if (pokemon.Type2 && pokemon.Type2.length > 0 && pokemon.Type2 !== '' && pokemon.Type2 !== ' ') {
                  typeString = pokemon.Type1 + ' / ' + pokemon.Type2;
                }
                
                // format pokemon id with leading zeros
                let pokemonIdStr = String(pokemon.ID);
                if (pokemonIdStr.length === 1) {
                  pokemonIdStr = '000' + pokemonIdStr;
                } else if (pokemonIdStr.length === 2) {
                  pokemonIdStr = '00' + pokemonIdStr;
                } else if (pokemonIdStr.length === 3) {
                  pokemonIdStr = '0' + pokemonIdStr;
                }
                
                return (
                  <div 
                    key={pokemon.Name} 
                    className="search-result-item"
                    onClick={() => {
                      if (!isDisabled) {
                        addToComparison(pokemon);
                      }
                    }}
                    style={{ 
                      opacity: opacityStyle
                    }}
                  >
                    {pokemonImages[pokemon.Name] && (
                      <img 
                        src={pokemonImages[pokemon.Name]} 
                        alt={pokemon.Name}
                        className="search-result-image"
                      />
                    )}
                    <div className="search-result-info">
                      <h3>{pokemon.Name}</h3>
                      <p className="pokemon-number">#{pokemonIdStr}</p>
                      <p>Type: {typeString}</p>
                      {isAlreadyAdded && <span className="already-added-badge">Already Added</span>}
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>

        {comparedPokemon.length > 0 && (
          <div className="comparison-section">
            <BattleAdvantageCards comparedPokemon={comparedPokemon} pokemonImages={pokemonImages} onRemove={removeFromComparison} />
          </div>
        )}
      </main>
    </div>
  );
}

export default App;