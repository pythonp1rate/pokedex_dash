from fastapi import FastAPI, Query
from fastapi.middleware.cors import CORSMiddleware
import pandas as pd
from typing import Optional, List
from pathlib import Path

app = FastAPI()

# allow frontend to call this api
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# load the csv data - use path relative to this file
csv_path = Path(__file__).parent.parent.parent / "data" / "Pokemon.csv"
df = pd.read_csv(csv_path)

@app.get("/")
def root():
    return {"message": "Pokemon API is running!"}

@app.get("/api/pokemon")
def get_pokemon(
    type: Optional[List[str]] = Query(None),
    hp_min: Optional[int] = None,
    hp_max: Optional[int] = None
):
    """Get all pokemon with optional filters"""
    filtered = df.copy()
    
    # filter by type if provided
    if type:
        filtered = filtered[filtered["Type1"].isin(type)]
    
    # filter by hp range
    if hp_min is not None:
        filtered = filtered[filtered["HP"] >= hp_min]
    if hp_max is not None:
        filtered = filtered[filtered["HP"] <= hp_max]
    
    # convert to dict for json response
    result = filtered.to_dict(orient="records")
    
    # calculate some stats like the old app did
    median_val = 0
    if len(filtered) > 0:
        median_val = float(filtered["Total"].median())
    
    stats = {
        "total_count": len(filtered),
        "median_total": median_val
    }
    
    return {
        "pokemon": result,
        "stats": stats
    }

@app.get("/api/pokemon/search")
def search_pokemon(q: str = Query(..., description="Search term for pokemon name")):
    """Search pokemon by name"""
    if not q:
        return {"pokemon": [], "message": "No search term provided"}
    
    # same search logic as before
    result = df[df["Name"].str.contains(q, case=False, na=False)]
    
    if result.empty:
        return {"pokemon": [], "message": "No Pokémon found!"}
    
    return {
        "pokemon": result.to_dict(orient="records"),
        "count": len(result)
    }

@app.get("/api/pokemon/{name}")
def get_pokemon_by_name(name: str):
    """Get a single pokemon by exact name"""
    result = df[df["Name"].str.lower() == name.lower()]
    
    if result.empty:
        return {"error": "Pokemon not found"}
    
    pokemon = result.iloc[0].to_dict()
    
    # format the stats like the old app did
    display_cols = ['Type1', 'Type2', 'Generation', 'HP',
                    'Attack', 'Defense', 'Sp. Atk', 'Sp. Def', 'Speed']
    stats = {col: pokemon.get(col) for col in display_cols if col in pokemon}
    
    return {
        "name": pokemon["Name"],
        "total": int(pokemon.get("Total", 0)),
        "stats": stats,
        "all_data": pokemon
    }

@app.get("/api/pokemon/types")
def get_types():
    """Get all available pokemon types"""
    types = sorted(df["Type1"].dropna().unique().tolist())
    return {"types": types}

@app.get("/api/stats/hp-range")
def get_hp_range():
    """Get min and max HP values for filtering"""
    min_hp = df["HP"].min()
    max_hp = df["HP"].max()
    return {
        "min": int(min_hp),
        "max": int(max_hp)
    }
