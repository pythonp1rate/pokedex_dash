<img width="1024" height="1024" alt="pokemonindex" src="https://github.com/user-attachments/assets/125d9427-dd1e-4133-b87c-8d19ce9f2713" />


## Pokédex

**Uni Project**
A pokemon dashboard where you can search and compare pokemon. Shows stats and type effectiveness stuff. Built with React for frontend, FastAPI for backend, and PostgreSQL for the database.

<img width="1499" height="865" alt="image" src="https://github.com/user-attachments/assets/f73da3f6-5b02-46ab-920a-7b04e3266c21" />


## Features
<img width="540" height="184" alt="image" src="https://github.com/user-attachments/assets/f9f82597-8e34-4d57-83b3-36ba8d199550" />


- Search for pokemon by name  
- Compare up to 4 pokemon at once to see battle advantages
- Stats charts showing HP, Attack, Defense, Sp. Atk, Sp. Def, Speed 
- See which pokemon are strong/weak against each other
- All 1215 pokemon stored in database


<img width="1782" height="905" alt="image" src="https://github.com/user-attachments/assets/cbe86335-5c47-4780-b06d-4f727bc1b0e7" />


## Tech Stack

Frontend: React with Vite, Recharts for charts
Backend: FastAPI (Python), PostgreSQL database
Docker for running the database

## Project Structure

```
pokedex_dash/
├── backend/
│   ├── app/
│   │   ├── main.py          # API routes
│   │   ├── database.py      # database stuff
│   │   └── services/
│   │       └── p_type.py    # type effectiveness logic
│   └── requirements.txt
├── frontend/
│   ├── src/
│   │   ├── App.jsx
│   │   ├── components/
│   │   └── services/
│   │       └── api.js
│   └── package.json
├── data/
│   └── Pokemon.csv
└── docker-compose.yml
```

## Dataset

Uses Pokemon.csv with stats for 1215 pokemon including HP, Attack, Defense, Sp. Atk, Sp. Def, Speed, types, and generation info.

## Technologies

React, FastAPI, PostgreSQL, Docker, Recharts, Vite
