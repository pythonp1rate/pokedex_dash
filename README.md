# Pokédex Dashboard
(uni project) 

A pokemon dashboard where you can search and compare pokemon. Shows stats and type effectiveness stuff. Built with React for frontend, FastAPI for backend, and PostgreSQL for the database.

## Features

- Search for pokemon by name
- Compare up to 4 pokemon at once to see battle advantages
- Stats charts showing HP, Attack, Defense, Sp. Atk, Sp. Def, Speed
- See which pokemon are strong/weak against each other
- All 1215 pokemon stored in database

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
