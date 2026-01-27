import psycopg2

# database conection settings
DB_HOST = 'localhost'
DB_PORT = '5433'
DB_NAME = 'pokedex_db'
DB_USER = 'postgres'
DB_PASSWORD = 'postgres'

def get_db():
    # connect to database
    conn = psycopg2.connect(
        host=DB_HOST,
        port=DB_PORT,
        database=DB_NAME,
        user=DB_USER,
        password=DB_PASSWORD
    )
    return conn

def get_pokemon_by_name(name):
    conn = get_db()
    cursor = conn.cursor()  # gets results
    cursor.execute("SELECT id, name, form, type1, type2, total, hp, attack, defense, \"Sp. Atk\", \"Sp. Def\", speed, generation FROM pokemon WHERE LOWER(name) = LOWER(%s)", (name,))
    row = cursor.fetchone()  # get one row from the result
    cursor.close()
    conn.close()
    
    if row:
        # convert to dict with capitalized keys for frontend
        pokemon = {}
        pokemon['ID'] = row[0]
        pokemon['Name'] = row[1]
        pokemon['Form'] = row[2]
        pokemon['Type1'] = row[3]
        pokemon['Type2'] = row[4]
        pokemon['Total'] = row[5]
        pokemon['HP'] = row[6]
        pokemon['Attack'] = row[7]
        pokemon['Defense'] = row[8]
        pokemon['Sp. Atk'] = row[9]
        pokemon['Sp. Def'] = row[10]
        pokemon['Speed'] = row[11]
        pokemon['Generation'] = row[12]
        return pokemon
    return None

def search_pokemon(query):
    conn = get_db()
    cursor = conn.cursor()
    cursor.execute("SELECT id, name, form, type1, type2, total, hp, attack, defense, \"Sp. Atk\", \"Sp. Def\", speed, generation FROM pokemon WHERE LOWER(name) LIKE LOWER(%s)", (f'%{query}%',))
    rows = cursor.fetchall()
    cursor.close()
    conn.close()
    
    result = []
    for row in rows:
        # convert each row to dict
        pokemon = {}
        pokemon['ID'] = row[0]
        pokemon['Name'] = row[1]
        pokemon['Form'] = row[2]
        pokemon['Type1'] = row[3]
        pokemon['Type2'] = row[4]
        pokemon['Total'] = row[5]
        pokemon['HP'] = row[6]
        pokemon['Attack'] = row[7]
        pokemon['Defense'] = row[8]
        pokemon['Sp. Atk'] = row[9]
        pokemon['Sp. Def'] = row[10]
        pokemon['Speed'] = row[11]
        pokemon['Generation'] = row[12]
        result.append(pokemon)
    return result

def get_all_pokemon(filters=None):
    conn = get_db()
    cursor = conn.cursor()
    
    if filters and 'type' in filters:
        filter_type = filters['type']
        cursor.execute("SELECT id, name, form, type1, type2, total, hp, attack, defense, \"Sp. Atk\", \"Sp. Def\", speed, generation FROM pokemon WHERE type1 = %s", (filter_type,))
    else:
        cursor.execute("SELECT id, name, form, type1, type2, total, hp, attack, defense, \"Sp. Atk\", \"Sp. Def\", speed, generation FROM pokemon")
    
    rows = cursor.fetchall()
    cursor.close()
    conn.close()
    
    result = []
    for row in rows:
        pokemon = {}
        pokemon['ID'] = row[0]
        pokemon['Name'] = row[1]
        pokemon['Form'] = row[2]
        pokemon['Type1'] = row[3]
        pokemon['Type2'] = row[4]
        pokemon['Total'] = row[5]
        pokemon['HP'] = row[6]
        pokemon['Attack'] = row[7]
        pokemon['Defense'] = row[8]
        pokemon['Sp. Atk'] = row[9]
        pokemon['Sp. Def'] = row[10]
        pokemon['Speed'] = row[11]
        pokemon['Generation'] = row[12]
        result.append(pokemon)
    return result

def get_stats_summary():
    # get some stats about pokemon
    conn = get_db()
    cursor = conn.cursor()
    
    stats = {}
    cursor.execute("SELECT AVG(total), MAX(total), MIN(total) FROM pokemon")
    row = cursor.fetchone()
    if row:
        stats['total'] = {
            'avg_total': row[0],
            'max_total': row[1],
            'min_total': row[2]
        }
    
    cursor.execute("SELECT type1, COUNT(*) FROM pokemon GROUP BY type1 ORDER BY COUNT(*) DESC")
    rows = cursor.fetchall()
    stats['type_distribution'] = []
    for row in rows:
        stats['type_distribution'].append({
            'type1': row[0],
            'count': row[1]
        })
    
    cursor.close()
    conn.close()
    return stats
