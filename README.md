# pokedex_dash
(uni project)
# Pokédex Dashboard

An interactive Pokémon analytics dashboard built with Streamlit that allows users to explore and analyze statistics for 1215 Pokémon across multiple generations.

## Features

- **Search Functionality**: Look up any Pokémon by name and view detailed stats
- **Interactive Filters**: Filter Pokémon by type and HP range
- **Data Visualization**: Scatter plot showing Attack stats across different Pokémon types
- **Complete Pokédex**: Browse the full dataset of 1215 Pokémon
- **Export Data**: Download filtered results as CSV

## Installation

1. Clone the repository:
```bash
git clone https://github.com/pythonp1rate/pokedex_dash.git
cd pokedex_dash
```

2. Create a virtual environment:
```bash
python3 -m venv venv
source venv/bin/activate
```

3. Install dependencies:
```bash
pip install streamlit pandas plotly
```

## Usage

Run the Streamlit app:
```bash
streamlit run app.py
```

The app will open in your browser at `http://localhost:8501`

## Dataset

The app uses the `Pokemon.csv` dataset containing stats for Pokémon across multiple generations including:
- Base stats (HP, Attack, Defense, Special Attack, Special Defense, Speed)
- Types (Primary and Secondary)
- Generation information

## Technologies Used

- **Streamlit**: Web application framework
- **Pandas**: Data manipulation and analysis
- **Plotly Express**: Interactive data visualizations
