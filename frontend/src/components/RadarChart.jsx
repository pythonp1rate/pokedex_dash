import { Radar, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, ResponsiveContainer } from 'recharts';

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

// check how bright a color is
function getLuminance(hexColor) {
  const hex = hexColor.replace('#', '');
  const r = parseInt(hex.substr(0, 2), 16) / 255;
  const g = parseInt(hex.substr(2, 2), 16) / 255;
  const b = parseInt(hex.substr(4, 2), 16) / 255;
  return 0.299 * r + 0.587 * g + 0.114 * b;
}

function PokemonRadarChart({ pokemon, height = 400 }) {
  const statsData = [
    { stat: 'HP', value: pokemon.HP },
    { stat: 'Attack', value: pokemon.Attack },
    { stat: 'Defense', value: pokemon.Defense },
    { stat: 'Sp. Atk', value: pokemon['Sp. Atk'] },
    { stat: 'Sp. Def', value: pokemon['Sp. Def'] },
    { stat: 'Speed', value: pokemon.Speed }
  ];

  const pokemonType = pokemon.Type1 || 'Normal';
  
  let fillColor, strokeColor;
  
  if (pokemon.Type2 && pokemon.Type2.trim()) {
    const type1Color = typeColors[pokemonType] || '#DDD';
    const type2Color = typeColors[pokemon.Type2.trim()] || type1Color;
    
    const type1Lum = getLuminance(type1Color);
    const type2Lum = getLuminance(type2Color);
    
    // if type2 is lighter, use it as fill (inner color)
    if (type2Lum > type1Lum) {
      fillColor = type2Color;
      strokeColor = type1Color;
    } else {
      fillColor = type1Color;
      strokeColor = type2Color;
    }
  } else {
    fillColor = typeColors[pokemonType] || '#DDD';
    strokeColor = pokemonType === 'Normal' ? '#8A8E7F' : fillColor;
  }

  const renderCustomTick = (props) => {
    const { payload, x, y, cx, cy, radius } = props;
    
    if (!payload || !payload.value) {
      return null;
    }
    
    const angle = payload.coordinate ? (payload.coordinate * Math.PI) / 180 : 0;
    const r = radius || 100;
    const labelRadius = r + 35;
    const labelX = cx + labelRadius * Math.cos(angle);
    const labelY = cy + labelRadius * Math.sin(angle);
    
    return (
      <text
        x={labelX}
        y={labelY}
        fill="rgba(255,255,255,0.9)"
        fontSize={12}
        textAnchor="middle"
        dominantBaseline="middle"
      >
        {payload.value}
      </text>
    );
  };

  return (
    <ResponsiveContainer width="100%" height={height}>
      <RadarChart data={statsData} margin={{ top: 20, right: 30, bottom: 20, left: 30 }}>
        <PolarGrid />
        <PolarAngleAxis 
          dataKey="stat" 
          tick={renderCustomTick}
        />
        <PolarRadiusAxis angle={90} domain={[0, 'auto']} />
        <Radar 
          dataKey="value" 
          stroke={strokeColor} 
          fill={fillColor} 
          fillOpacity={0.6} 
        />
      </RadarChart>
    </ResponsiveContainer>
  );
}

export default PokemonRadarChart;
