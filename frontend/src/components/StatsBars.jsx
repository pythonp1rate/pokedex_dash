function StatsBars({ pokemon }) {
  const stats = [
    { name: 'HP', value: pokemon.HP },
    { name: 'Attack', value: pokemon.Attack },
    { name: 'Defense', value: pokemon.Defense },
    { name: 'Sp. Atk', value: pokemon['Sp. Atk'] },
    { name: 'Sp. Def', value: pokemon['Sp. Def'] },
    { name: 'Speed', value: pokemon.Speed }
  ];

  const maxStat = 200;
  const minOpacity = 0.2;
  const maxOpacity = 1.0;

  return (
    <div className="stats-bars-container">
      {stats.map((stat) => {
        const barWidth = (stat.value / maxStat) * 100;
        const normalizedValue = stat.value / maxStat;
        const opacity = minOpacity + (maxOpacity - minOpacity) * normalizedValue;
        
        return (
          <div key={stat.name} className="stats-bar-row">
            <span className="stats-bar-label">{stat.name}:</span>
            <span className="stats-bar-value">{stat.value}</span>
            <div className="stats-bar-wrapper">
              <div 
                className="stats-bar"
                style={{
                  width: `${barWidth}%`,
                  opacity: opacity
                }}
              />
            </div>
          </div>
        );
      })}
    </div>
  );
}

export default StatsBars;
