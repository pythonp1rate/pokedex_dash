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

  return (
    <div className="stats-bars-container">
      {stats.map((stat) => {
        const barWidth = (stat.value / maxStat) * 100;
        
        return (
          <div key={stat.name} className="stats-bar-row">
            <span className="stats-bar-label">{stat.name}:</span>
            <span className="stats-bar-value">{stat.value}</span>
            <div className="stats-bar-wrapper">
              <div 
                className="stats-bar"
                style={{
                  width: `${barWidth}%`
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
