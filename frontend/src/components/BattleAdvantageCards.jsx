import { useState, useEffect } from 'react';
import PokemonRadarChart from './RadarChart';
import StatsBars from './StatsBars';
import { comparePokemon } from '../services/api';

const typeColors = {
  Bug: '#94BC4A',
  Dark: '#736C75',
  Dragon: '#6A7BAF',
  Electric: '#E5C531',
  Fairy: '#E397D1',
  Fighting: '#CB5F48',
  Fire: '#EA7A3C',
  Flying: '#7DA6DE',
  Ghost: '#846AB6',
  Grass: '#71C558',
  Ground: '#CC9F4F',
  Ice: '#70CBD4',
  Normal: '#AAB09F',
  Poison: '#B468B7',
  Psychic: '#E5709B',
  Rock: '#B2A061',
  Steel: '#89A1B0',
  Water: '#539AE2'
};

function BattleAdvantageCards({ comparedPokemon, pokemonImages, onRemove }) {
  const [comparisonData, setComparisonData] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (comparedPokemon.length === 0) {
      setComparisonData([]);
      return;
    }

    const fetchComparison = async () => {
      setLoading(true);
      try {
        const pokemonNames = [];
        for (let i = 0; i < comparedPokemon.length; i++) {
          pokemonNames.push(comparedPokemon[i].Name);
        }
        const result = await comparePokemon(pokemonNames);
        if (result.comparisons) {
          setComparisonData(result.comparisons);
        } else {
          setComparisonData([]);
        }
      } catch (error) {
        console.error('Error fetching comparison:', error);
        setComparisonData([]);
      }
      setLoading(false);
    };

    fetchComparison();
  }, [comparedPokemon]);

  const getCardGradient = (pokemon) => {
    let type1 = pokemon.Type1;
    if (!type1) {
      type1 = 'Normal';
    }
    
    let type2 = null;
    if (pokemon.Type2 && pokemon.Type2.trim()) {
      type2 = pokemon.Type2.trim();
    }
    
    let color1 = typeColors[type1];
    if (!color1) {
      color1 = typeColors.Normal;
    }
    
    if (type2) {
      const color2 = typeColors[type2];
      return `linear-gradient(135deg, ${color1} 0%, ${color2} 100%)`;
    } else if (type1 === 'Normal') {
      const darkerNormal = '#6B6F5F';
      return `linear-gradient(135deg, ${color1} 0%, ${darkerNormal} 100%)`;
    } else {
      return `linear-gradient(135deg, ${color1} 0%, ${color1} 100%)`;
    }
  };

  const formatPokemonId = (id) => {
    let idStr = String(id);
    if (idStr.length === 1) {
      idStr = '000' + idStr;
    } else if (idStr.length === 2) {
      idStr = '00' + idStr;
    } else if (idStr.length === 3) {
      idStr = '0' + idStr;
    }
    return idStr;
  };

  if (loading) {
    return <div>Loading comparisons...</div>;
  }

  return (
    <div className="battle-advantage-section">
      <h2 className="advantage-title">Pokemon Comparison</h2>
      <div className={`advantage-cards-grid advantage-cards-grid-${comparedPokemon.length}`}>
        {comparisonData.map((comparison, index) => {
          const pokemon = comparison.pokemon;
          const advantages = comparison.advantages || {};
          const strongAgainst = advantages.strongAgainst || [];
          const weakAgainst = advantages.weakAgainst || [];
          const immune = advantages.immune || [];
          
          const pokemonTypes = [];
          if (pokemon.Type1) pokemonTypes.push(pokemon.Type1);
          if (pokemon.Type2 && pokemon.Type2.trim()) {
            pokemonTypes.push(pokemon.Type2.trim());
          }

          return (
            <div 
              key={pokemon.Name} 
              className="advantage-card"
              style={{ background: getCardGradient(pokemon) }}
            >
              <button 
                className="remove-pokemon-btn"
                onClick={() => onRemove(pokemon.Name)}
                aria-label="Remove Pokemon"
              >
                ×
              </button>

              <div className="advantage-card-top-section">
                <div className="advantage-card-left">
                  {pokemonImages[pokemon.Name] && (
                    <img 
                      src={pokemonImages[pokemon.Name]} 
                      alt={pokemon.Name}
                      className="advantage-pokemon-image-large"
                    />
                  )}
                </div>

                <div className="advantage-card-right">
                  <div className="advantage-card-right-top">
                    <h3 className="advantage-pokemon-name">{pokemon.Name}</h3>
                    <p className="advantage-pokemon-number">#{formatPokemonId(pokemon.ID)}</p>
                    <div className="advantage-type-badges">
                      {pokemonTypes.map(type => (
                        <span 
                          key={type}
                          className="advantage-type-badge"
                          style={{ backgroundColor: typeColors[type] }}
                        >
                          {type}
                        </span>
                      ))}
                    </div>

                    <div className="advantage-content">
                      {strongAgainst.length > 0 && (
                        <div className="advantage-section strong">
                          <div className="advantage-label">
                            <span>STRONG AGAINST</span>
                          </div>
                          <div className="advantage-list">
                            {strongAgainst.map(({ pokemon: opponent, multiplier }) => (
                              <div key={opponent.Name} className="advantage-item">
                                <span className="advantage-multiplier">{multiplier.toFixed(1)}x</span>
                                <span className="advantage-opponent-name">{opponent.Name}</span>
                              </div>
                            ))}
                          </div>
                        </div>
                      )}

                      {weakAgainst.length > 0 && (
                        <div className="advantage-section weak">
                          <div className="advantage-label">
                            <span>WEAK AGAINST</span>
                          </div>
                          <div className="advantage-list">
                            {weakAgainst.map(({ pokemon: opponent, multiplier }) => (
                              <div key={opponent.Name} className="advantage-item">
                                <span className="advantage-multiplier">{multiplier.toFixed(1)}x</span>
                                <span className="advantage-opponent-name">{opponent.Name}</span>
                              </div>
                            ))}
                          </div>
                        </div>
                      )}

                      {immune.length > 0 && (
                        <div className="advantage-section immune">
                          <div className="advantage-label">
                            <span>NO EFFECT</span>
                          </div>
                          <div className="advantage-list">
                            {immune.map(({ pokemon: opponent }) => (
                              <div key={opponent.Name} className="advantage-item">
                                <span className="advantage-multiplier">0x</span>
                                <span className="advantage-opponent-name">{opponent.Name}</span>
                              </div>
                            ))}
                          </div>
                        </div>
                      )}

                      {strongAgainst.length === 0 && weakAgainst.length === 0 && immune.length === 0 && (
                        <div className="advantage-neutral">
                          <span>Balanced matchups</span>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>

              <div className="advantage-lower-column">
                <div className="advantage-stats-section">
                  <StatsBars pokemon={pokemon} />
                </div>
                <div className="advantage-stats-chart">
                  <PokemonRadarChart pokemon={pokemon} height={250} />
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default BattleAdvantageCards;
