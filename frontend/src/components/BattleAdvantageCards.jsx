import PokemonRadarChart from './RadarChart';
import StatsBars from './StatsBars';

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

const typeChart = {
  Normal: { Normal: 1, Fire: 1, Water: 1, Electric: 1, Grass: 1, Ice: 1, Fighting: 1, Poison: 1, Ground: 1, Flying: 1, Psychic: 1, Bug: 1, Rock: 0.5, Ghost: 0, Dragon: 1, Dark: 1, Steel: 0.5, Fairy: 1 },
  Fire: { Normal: 1, Fire: 0.5, Water: 0.5, Electric: 1, Grass: 2, Ice: 2, Fighting: 1, Poison: 1, Ground: 1, Flying: 1, Psychic: 1, Bug: 2, Rock: 0.5, Ghost: 1, Dragon: 0.5, Dark: 1, Steel: 2, Fairy: 1 },
  Water: { Normal: 1, Fire: 2, Water: 0.5, Electric: 1, Grass: 0.5, Ice: 1, Fighting: 1, Poison: 1, Ground: 2, Flying: 1, Psychic: 1, Bug: 1, Rock: 2, Ghost: 1, Dragon: 0.5, Dark: 1, Steel: 1, Fairy: 1 },
  Electric: { Normal: 1, Fire: 1, Water: 2, Electric: 0.5, Grass: 0.5, Ice: 1, Fighting: 1, Poison: 1, Ground: 0, Flying: 2, Psychic: 1, Bug: 1, Rock: 1, Ghost: 1, Dragon: 0.5, Dark: 1, Steel: 1, Fairy: 1 },
  Grass: { Normal: 1, Fire: 0.5, Water: 2, Electric: 1, Grass: 0.5, Ice: 1, Fighting: 1, Poison: 0.5, Ground: 2, Flying: 0.5, Psychic: 1, Bug: 0.5, Rock: 2, Ghost: 1, Dragon: 0.5, Dark: 1, Steel: 0.5, Fairy: 1 },
  Ice: { Normal: 1, Fire: 0.5, Water: 0.5, Electric: 1, Grass: 2, Ice: 0.5, Fighting: 1, Poison: 1, Ground: 2, Flying: 2, Psychic: 1, Bug: 1, Rock: 1, Ghost: 1, Dragon: 2, Dark: 1, Steel: 0.5, Fairy: 1 },
  Fighting: { Normal: 2, Fire: 1, Water: 1, Electric: 1, Grass: 1, Ice: 2, Fighting: 1, Poison: 0.5, Ground: 1, Flying: 0.5, Psychic: 0.5, Bug: 0.5, Rock: 2, Ghost: 0, Dragon: 1, Dark: 2, Steel: 2, Fairy: 0.5 },
  Poison: { Normal: 1, Fire: 1, Water: 1, Electric: 1, Grass: 2, Ice: 1, Fighting: 1, Poison: 0.5, Ground: 0.5, Flying: 1, Psychic: 1, Bug: 1, Rock: 0.5, Ghost: 0.5, Dragon: 1, Dark: 1, Steel: 0, Fairy: 2 },
  Ground: { Normal: 1, Fire: 2, Water: 1, Electric: 2, Grass: 0.5, Ice: 1, Fighting: 1, Poison: 2, Ground: 1, Flying: 0, Psychic: 1, Bug: 0.5, Rock: 2, Ghost: 1, Dragon: 1, Dark: 1, Steel: 2, Fairy: 1 },
  Flying: { Normal: 1, Fire: 1, Water: 1, Electric: 0.5, Grass: 2, Ice: 1, Fighting: 2, Poison: 1, Ground: 1, Flying: 1, Psychic: 1, Bug: 2, Rock: 0.5, Ghost: 1, Dragon: 1, Dark: 1, Steel: 0.5, Fairy: 1 },
  Psychic: { Normal: 1, Fire: 1, Water: 1, Electric: 1, Grass: 1, Ice: 1, Fighting: 2, Poison: 2, Ground: 1, Flying: 1, Psychic: 0.5, Bug: 1, Rock: 1, Ghost: 1, Dragon: 1, Dark: 0, Steel: 0.5, Fairy: 1 },
  Bug: { Normal: 1, Fire: 0.5, Water: 1, Electric: 1, Grass: 2, Ice: 1, Fighting: 0.5, Poison: 0.5, Ground: 1, Flying: 0.5, Psychic: 2, Bug: 1, Rock: 1, Ghost: 0.5, Dragon: 1, Dark: 2, Steel: 0.5, Fairy: 0.5 },
  Rock: { Normal: 1, Fire: 2, Water: 1, Electric: 1, Grass: 1, Ice: 2, Fighting: 0.5, Poison: 1, Ground: 0.5, Flying: 2, Psychic: 1, Bug: 2, Rock: 1, Ghost: 1, Dragon: 1, Dark: 1, Steel: 0.5, Fairy: 1 },
  Ghost: { Normal: 0, Fire: 1, Water: 1, Electric: 1, Grass: 1, Ice: 1, Fighting: 1, Poison: 1, Ground: 1, Flying: 1, Psychic: 2, Bug: 1, Rock: 1, Ghost: 2, Dragon: 1, Dark: 0.5, Steel: 1, Fairy: 1 },
  Dragon: { Normal: 1, Fire: 1, Water: 1, Electric: 1, Grass: 1, Ice: 1, Fighting: 1, Poison: 1, Ground: 1, Flying: 1, Psychic: 1, Bug: 1, Rock: 1, Ghost: 1, Dragon: 2, Dark: 1, Steel: 0.5, Fairy: 0 },
  Dark: { Normal: 1, Fire: 1, Water: 1, Electric: 1, Grass: 1, Ice: 1, Fighting: 0.5, Poison: 1, Ground: 1, Flying: 1, Psychic: 2, Bug: 1, Rock: 1, Ghost: 2, Dragon: 1, Dark: 0.5, Steel: 1, Fairy: 0.5 },
  Steel: { Normal: 1, Fire: 0.5, Water: 0.5, Electric: 0.5, Grass: 1, Ice: 2, Fighting: 1, Poison: 1, Ground: 1, Flying: 1, Psychic: 1, Bug: 1, Rock: 2, Ghost: 1, Dragon: 1, Dark: 1, Steel: 0.5, Fairy: 2 },
  Fairy: { Normal: 1, Fire: 0.5, Water: 1, Electric: 1, Grass: 1, Ice: 1, Fighting: 2, Poison: 0.5, Ground: 1, Flying: 1, Psychic: 1, Bug: 1, Rock: 1, Ghost: 1, Dragon: 2, Dark: 2, Steel: 0.5, Fairy: 1 }
};

function BattleAdvantageCards({ comparedPokemon, pokemonImages }) {
  const getCardGradient = (pokemon) => {
    const type1 = pokemon.Type1 || 'Normal';
    const type2 = pokemon.Type2 && pokemon.Type2.trim() ? pokemon.Type2.trim() : null;
    
    const color1 = typeColors[type1] || typeColors.Normal;
    
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

  const calculateEffectiveness = (attackerTypes, defenderTypes) => {
    let totalMultiplier = 1;
    defenderTypes.forEach(defendType => {
      let typeMultiplier = 1;
      attackerTypes.forEach(attackType => {
        if (typeChart[attackType] && typeChart[attackType][defendType] !== undefined) {
          typeMultiplier *= typeChart[attackType][defendType];
        }
      });
      totalMultiplier *= typeMultiplier;
    });
    return totalMultiplier;
  };

  const getAdvantages = (pokemon) => {
    const attackerTypes = [];
    if (pokemon.Type1) attackerTypes.push(pokemon.Type1);
    if (pokemon.Type2 && pokemon.Type2.trim()) {
      attackerTypes.push(pokemon.Type2.trim());
    }

    const strongAgainst = [];
    const weakAgainst = [];
    const immune = [];

    comparedPokemon.forEach(opponent => {
      if (opponent.Name === pokemon.Name) return;

      const defenderTypes = [];
      if (opponent.Type1) defenderTypes.push(opponent.Type1);
      if (opponent.Type2 && opponent.Type2.trim()) {
        defenderTypes.push(opponent.Type2.trim());
      }

      const effectiveness = calculateEffectiveness(attackerTypes, defenderTypes);

      if (effectiveness === 0) {
        immune.push({ pokemon: opponent, multiplier: 0 });
      } else if (effectiveness >= 2) {
        strongAgainst.push({ pokemon: opponent, multiplier: effectiveness });
      } else if (effectiveness < 0.5) {
        weakAgainst.push({ pokemon: opponent, multiplier: effectiveness });
      }
    });

    return { strongAgainst, weakAgainst, immune };
  };

  return (
    <div className="battle-advantage-section">
      <h2 className="advantage-title">Pokemon Comparison</h2>
      <div className={`advantage-cards-grid advantage-cards-grid-${comparedPokemon.length}`}>
        {comparedPokemon.map(pokemon => {
          const { strongAgainst, weakAgainst, immune } = getAdvantages(pokemon);
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
              <div className="advantage-card-header">
                {pokemonImages[pokemon.Name] && (
                  <img 
                    src={pokemonImages[pokemon.Name]} 
                    alt={pokemon.Name}
                    className="advantage-pokemon-image"
                  />
                )}
                <div className="advantage-pokemon-info">
                  <h3 className="advantage-pokemon-name">{pokemon.Name}</h3>
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
                </div>
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

              <div className="advantage-stats-section">
                <StatsBars pokemon={pokemon} />
              </div>
              <div className="advantage-stats-chart">
                <PokemonRadarChart pokemon={pokemon} height={260} />
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default BattleAdvantageCards;
