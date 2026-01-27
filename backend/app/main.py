from fastapi import FastAPI, Query, Body
from fastapi.middleware.cors import CORSMiddleware
from app.database import search_pokemon, get_pokemon_by_name
from app.services.p_type import get_battle_advantages

app = FastAPI()

# CORS so frontend can call this api 
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# api routes
@app.get("/api/pokemon/search")
async def search_pokemon_route(q: str = Query(...)):
    results = search_pokemon(q)
    return {
        "pokemon": results,
        "count": len(results)
    }

@app.get("/api/pokemon/{name}")
async def get_pokemon_by_name_route(name: str):
    return get_pokemon_by_name(name)

@app.post("/api/pokemon/compare")
async def compare_pokemon(pokemon_names: list[str] = Body(...)):
    # get pokemon from db
    pokemon_list = []
    for name in pokemon_names:
        pokemon = get_pokemon_by_name(name)
        if pokemon is not None:
            pokemon_list.append(pokemon)
    
    if len(pokemon_list) == 0:
        return {"error": "No valid pokemon found"}
    
    # calulate advantages for each
    comparison_results = []
    for pokemon in pokemon_list:
        advantages = get_battle_advantages(pokemon, pokemon_list)
        result_item = {}
        result_item["pokemon"] = pokemon
        result_item["advantages"] = advantages
        comparison_results.append(result_item)
    
    return {"comparisons": comparison_results}