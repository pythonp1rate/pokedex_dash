from fastapi import FastAPI, Query
from fastapi.middleware.cors import CORSMiddleware
import pandas as pd
from pathlib import Path

app = FastAPI()

# CORS so frontend can call this api
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# load csv data
csv_path = Path(__file__).parent.parent.parent / "data" / "Pokemon.csv"
df = pd.read_csv(csv_path)

@app.get("/")
def root():
    return {"message": "Pokemon API is running!"}

@app.get("/api/pokemon/search")
def search_pokemon(q: str = Query(..., description="Search term for pokemon name")):
    if not q:
        return {"pokemon": [], "message": "No search term provided"}
    
    result = df[df["Name"].str.contains(q, case=False, na=False)]
    
    if result.empty:
        return {"pokemon": [], "message": "No Pokémon found!"}
    
    return {
        "pokemon": result.to_dict(orient="records"),
        "count": len(result)
    }

