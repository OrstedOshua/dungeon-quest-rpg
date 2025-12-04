from flask import Flask, render_template, jsonify, request
from flask_cors import CORS
import sqlite3
import json
import random
from datetime import datetime

app = Flask(__name__)
CORS(app)

# Database initialization
def init_db():
    conn = sqlite3.connect('game.db')
    c = conn.cursor()
    
    # Players table
    c.execute('''CREATE TABLE IF NOT EXISTS players (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        username TEXT UNIQUE NOT NULL,
        level INTEGER DEFAULT 1,
        experience INTEGER DEFAULT 0,
        hp INTEGER DEFAULT 100,
        max_hp INTEGER DEFAULT 100,
        strength INTEGER DEFAULT 10,
        defense INTEGER DEFAULT 5,
        agility INTEGER DEFAULT 5,
        gold INTEGER DEFAULT 100,
        weapon TEXT DEFAULT 'Wooden Sword',
        armor TEXT DEFAULT 'Cloth Armor',
        accessory TEXT DEFAULT NULL,
        inventory TEXT DEFAULT '{}',
        skills TEXT DEFAULT '{}',
        completed_quests TEXT DEFAULT '[]',
        active_quest INTEGER DEFAULT NULL,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    )''')
    
    # Items table
    c.execute('''CREATE TABLE IF NOT EXISTS items (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        name TEXT UNIQUE NOT NULL,
        type TEXT NOT NULL,
        damage INTEGER DEFAULT 0,
        defense_bonus INTEGER DEFAULT 0,
        agility_bonus INTEGER DEFAULT 0,
        hp_bonus INTEGER DEFAULT 0,
        price INTEGER NOT NULL,
        required_level INTEGER DEFAULT 1,
        description TEXT
    )''')
    
    # Monsters table
    c.execute('''CREATE TABLE IF NOT EXISTS monsters (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        name TEXT NOT NULL,
        level INTEGER NOT NULL,
        hp INTEGER NOT NULL,
        strength INTEGER NOT NULL,
        defense INTEGER NOT NULL,
        exp_reward INTEGER NOT NULL,
        gold_reward INTEGER NOT NULL,
        loot_table TEXT
    )''')
    
    # Quests table
    c.execute('''CREATE TABLE IF NOT EXISTS quests (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        title TEXT NOT NULL,
        description TEXT NOT NULL,
        required_level INTEGER DEFAULT 1,
        objective_type TEXT NOT NULL,
        objective_target TEXT,
        objective_count INTEGER DEFAULT 1,
        reward_exp INTEGER NOT NULL,
        reward_gold INTEGER NOT NULL,
        reward_item TEXT
    )''')
    
    conn.commit()
    conn.close()
    
    # Add default items
    add_default_items()
    add_default_monsters()
    add_default_quests()

def add_default_items():
    conn = sqlite3.connect('game.db')
    c = conn.cursor()
    
    items = [
        # Weapons
        ('Wooden Sword', 'weapon', 5, 0, 0, 0, 0, 1, 'Basic wooden sword'),
        ('Iron Sword', 'weapon', 15, 0, 0, 0, 50, 3, 'Sturdy iron blade'),
        ('Steel Blade', 'weapon', 25, 0, 0, 0, 150, 5, 'Sharp steel weapon'),
        ('Dragon Slayer', 'weapon', 50, 0, 0, 0, 500, 10, 'Legendary sword'),
        
        # Armor
        ('Cloth Armor', 'armor', 0, 3, 0, 0, 0, 1, 'Simple cloth protection'),
        ('Leather Armor', 'armor', 0, 8, 0, 0, 40, 2, 'Light leather armor'),
        ('Iron Armor', 'armor', 0, 15, 0, 0, 120, 5, 'Heavy iron protection'),
        ('Dragon Scale', 'armor', 0, 30, 0, 0, 600, 12, 'Armor from dragon scales'),
        
        # Accessories
        ('Ring of Strength', 'accessory', 5, 0, 0, 0, 100, 3, '+5 Strength'),
        ('Amulet of Defense', 'accessory', 0, 5, 0, 0, 100, 3, '+5 Defense'),
        ('Boots of Speed', 'accessory', 0, 0, 5, 0, 100, 3, '+5 Agility'),
        ('Health Pendant', 'accessory', 0, 0, 0, 50, 150, 5, '+50 Max HP'),
        
        # Consumables
        ('Health Potion', 'consumable', 0, 0, 0, 50, 20, 1, 'Restores 50 HP'),
        ('Greater Health Potion', 'consumable', 0, 0, 0, 150, 50, 5, 'Restores 150 HP'),
    ]
    
    for item in items:
        try:
            c.execute('''INSERT OR IGNORE INTO items 
                (name, type, damage, defense_bonus, agility_bonus, hp_bonus, price, required_level, description)
                VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)''', item)
        except:
            pass
    
    conn.commit()
    conn.close()

def add_default_monsters():
    conn = sqlite3.connect('game.db')
    c = conn.cursor()
    
    monsters = [
        ('Слизень', 1, 30, 5, 2, 15, 10, json.dumps({'Health Potion': 0.3})),
        ('Гигантская крыса', 2, 50, 8, 3, 25, 15, json.dumps({'Health Potion': 0.4})),
        ('Гоблин', 3, 70, 12, 5, 40, 25, json.dumps({'Health Potion': 0.3, 'Iron Sword': 0.1})),
        ('Волк', 4, 90, 15, 6, 60, 35, json.dumps({'Health Potion': 0.5, 'Leather Armor': 0.1})),
        ('Орк', 6, 120, 20, 8, 100, 50, json.dumps({'Greater Health Potion': 0.3, 'Iron Sword': 0.15})),
        ('Темный рыцарь', 8, 180, 30, 12, 200, 80, json.dumps({'Greater Health Potion': 0.4, 'Steel Blade': 0.1})),
        ('Тролль', 10, 250, 40, 15, 350, 120, json.dumps({'Greater Health Potion': 0.5, 'Iron Armor': 0.15})),
        ('Дракон', 15, 500, 60, 20, 800, 300, json.dumps({'Dragon Slayer': 0.05, 'Dragon Scale': 0.1, 'Greater Health Potion': 0.8})),
    ]
    
    c.execute('DELETE FROM monsters')
    for monster in monsters:
        c.execute('''INSERT INTO monsters 
            (name, level, hp, strength, defense, exp_reward, gold_reward, loot_table)
            VALUES (?, ?, ?, ?, ?, ?, ?, ?)''', monster)
    
    conn.commit()
    conn.close()

def add_default_quests():
    conn = sqlite3.connect('game.db')
    c = conn.cursor()
    
    quests = [
        ('Первая охота', 'Победите 3 слизней', 1, 'kill', 'Слизень', 3, 50, 30, 'Health Potion'),
        ('Крысиная проблема', 'Очистите подвал от 5 крыс', 2, 'kill', 'Гигантская крыса', 5, 100, 50, None),
        ('Гоблинская угроза', 'Победите 4 гоблинов', 3, 'kill', 'Гоблин', 4, 150, 80, 'Iron Sword'),
        ('Охота на волков', 'Победите 3 волков', 4, 'kill', 'Волк', 3, 200, 100, 'Leather Armor'),
        ('Набег орков', 'Остановите орковский набег (победите 5 орков)', 6, 'kill', 'Орк', 5, 400, 200, 'Ring of Strength'),
        ('Темная башня', 'Победите темного рыцаря в башне', 8, 'kill', 'Темный рыцарь', 1, 600, 300, 'Steel Blade'),
        ('Логово тролля', 'Зачистите пещеру троллей (победите 2 троллей)', 10, 'kill', 'Тролль', 2, 1000, 500, 'Iron Armor'),
        ('Убийца драконов', 'Победите дракона и спасите деревню', 15, 'kill', 'Дракон', 1, 2000, 1000, 'Dragon Slayer'),
    ]
    
    c.execute('DELETE FROM quests')
    for quest in quests:
        c.execute('''INSERT INTO quests 
            (title, description, required_level, objective_type, objective_target, objective_count, reward_exp, reward_gold, reward_item)
            VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)''', quest)
    
    conn.commit()
    conn.close()

# Game logic functions
def get_player(username):
    conn = sqlite3.connect('game.db')
    conn.row_factory = sqlite3.Row
    c = conn.cursor()
    c.execute('SELECT * FROM players WHERE username = ?', (username,))
    player = c.fetchone()
    conn.close()
    return dict(player) if player else None

def create_player(username):
    conn = sqlite3.connect('game.db')
    c = conn.cursor()
    try:
        c.execute('INSERT INTO players (username) VALUES (?)', (username,))
        conn.commit()
        conn.close()
        return get_player(username)
    except sqlite3.IntegrityError:
        conn.close()
        return None

def calculate_stats(player):
    base_stats = {
        'hp': player['hp'],
        'max_hp': player['max_hp'],
        'strength': player['strength'],
        'defense': player['defense'],
        'agility': player['agility']
    }
    
    # Add equipment bonuses
    conn = sqlite3.connect('game.db')
    conn.row_factory = sqlite3.Row
    c = conn.cursor()
    
    for slot in ['weapon', 'armor', 'accessory']:
        if player[slot]:
            c.execute('SELECT * FROM items WHERE name = ?', (player[slot],))
            item = c.fetchone()
            if item:
                base_stats['strength'] += item['damage']
                base_stats['defense'] += item['defense_bonus']
                base_stats['agility'] += item['agility_bonus']
                base_stats['max_hp'] += item['hp_bonus']
    
    conn.close()
    return base_stats

def calculate_exp_for_level(level):
    return int(100 * (1.5 ** (level - 1)))

@app.route('/')
def index():
    return render_template('index.html')

@app.route('/api/player/create', methods=['POST'])
def api_create_player():
    data = request.json
    username = data.get('username', '').strip()
    
    if not username:
        return jsonify({'error': 'Username required'}), 400
    
    player = create_player(username)
    if player:
        return jsonify({'success': True, 'player': player})
    else:
        return jsonify({'error': 'Username already exists'}), 400

@app.route('/api/player/<username>', methods=['GET'])
def api_get_player(username):
    player = get_player(username)
    if player:
        stats = calculate_stats(player)
        player['current_stats'] = stats
        player['exp_for_next_level'] = calculate_exp_for_level(player['level'] + 1)
        return jsonify(player)
    else:
        return jsonify({'error': 'Player not found'}), 404

@app.route('/api/combat/start', methods=['POST'])
def api_start_combat():
    data = request.json
    username = data.get('username')
    
    player = get_player(username)
    if not player:
        return jsonify({'error': 'Player not found'}), 404
    
    # Select monster based on player level
    conn = sqlite3.connect('game.db')
    conn.row_factory = sqlite3.Row
    c = conn.cursor()
    
    level_range = (max(1, player['level'] - 2), player['level'] + 2)
    c.execute('SELECT * FROM monsters WHERE level BETWEEN ? AND ? ORDER BY RANDOM() LIMIT 1', level_range)
    monster_data = c.fetchone()
    conn.close()
    
    if not monster_data:
        return jsonify({'error': 'No suitable monster found'}), 404
    
    monster = dict(monster_data)
    stats = calculate_stats(player)
    
    return jsonify({
        'monster': monster,
        'player_stats': stats
    })

@app.route('/api/combat/attack', methods=['POST'])
def api_combat_attack():
    data = request.json
    username = data.get('username')
    monster_data = data.get('monster')
    
    player = get_player(username)
    if not player:
        return jsonify({'error': 'Player not found'}), 404
    
    stats = calculate_stats(player)
    
    # Player attacks
    player_damage = max(1, stats['strength'] + random.randint(-3, 3) - monster_data['defense'])
    monster_data['hp'] -= player_damage
    
    combat_log = [f"Вы нанесли {player_damage} урона {monster_data['name']}"]
    
    # Check if monster defeated
    if monster_data['hp'] <= 0:
        # Victory!
        loot_table = json.loads(monster_data['loot_table'])
        loot = []
        
        for item_name, chance in loot_table.items():
            if random.random() < chance:
                loot.append(item_name)
        
        # Update player
        conn = sqlite3.connect('game.db')
        c = conn.cursor()
        
        new_exp = player['experience'] + monster_data['exp_reward']
        new_gold = player['gold'] + monster_data['gold_reward']
        new_level = player['level']
        
        # Check level up
        exp_needed = calculate_exp_for_level(new_level + 1)
        leveled_up = False
        
        while new_exp >= exp_needed:
            new_level += 1
            new_exp -= exp_needed
            leveled_up = True
            exp_needed = calculate_exp_for_level(new_level + 1)
        
        # Add loot to inventory
        inventory = json.loads(player['inventory'])
        for item in loot:
            inventory[item] = inventory.get(item, 0) + 1
        
        if leveled_up:
            # Increase stats on level up
            new_max_hp = player['max_hp'] + 10
            new_strength = player['strength'] + 2
            new_defense = player['defense'] + 1
            new_agility = player['agility'] + 1
            
            c.execute('''UPDATE players SET level = ?, experience = ?, gold = ?, inventory = ?,
                max_hp = ?, hp = ?, strength = ?, defense = ?, agility = ?
                WHERE username = ?''',
                (new_level, new_exp, new_gold, json.dumps(inventory),
                 new_max_hp, new_max_hp, new_strength, new_defense, new_agility, username))
        else:
            c.execute('''UPDATE players SET experience = ?, gold = ?, inventory = ? WHERE username = ?''',
                (new_exp, new_gold, json.dumps(inventory), username))
        
        conn.commit()
        conn.close()
        
        return jsonify({
            'victory': True,
            'combat_log': combat_log + [f"{monster_data['name']} побежден!"],
            'rewards': {
                'exp': monster_data['exp_reward'],
                'gold': monster_data['gold_reward'],
                'loot': loot,
                'leveled_up': leveled_up,
                'new_level': new_level if leveled_up else None
            }
        })
    
    # Monster attacks back
    monster_damage = max(1, monster_data['strength'] + random.randint(-2, 2) - stats['defense'])
    new_hp = max(0, stats['hp'] - monster_damage)
    
    combat_log.append(f"{monster_data['name']} нанес вам {monster_damage} урона")
    
    # Update player HP
    conn = sqlite3.connect('game.db')
    c = conn.cursor()
    c.execute('UPDATE players SET hp = ? WHERE username = ?', (new_hp, username))
    conn.commit()
    conn.close()
    
    # Check if player defeated
    if new_hp <= 0:
        return jsonify({
            'defeat': True,
            'combat_log': combat_log + ["Вы были побеждены!"],
            'monster': monster_data
        })
    
    return jsonify({
        'combat_log': combat_log,
        'monster': monster_data,
        'player_hp': new_hp
    })

@app.route('/api/player/heal', methods=['POST'])
def api_heal_player():
    data = request.json
    username = data.get('username')
    
    player = get_player(username)
    if not player:
        return jsonify({'error': 'Player not found'}), 404
    
    stats = calculate_stats(player)
    cost = 20
    
    if player['gold'] < cost:
        return jsonify({'error': 'Not enough gold'}), 400
    
    conn = sqlite3.connect('game.db')
    c = conn.cursor()
    c.execute('UPDATE players SET hp = ?, gold = gold - ? WHERE username = ?',
        (stats['max_hp'], cost, username))
    conn.commit()
    conn.close()
    
    return jsonify({'success': True, 'new_hp': stats['max_hp'], 'gold_spent': cost})

@app.route('/api/shop/items', methods=['GET'])
def api_shop_items():
    conn = sqlite3.connect('game.db')
    conn.row_factory = sqlite3.Row
    c = conn.cursor()
    c.execute('SELECT * FROM items WHERE type != "consumable" ORDER BY required_level, price')
    items = [dict(row) for row in c.fetchall()]
    conn.close()
    return jsonify(items)

@app.route('/api/shop/buy', methods=['POST'])
def api_shop_buy():
    data = request.json
    username = data.get('username')
    item_name = data.get('item_name')
    
    player = get_player(username)
    if not player:
        return jsonify({'error': 'Player not found'}), 404
    
    conn = sqlite3.connect('game.db')
    conn.row_factory = sqlite3.Row
    c = conn.cursor()
    
    c.execute('SELECT * FROM items WHERE name = ?', (item_name,))
    item = c.fetchone()
    
    if not item:
        conn.close()
        return jsonify({'error': 'Item not found'}), 404
    
    if player['gold'] < item['price']:
        conn.close()
        return jsonify({'error': 'Not enough gold'}), 400
    
    if player['level'] < item['required_level']:
        conn.close()
        return jsonify({'error': 'Level too low'}), 400
    
    # Add to inventory or equip
    inventory = json.loads(player['inventory'])
    
    if item['type'] in ['weapon', 'armor', 'accessory']:
        # Auto-equip
        c.execute(f'UPDATE players SET {item["type"]} = ?, gold = gold - ? WHERE username = ?',
            (item_name, item['price'], username))
    else:
        inventory[item_name] = inventory.get(item_name, 0) + 1
        c.execute('UPDATE players SET inventory = ?, gold = gold - ? WHERE username = ?',
            (json.dumps(inventory), item['price'], username))
    
    conn.commit()
    conn.close()
    
    return jsonify({'success': True, 'item': dict(item)})

@app.route('/api/quests', methods=['GET'])
def api_get_quests():
    username = request.args.get('username')
    player = get_player(username)
    
    if not player:
        return jsonify({'error': 'Player not found'}), 404
    
    conn = sqlite3.connect('game.db')
    conn.row_factory = sqlite3.Row
    c = conn.cursor()
    
    c.execute('SELECT * FROM quests WHERE required_level <= ? ORDER BY required_level', (player['level'],))
    quests = [dict(row) for row in c.fetchall()]
    conn.close()
    
    completed = json.loads(player['completed_quests'])
    
    for quest in quests:
        quest['completed'] = quest['id'] in completed
        quest['active'] = quest['id'] == player['active_quest']
    
    return jsonify(quests)

if __name__ == '__main__':
    init_db()
    app.run(debug=True, host='0.0.0.0', port=5000)