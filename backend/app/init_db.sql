-- Run from project root with:
-- psql -h localhost -p 5433 -U postgres -d pokedex_db -f backend/app/init_db.sql

-- Always recreate the table so the script is repeatable
DROP TABLE IF EXISTS pokemon;

CREATE TABLE pokemon (
    id          INTEGER,
    name        TEXT,
    form        TEXT,
    type1       TEXT,
    type2       TEXT,
    total       INTEGER,
    hp          INTEGER,
    attack      INTEGER,
    defense     INTEGER,
    "Sp. Atk"   INTEGER,
    "Sp. Def"   INTEGER,
    speed       INTEGER,
    generation  INTEGER
);

-- CSV is mounted into the container at /tmp/Pokemon.csv by docker-compose.yml
COPY pokemon
FROM '/tmp/Pokemon.csv'
DELIMITER ','
CSV HEADER;

