// Game Data
const ITEMS = [
    // Weapons
    {name: 'Деревянный меч', type: 'weapon', damage: 5, price: 0, level: 1, desc: 'Базовое оружие'},
    {name: 'Железный меч', type: 'weapon', damage: 15, price: 50, level: 3, desc: 'Прочный железный клинок'},
    {name: 'Стальной клинок', type: 'weapon', damage: 25, price: 150, level: 5, desc: 'Острое стальное оружие'},
    {name: 'Боевой топор', type: 'weapon', damage: 35, price: 250, level: 7, desc: 'Тяжелый топор для ближнего боя'},
    {name: 'Молот паладина', type: 'weapon', damage: 45, price: 400, level: 9, desc: 'Освященный боевой молот'},
    {name: 'Драконобоец', type: 'weapon', damage: 60, price: 700, level: 12, desc: 'Легендарный меч'},
    
    // Armor
    {name: 'Тканевая броня', type: 'armor', defense: 3, price: 0, level: 1, desc: 'Простая защита'},
    {name: 'Кожаная броня', type: 'armor', defense: 8, price: 40, level: 2, desc: 'Легкая кожаная защита'},
    {name: 'Железная броня', type: 'armor', defense: 15, price: 120, level: 5, desc: 'Тяжелая железная защита'},
    {name: 'Стальная броня', type: 'armor', defense: 22, price: 220, level: 7, desc: 'Усиленная стальная броня'},
    {name: 'Чёрный кирас', type: 'armor', defense: 28, price: 350, level: 9, desc: 'Тёмная усиленная броня'},
    {name: 'Драконья чешуя', type: 'armor', defense: 40, price: 800, level: 13, desc: 'Броня из чешуи дракона'},
    
    // Accessories
    {name: 'Кольцо силы', type: 'accessory', damage: 5, price: 100, level: 3, desc: '+5 Силы'},
    {name: 'Амулет защиты', type: 'accessory', defense: 5, price: 100, level: 3, desc: '+5 Защиты'},
    {name: 'Сапоги скорости', type: 'accessory', agility: 5, price: 100, level: 3, desc: '+5 Ловкости'},
    {name: 'Кулон здоровья', type: 'accessory', hp: 50, price: 150, level: 5, desc: '+50 Макс. HP'},
    {name: 'Пояс берсерка', type: 'accessory', damage: 8, defense: -2, price: 200, level: 6, desc: '+8 Силы, -2 Защиты'},
    {name: 'Щит веры', type: 'accessory', defense: 10, hp: 30, price: 260, level: 8, desc: '+10 Защиты, +30 HP'},
    
    // Consumables
    {name: 'Зелье здоровья', type: 'consumable', heal: 50, price: 20, level: 1, desc: 'Восстанавливает 50 HP'},
    {name: 'Большое зелье', type: 'consumable', heal: 150, price: 50, level: 5, desc: 'Восстанавливает 150 HP'},
    {name: 'Эликсир героя', type: 'consumable', heal: 300, price: 120, level: 8, desc: 'Сильно восстанавливает здоровье'}
];

const MONSTERS = [
    {name: 'Слизень', level: 1, hp: 30, strength: 5, defense: 2, exp: 15, gold: 10, loot: {'Зелье здоровья': 0.3}},
    {name: 'Крысиный вор', level: 1, hp: 35, strength: 6, defense: 1, exp: 18, gold: 15, loot: {'Зелье здоровья': 0.25}},
    {name: 'Гигантская крыса', level: 2, hp: 50, strength: 8, defense: 3, exp: 25, gold: 15, loot: {'Зелье здоровья': 0.4}},
    {name: 'Гоблин', level: 3, hp: 70, strength: 12, defense: 5, exp: 40, gold: 25, loot: {'Зелье здоровья': 0.3, 'Железный меч': 0.1}},
    {name: 'Гоблин-ремесленник', level: 4, hp: 80, strength: 13, defense: 6, exp: 55, gold: 35, loot: {'Кожаная броня': 0.15, 'Зелье здоровья': 0.4}},
    {name: 'Волк', level: 4, hp: 90, strength: 15, defense: 6, exp: 60, gold: 35, loot: {'Зелье здоровья': 0.5, 'Кожаная броня': 0.1}},
    {name: 'Ледяной волк', level: 5, hp: 110, strength: 18, defense: 7, exp: 80, gold: 45, loot: {'Стальной клинок': 0.1, 'Большое зелье': 0.4}},
    {name: 'Орк', level: 6, hp: 130, strength: 22, defense: 8, exp: 110, gold: 60, loot: {'Большое зелье': 0.3, 'Железный меч': 0.15}},
    {name: 'Орк-берсерк', level: 7, hp: 160, strength: 28, defense: 9, exp: 150, gold: 80, loot: {'Боевой топор': 0.12}},
    {name: 'Темный рыцарь', level: 8, hp: 200, strength: 32, defense: 12, exp: 220, gold: 90, loot: {'Большое зелье': 0.4, 'Стальной клинок': 0.1, 'Стальная броня': 0.1}},
    {name: 'Призрачный страж', level: 9, hp: 220, strength: 34, defense: 14, exp: 260, gold: 110, loot: {'Чёрный кирас': 0.12, 'Щит веры': 0.15}},
    {name: 'Тролль', level: 10, hp: 260, strength: 40, defense: 15, exp: 360, gold: 140, loot: {'Большое зелье': 0.5, 'Железная броня': 0.15}},
    {name: 'Горный тролль', level: 11, hp: 310, strength: 45, defense: 18, exp: 450, gold: 180, loot: {'Эликсир героя': 0.4, 'Пояс берсерка': 0.15}},
    {name: 'Дракон', level: 15, hp: 550, strength: 65, defense: 22, exp: 850, gold: 320, loot: {'Драконобоец': 0.06, 'Драконья чешуя': 0.12, 'Большое зелье': 0.8, 'Эликсир героя': 0.6}}
];

const QUESTS = [
    {id: 1, title: 'Первая охота', desc: 'Победите 3 слизней', level: 1, target: 'Слизень', count: 3, exp: 50, gold: 30, item: 'Зелье здоровья'},
    {id: 2, title: 'Крысиная проблема', desc: 'Очистите подвал от 5 крыс', level: 2, target: 'Гигантская крыса', count: 5, exp: 100, gold: 50},
    {id: 3, title: 'Гоблинская угроза', desc: 'Победите 4 гоблинов', level: 3, target: 'Гоблин', count: 4, exp: 150, gold: 80, item: 'Железный меч'},
    {id: 4, title: 'Охота на волков', desc: 'Победите 3 волков', level: 4, target: 'Волк', count: 3, exp: 200, gold: 100, item: 'Кожаная броня'},
    {id: 5, title: 'Набег орков', desc: 'Остановите орков (5 орков)', level: 6, target: 'Орк', count: 5, exp: 400, gold: 200, item: 'Кольцо силы'},
    {id: 6, title: 'Темная башня', desc: 'Победите темного рыцаря', level: 8, target: 'Темный рыцарь', count: 1, exp: 600, gold: 300, item: 'Стальной клинок'},
    {id: 7, title: 'Логово тролля', desc: 'Зачистите пещеру (2 тролля)', level: 10, target: 'Тролль', count: 2, exp: 1000, gold: 500, item: 'Железная броня'},
    {id: 8, title: 'Убийца драконов', desc: 'Победите дракона', level: 15, target: 'Дракон', count: 1, exp: 2000, gold: 1000, item: 'Драконобоец'}
];

const DUNGEONS = [
    {
        id: 1,
        name: 'Забытые катакомбы',
        level: 3,
        floors: [
            {name: 'Склеп', monsters: ['Слизень', 'Слизень', 'Крысиный вор']},
            {name: 'Зал теней', monsters: ['Гигантская крыса', 'Гигантская крыса']},
            {name: 'Комната хранителя', boss: {name: 'Король крыс', level: 4, hp: 150, strength: 18, defense: 8}}
        ],
        rewards: {exp: 200, gold: 150, items: ['Большое зелье', 'Кожаная броня']}
    },
    {
        id: 2,
        name: 'Логово гоблинов',
        level: 5,
        floors: [
            {name: 'Входная пещера', monsters: ['Гоблин', 'Гоблин']},
            {name: 'Рудник', monsters: ['Гоблин-ремесленник', 'Гоблин', 'Гоблин']},
            {name: 'Тронный зал', boss: {name: 'Гоблин-вождь', level: 6, hp: 220, strength: 26, defense: 10}}
        ],
        rewards: {exp: 350, gold: 250, items: ['Железный меч', 'Железная броня', 'Большое зелье']}
    },
    {
        id: 3,
        name: 'Ледяная крепость',
        level: 7,
        floors: [
            {name: 'Ледяной коридор', monsters: ['Ледяной волк', 'Ледяной волк']},
            {name: 'Замерзший зал', monsters: ['Ледяной волк', 'Орк', 'Ледяной волк']},
            {name: 'Трон льда', boss: {name: 'Ледяной король', level: 8, hp: 350, strength: 38, defense: 14}}
        ],
        rewards: {exp: 600, gold: 400, items: ['Стальной клинок', 'Стальная броня', 'Эликсир героя']}
    },
    {
        id: 4,
        name: 'Темная башня',
        level: 10,
        floors: [
            {name: 'Первый этаж', monsters: ['Темный рыцарь', 'Призрачный страж']},
            {name: 'Второй этаж', monsters: ['Призрачный страж', 'Призрачный страж']},
            {name: 'Третий этаж', monsters: ['Темный рыцарь', 'Тролль']},
            {name: 'Вершина башни', boss: {name: 'Темный маг', level: 12, hp: 500, strength: 50, defense: 18}}
        ],
        rewards: {exp: 1200, gold: 700, items: ['Молот паладина', 'Чёрный кирас', 'Эликсир героя', 'Эликсир героя']}
    },
    {
        id: 5,
        name: 'Драконье логово',
        level: 14,
        floors: [
            {name: 'Пещера сокровищ', monsters: ['Тролль', 'Горный тролль']},
            {name: 'Зал пламени', monsters: ['Горный тролль', 'Горный тролль', 'Тролль']},
            {name: 'Логово дракона', boss: {name: 'Древний дракон', level: 16, hp: 800, strength: 75, defense: 25}}
        ],
        rewards: {exp: 2500, gold: 1500, items: ['Драконобоец', 'Драконья чешуя', 'Эликсир героя', 'Эликсир героя', 'Эликсир героя']}
    }
];

// Game State
let player = null;
let currentMonster = null;
let inCombat = false;
let currentDungeon = null;
let currentFloor = 0;
let currentMonsterIndex = 0;
let inDungeon = false;

// Tab Switching
function switchTab(evt, tabName) {
    document.querySelectorAll('.tab-content').forEach(tab => tab.classList.remove('active'));
    document.querySelectorAll('.tab-button').forEach(btn => btn.classList.remove('active'));
    document.getElementById(tabName + 'Tab').classList.add('active');
    evt.currentTarget.classList.add('active');
    
    if (tabName === 'dungeons') {
        loadDungeons();
    }
}

// Initialize
function initGame() {
    const savedPlayer = localStorage.getItem('dungeonQuestPlayer');
    if (savedPlayer) {
        // Можно сделать автологин позже
    }
}

// Save/Load
function savePlayer() {
    localStorage.setItem('dungeonQuestPlayer', JSON.stringify(player));
}

function loadPlayer(username) {
    const saved = localStorage.getItem('dungeonQuestPlayer');
    if (saved) {
        const data = JSON.parse(saved);
        if (data.username === username) {
            return data;
        }
    }
    return null;
}

// Login
function login() {
    const username = document.getElementById('username').value.trim();
    if (!username) {
        alert('Введите имя персонажа!');
        return;
    }

    player = loadPlayer(username);
    if (!player) {
        player = {
            username: username,
            level: 1,
            experience: 0,
            hp: 100,
            maxHp: 100,
            strength: 10,
            defense: 5,
            agility: 5,
            gold: 100,
            weapon: 'Деревянный меч',
            armor: 'Тканевая броня',
            accessory: null,
            inventory: {},
            completedQuests: [],
            completedDungeons: [],
            killCount: {}
        };
    }

    // Ensure backward compatibility
    if (!player.completedDungeons) {
        player.completedDungeons = [];
    }

    document.getElementById('loginScreen').classList.add('hidden');
    document.getElementById('gameScreen').classList.remove('hidden');
    updateUI();
    loadShop();
    loadQuests();
    loadDungeons();
}

// Calculate stats with equipment
function getStats() {
    let stats = {
        hp: player.hp,
        maxHp: player.maxHp,
        strength: player.strength,
        defense: player.defense,
        agility: player.agility
    };

    [player.weapon, player.armor, player.accessory].forEach(equipName => {
        if (equipName) {
            const item = ITEMS.find(i => i.name === equipName);
            if (item) {
                stats.strength += item.damage || 0;
                stats.defense += item.defense || 0;
                stats.agility += item.agility || 0;
                stats.maxHp += item.hp || 0;
            }
        }
    });

    return stats;
}

// Update UI
function updateUI() {
    const stats = getStats();
    
    document.getElementById('playerName').textContent = player.username;
    document.getElementById('playerLevel').textContent = player.level;
    document.getElementById('playerGold').textContent = player.gold;
    
    const expNeeded = Math.floor(100 * Math.pow(1.5, player.level - 1));
    document.getElementById('playerExpText').textContent = `${player.experience} / ${expNeeded}`;
    const expPercent = (player.experience / expNeeded) * 100;
    document.getElementById('expBar').style.width = `${Math.min(100, expPercent)}%`;
    document.getElementById('expBar').textContent = `${player.experience} / ${expNeeded}`;
    
    document.getElementById('playerHpText').textContent = `${player.hp} / ${stats.maxHp}`;
    const hpPercent = (player.hp / stats.maxHp) * 100;
    document.getElementById('hpBar').style.width = `${Math.max(0, hpPercent)}%`;
    document.getElementById('hpBar').textContent = `${player.hp} / ${stats.maxHp}`;
    
    document.getElementById('playerStrength').textContent = stats.strength;
    document.getElementById('playerDefense').textContent = stats.defense;
    document.getElementById('playerAgility').textContent = stats.agility;
    
    document.getElementById('equippedWeapon').textContent = player.weapon || 'Нет';
    document.getElementById('equippedArmor').textContent = player.armor || 'Нет';
    document.getElementById('equippedAccessory').textContent = player.accessory || 'Нет';
    
    // Inventory with action buttons
    const invDiv = document.getElementById('inventoryItems');
    invDiv.innerHTML = '';
    const hasItems = Object.keys(player.inventory).length > 0;
    
    if (hasItems) {
        for (const [item, count] of Object.entries(player.inventory)) {
            const itemDiv = document.createElement('div');
            itemDiv.className = 'inventory-item';
            const itemData = ITEMS.find(i => i.name === item);
            
            let statsHtml = '';
            if (itemData) {
                if (itemData.damage) statsHtml += `⚔️ +${itemData.damage} `;
                if (itemData.defense) statsHtml += `🛡️ +${itemData.defense} `;
                if (itemData.heal) statsHtml += `❤️ +${itemData.heal} `;
            }
            
            let buttonHtml = '';
            if (itemData) {
                if (itemData.type === 'consumable') {
                    buttonHtml = `<button class="btn btn-success btn-small" onclick="useItem('${item}')">️ Выпить</button>`;
                } else if (itemData.type === 'weapon') {
                    const isEquipped = player.weapon === item;
                    buttonHtml = isEquipped 
                        ? `<button class="btn btn-secondary btn-small" onclick="unequipItem('weapon')">✖ Снять</button>`
                        : `<button class="btn btn-success btn-small" onclick="equipItem('${item}')">✔ Экипировать</button>`;
                } else if (itemData.type === 'armor') {
                    const isEquipped = player.armor === item;
                    buttonHtml = isEquipped 
                        ? `<button class="btn btn-secondary btn-small" onclick="unequipItem('armor')">✖ Снять</button>`
                        : `<button class="btn btn-success btn-small" onclick="equipItem('${item}')">✔ Экипировать</button>`;
                } else if (itemData.type === 'accessory') {
                    const isEquipped = player.accessory === item;
                    buttonHtml = isEquipped 
                        ? `<button class="btn btn-secondary btn-small" onclick="unequipItem('accessory')">✖ Снять</button>`
                        : `<button class="btn btn-success btn-small" onclick="equipItem('${item}')">✔ Экипировать</button>`;
                }
            }
            
            itemDiv.innerHTML = `
                <div class="inventory-item-name">${item}</div>
                <div class="inventory-item-desc">${statsHtml}</div>
                <span class="item-count">x${count}</span>
                ${buttonHtml}
            `;
            invDiv.appendChild(itemDiv);
        }
    } else {
        invDiv.innerHTML = '<div class="empty-state">Инвентарь пуст<br>🎒<br>Побеждайте монстров, чтобы получить предметы!</div>';
    }
    
    savePlayer();
}

// Equip item from inventory
function equipItem(itemName) {
    const item = ITEMS.find(i => i.name === itemName);
    if (!item) return;
    
    if (!player.inventory[itemName] || player.inventory[itemName] <= 0) {
        alert('У вас нет этого предмета!');
        return;
    }
    
    if (player.level < item.level) {
        alert(`Нужен уровень ${item.level}!`);
        return;
    }
    
    if (item.type === 'weapon') {
        player.weapon = itemName;
    } else if (item.type === 'armor') {
        player.armor = itemName;
    } else if (item.type === 'accessory') {
        player.accessory = itemName;
    }
    
    // Remove from inventory
    player.inventory[itemName]--;
    if (player.inventory[itemName] <= 0) {
        delete player.inventory[itemName];
    }
    
    updateUI();
    alert(`✅ Экипировано: ${itemName}`);
}

// Unequip item
function unequipItem(slot) {
    let itemName = null;
    if (slot === 'weapon') {
        itemName = player.weapon;
        player.weapon = 'Деревянный меч';
    } else if (slot === 'armor') {
        itemName = player.armor;
        player.armor = 'Тканевая броня';
    } else if (slot === 'accessory') {
        itemName = player.accessory;
        player.accessory = null;
    }
    
    if (itemName && itemName !== 'Деревянный меч' && itemName !== 'Тканевая броня') {
        player.inventory[itemName] = (player.inventory[itemName] || 0) + 1;
    }
    
    updateUI();
    alert(`✅ Снято: ${itemName}`);
}

// Use consumable item
function useItem(itemName) {
    const item = ITEMS.find(i => i.name === itemName);
    if (!item || item.type !== 'consumable') return;
    
    if (!player.inventory[itemName] || player.inventory[itemName] <= 0) {
        alert('У вас нет этого предмета!');
        return;
    }
    
    const stats = getStats();
    if (player.hp >= stats.maxHp) {
        alert('У вас полное здоровье!');
        return;
    }
    
    player.hp = Math.min(stats.maxHp, player.hp + item.heal);
    player.inventory[itemName]--;
    if (player.inventory[itemName] <= 0) {
        delete player.inventory[itemName];
    }
    
    updateUI();
    alert(`✅ Использовано: ${itemName}\n❤️ Восстановлено ${item.heal} HP`);
}

// Start Combat
function startCombat() {
    if (inCombat) return;
    
    const availableMonsters = MONSTERS.filter(m => 
        m.level >= player.level - 2 && m.level <= player.level + 2
    );
    
    if (availableMonsters.length === 0) {
        currentMonster = MONSTERS[0];
    } else {
        currentMonster = JSON.parse(JSON.stringify(
            availableMonsters[Math.floor(Math.random() * availableMonsters.length)]
        ));
    }
    
    currentMonster.maxHp = currentMonster.hp;
    inCombat = true;
    
    document.getElementById('combatArea').classList.remove('hidden');
    document.getElementById('monsterName').textContent = currentMonster.name;
    document.getElementById('monsterLevel').textContent = currentMonster.level;
    document.getElementById('monsterStrength').textContent = currentMonster.strength;
    document.getElementById('monsterDefense').textContent = currentMonster.defense;
    updateMonsterHP();
    
    document.getElementById('combatLog').innerHTML = '<div class="log-entry">⚔️ Бой начался!</div>';
    document.getElementById('rewardDisplay').classList.add('hidden');
    
    // In combat - attack button
    const attackBtn = document.getElementById('attackButton');
    attackBtn.textContent = '⚔️ Атаковать';
    attackBtn.onclick = attack;
}

function updateMonsterHP() {
    document.getElementById('monsterHpText').textContent = `${Math.max(0, currentMonster.hp)} / ${currentMonster.maxHp}`;
    const hpPercent = (currentMonster.hp / currentMonster.maxHp) * 100;
    document.getElementById('monsterHpBar').style.width = `${Math.max(0, hpPercent)}%`;
    document.getElementById('monsterHpBar').textContent = `${Math.max(0, currentMonster.hp)} HP`;
}

// Attack
function attack() {
    if (!inCombat) return;
    
    const stats = getStats();
    
    // Player attacks
    const playerDmg = Math.max(1, stats.strength + Math.floor(Math.random() * 7) - 3 - currentMonster.defense);
    currentMonster.hp -= playerDmg;
    
    addLog(`💥 Вы нанесли ${playerDmg} урона ${currentMonster.name}`);
    updateMonsterHP();
    
    // Check monster defeated
    if (currentMonster.hp <= 0) {
        victory();
        return;
    }
    
    // Monster attacks
    const monsterDmg = Math.max(1, currentMonster.strength + Math.floor(Math.random() * 5) - 2 - stats.defense);
    player.hp -= monsterDmg;
    player.hp = Math.max(0, player.hp);
    
    addLog(`🗡️ ${currentMonster.name} нанес вам ${monsterDmg} урона`);
    updateUI();
    
    // Check player defeated
    if (player.hp <= 0) {
        defeat();
    }
}

function addLog(text) {
    const logDiv = document.getElementById('combatLog');
    const entry = document.createElement('div');
    entry.className = 'log-entry';
    entry.textContent = text;
    logDiv.appendChild(entry);
    logDiv.scrollTop = logDiv.scrollHeight;
}

function victory() {
    inCombat = false;
    addLog(`✅ ${currentMonster.name} повержен!`);
    
    // Calculate rewards
    const loot = [];
    for (const [itemName, chance] of Object.entries(currentMonster.loot)) {
        if (Math.random() < chance) {
            loot.push(itemName);
            player.inventory[itemName] = (player.inventory[itemName] || 0) + 1;
        }
    }
    
    player.experience += currentMonster.exp;
    player.gold += currentMonster.gold;
    
    // Track kills for quests
    player.killCount[currentMonster.name] = (player.killCount[currentMonster.name] || 0) + 1;
    
    // Check level up
    const expNeeded = Math.floor(100 * Math.pow(1.5, player.level - 1));
    let leveledUp = false;
    
    while (player.experience >= expNeeded) {
        player.level++;
        player.experience -= expNeeded;
        player.maxHp += 10;
        player.strength += 2;
        player.defense += 1;
        player.agility += 1;
        player.hp = getStats().maxHp;
        leveledUp = true;
    }
    
    // Show rewards
    const rewardDiv = document.getElementById('rewardDisplay');
    rewardDiv.classList.remove('hidden');
    rewardDiv.innerHTML = `
        <h3>🎉 Победа!</h3>
        <div class="reward-item">💰 Золото: +${currentMonster.gold}</div>
        <div class="reward-item">⭐ Опыт: +${currentMonster.exp}</div>
        ${leveledUp ? `<div class="reward-item" style="color: var(--success); font-weight: bold;">🎊 Новый уровень: ${player.level}!</div>` : ''}
        ${loot.length > 0 ? `<div class="reward-item">🎁 Добыча: ${loot.join(', ')}</div>` : ''}
    `;
    
    updateUI();
    loadQuests();
    
    // After victory - search button
    const attackBtn = document.getElementById('attackButton');
    attackBtn.textContent = '🗡️ Искать противника';
    attackBtn.onclick = startCombat;
}

function defeat() {
    inCombat = false;
    addLog('💀 Вы были побеждены!');
    alert('Вы были побеждены! Вас вылечили в городе.');
    player.hp = getStats().maxHp;
    document.getElementById('combatArea').classList.add('hidden');
    updateUI();
    
    const attackBtn = document.getElementById('attackButton');
    attackBtn.textContent = '⚔️ Атаковать';
    attackBtn.onclick = attack;
}

function fleeCombat() {
    inCombat = false;
    currentMonster = null;
    document.getElementById('combatArea').classList.add('hidden');
    
    const attackBtn = document.getElementById('attackButton');
    attackBtn.textContent = '⚔️ Атаковать';
    attackBtn.onclick = attack;
}

// Heal
function healPlayer() {
    const cost = 20;
    if (player.gold < cost) {
        alert('Недостаточно золота!');
        return;
    }
    
    const stats = getStats();
    if (player.hp >= stats.maxHp) {
        alert('У вас полное здоровье!');
        return;
    }
    
    player.gold -= cost;
    player.hp = stats.maxHp;
    updateUI();
    alert(`✅ Вы восстановили здоровье за ${cost} золота`);
}

// Shop
function loadShop() {
    const shopDiv = document.getElementById('shopItems');
    shopDiv.innerHTML = '';
    
    const shopItems = ITEMS.filter(item => item.type !== 'consumable').concat(
        ITEMS.filter(item => item.type === 'consumable')
    );
    
    if (shopItems.length === 0) {
        shopDiv.innerHTML = '<div class="empty-state">Магазин пуст</div>';
        return;
    }
    
    shopItems.forEach(item => {
        const itemDiv = document.createElement('div');
        itemDiv.className = 'shop-item';
        
        const stats = [];
        if (item.damage) stats.push(`⚔️ Урон: +${item.damage}`);
        if (item.defense) stats.push(`🛡️ Защита: +${item.defense}`);
        if (item.agility) stats.push(`⚡ Ловкость: +${item.agility}`);
        if (item.hp) stats.push(`❤️ HP: +${item.hp}`);
        if (item.heal) stats.push(`❤️ Лечение: ${item.heal}`);
        
        const canBuy = player.level >= item.level && player.gold >= item.price;
        
        itemDiv.innerHTML = `
            <div class="item-info">
                <div class="item-name">${item.name}</div>
                <div class="item-stats">${stats.join(' | ')}</div>
                <div class="item-stats">Требуемый уровень: ${item.level}</div>
            </div>
            <div>
                ${item.price > 0 ? `<span class="item-price">💰 ${item.price}</span>` : ''}
                <button class="btn btn-secondary btn-small" onclick="buyItem('${item.name}')" ${!canBuy ? 'disabled' : ''}>
                    Купить
                </button>
            </div>
        `;
        
        shopDiv.appendChild(itemDiv);
    });
}

function buyItem(itemName) {
    const item = ITEMS.find(i => i.name === itemName);
    if (!item) return;
    
    if (player.gold < item.price) {
        alert('Недостаточно золота!');
        return;
    }
    
    if (player.level < item.level) {
        alert('Ваш уровень слишком низкий!');
        return;
    }
    
    player.gold -= item.price;
    
    if (item.type === 'weapon') {
        // Put old weapon to inventory
        if (player.weapon && player.weapon !== 'Деревянный меч') {
            player.inventory[player.weapon] = (player.inventory[player.weapon] || 0) + 1;
        }
        player.weapon = item.name;
    } else if (item.type === 'armor') {
        // Put old armor to inventory
        if (player.armor && player.armor !== 'Тканевая броня') {
            player.inventory[player.armor] = (player.inventory[player.armor] || 0) + 1;
        }
        player.armor = item.name;
    } else if (item.type === 'accessory') {
        // Put old accessory to inventory
        if (player.accessory) {
            player.inventory[player.accessory] = (player.inventory[player.accessory] || 0) + 1;
        }
        player.accessory = item.name;
    } else if (item.type === 'consumable') {
        player.inventory[item.name] = (player.inventory[item.name] || 0) + 1;
    }
    
    updateUI();
    loadShop();
    alert(`✅ Куплено: ${item.name}`);
}

// Quests
function loadQuests() {
    const questDiv = document.getElementById('questList');
    questDiv.innerHTML = '';
    
    const availableQuests = QUESTS.filter(q => q.level <= player.level);
    
    if (availableQuests.length === 0) {
        questDiv.innerHTML = '<div class="empty-state">Нет доступных квестов<br>📜<br>Повышайте уровень, чтобы разблокировать новые квесты!</div>';
        return;
    }
    
    availableQuests.forEach(quest => {
        const completed = player.completedQuests.includes(quest.id);
        const progress = player.killCount[quest.target] || 0;
        
        const questDiv2 = document.createElement('div');
        questDiv2.className = `quest-item ${completed ? 'completed' : ''}`;
        questDiv2.innerHTML = `
            <div class="quest-title">${quest.title} ${completed ? '✅' : ''}</div>
            <div class="quest-desc">${quest.desc}</div>
            <div class="quest-desc">Прогресс: ${Math.min(progress, quest.count)}/${quest.count}</div>
            <div class="quest-reward">Награда: ${quest.exp} опыта, ${quest.gold} золота${quest.item ? `, ${quest.item}` : ''}</div>
            ${!completed && progress >= quest.count ? '<button class="btn btn-success btn-small" onclick="completeQuest(' + quest.id + ')" style="margin-top: 10px;">Получить награду</button>' : ''}
        `;
        questDiv.appendChild(questDiv2);
    });
}

function completeQuest(questId) {
    const quest = QUESTS.find(q => q.id === questId);
    if (!quest) return;
    
    const progress = player.killCount[quest.target] || 0;
    if (progress < quest.count) {
        alert('Квест еще не выполнен!');
        return;
    }
    
    if (player.completedQuests.includes(questId)) {
        alert('Квест уже выполнен!');
        return;
    }
    
    player.completedQuests.push(questId);
    player.experience += quest.exp;
    player.gold += quest.gold;
    
    if (quest.item) {
        player.inventory[quest.item] = (player.inventory[quest.item] || 0) + 1;
    }
    
    const expNeeded = Math.floor(100 * Math.pow(1.5, player.level - 1));
    if (player.experience >= expNeeded) {
        player.level++;
        player.experience -= expNeeded;
        player.maxHp += 10;
        player.strength += 2;
        player.defense += 1;
        player.agility += 1;
        player.hp = getStats().maxHp;
    }
    
    updateUI();
    loadQuests();
    alert(`✅ Квест завершен!\n⭐ +${quest.exp} опыта\n💰 +${quest.gold} золота${quest.item ? '\n🎁 +' + quest.item : ''}`);
}

// DUNGEON SYSTEM

function loadDungeons() {
    const dungeonDiv = document.getElementById('dungeonsList');
    if (!dungeonDiv) return;
    
    dungeonDiv.innerHTML = '';
    
    DUNGEONS.forEach(dungeon => {
        const completed = player.completedDungeons && player.completedDungeons.includes(dungeon.id);
        const canEnter = player.level >= dungeon.level;
        
        const dungeonCard = document.createElement('div');
        dungeonCard.className = `dungeon-card ${completed ? 'completed' : ''}`;
        
        let rewardsText = `${dungeon.rewards.exp} опыта, ${dungeon.rewards.gold} золота`;
        if (dungeon.rewards.items.length > 0) {
            rewardsText += `, ${dungeon.rewards.items.join(', ')}`;
        }
        
        dungeonCard.innerHTML = `
            <h3 style="color: var(--accent-primary); margin-bottom: 10px;">${dungeon.name} ${completed ? '✅' : ''}</h3>
            <div style="color: var(--text-secondary); margin-bottom: 8px;">Рекомендуемый уровень: ${dungeon.level}</div>
            <div style="color: var(--text-secondary); margin-bottom: 8px;">Этажей: ${dungeon.floors.length}</div>
            <div style="color: var(--text-secondary); margin-bottom: 12px;">Награды: ${rewardsText}</div>
            <div style="background: var(--bg-card); padding: 10px; border-radius: 6px; margin: 10px 0; border-left: 3px solid var(--warning);">
                ${dungeon.floors.map((floor, i) => 
                    `<div style="margin-bottom: 5px;">Этаж ${i + 1}: ${floor.name} ${floor.boss ? '👑 Босс!' : ''}</div>`
                ).join('')}
            </div>
            <button class="btn ${completed ? 'btn-secondary' : 'btn-success'}" 
                onclick="enterDungeon(${dungeon.id})" 
                ${!canEnter ? 'disabled' : ''} 
                style="margin-top: 15px;">
                ${completed ? '🔄 Пройти снова' : '🚪 Войти в подземелье'}
            </button>
            ${!canEnter ? `<div style="color: var(--danger); margin-top: 10px; font-size: 13px;">Нужен ${dungeon.level} уровень!</div>` : ''}
        `;
        
        dungeonDiv.appendChild(dungeonCard);
    });
}

function enterDungeon(dungeonId) {
    currentDungeon = DUNGEONS.find(d => d.id === dungeonId);
    if (!currentDungeon) return;
    
    currentFloor = 0;
    currentMonsterIndex = 0;
    inDungeon = true;
    
    // Hide dungeon list, show combat
    document.getElementById('dungeonsList').classList.add('hidden');
    document.getElementById('dungeonCombatCard').classList.remove('hidden');
    document.getElementById('dungeonTitle').textContent = `🏰 ${currentDungeon.name}`;
    
    startDungeonFloor();
}

function startDungeonFloor() {
    const floor = currentDungeon.floors[currentFloor];
    
    // Update floor info
    const floorInfo = document.getElementById('floorInfo');
    floorInfo.innerHTML = `
        <strong>Этаж ${currentFloor + 1}/${currentDungeon.floors.length}: ${floor.name}</strong><br>
        ${floor.boss ? '👑 Босс-бой!' : `Враг ${currentMonsterIndex + 1}/${floor.monsters.length}`}
    `;
    
    // Spawn monster or boss
    if (floor.boss) {
        currentMonster = JSON.parse(JSON.stringify(floor.boss));
        currentMonster.maxHp = currentMonster.hp;
        document.getElementById('dungeonMonsterDisplay').style.cssText = `
            background: linear-gradient(135deg, var(--bg-secondary) 0%, #1a1534 100%);
            padding: 30px;
            border-radius: 12px;
            margin-bottom: 20px;
            border: 2px solid var(--accent-secondary);
            text-align: center;
        `;
    } else {
        const monsterName = floor.monsters[currentMonsterIndex];
        const baseMonster = MONSTERS.find(m => m.name === monsterName);
        currentMonster = JSON.parse(JSON.stringify(baseMonster));
        currentMonster.maxHp = currentMonster.hp;
        document.getElementById('dungeonMonsterDisplay').style.cssText = `
            background: var(--bg-secondary);
            padding: 30px;
            border-radius: 12px;
            margin-bottom: 20px;
            border: 2px solid var(--danger);
            text-align: center;
        `;
    }
    
    document.getElementById('dungeonMonsterName').textContent = currentMonster.name;
    document.getElementById('dungeonMonsterLevel').textContent = currentMonster.level;
    document.getElementById('dungeonMonsterStrength').textContent = currentMonster.strength;
    document.getElementById('dungeonMonsterDefense').textContent = currentMonster.defense;
    updateDungeonMonsterHP();
    
    document.getElementById('dungeonCombatLog').innerHTML = `<div class="log-entry">⚔️ ${currentMonster.name} появился!</div>`;
    document.getElementById('dungeonRewardDisplay').classList.add('hidden');
}

function updateDungeonMonsterHP() {
    document.getElementById('dungeonMonsterHpText').textContent = `${Math.max(0, currentMonster.hp)} / ${currentMonster.maxHp}`;
    const hpPercent = (currentMonster.hp / currentMonster.maxHp) * 100;
    document.getElementById('dungeonMonsterHpBar').style.width = `${Math.max(0, hpPercent)}%`;
    document.getElementById('dungeonMonsterHpBar').textContent = `${Math.max(0, currentMonster.hp)} HP`;
}

function dungeonAttack() {
    if (!inDungeon) return;
    
    const stats = getStats();
    
    // Player attacks
    const playerDmg = Math.max(1, stats.strength + Math.floor(Math.random() * 7) - 3 - currentMonster.defense);
    currentMonster.hp -= playerDmg;
    
    addDungeonLog(`💥 Вы нанесли ${playerDmg} урона ${currentMonster.name}`);
    updateDungeonMonsterHP();
    
    // Check monster defeated
    if (currentMonster.hp <= 0) {
        dungeonVictory();
        return;
    }
    
    // Monster attacks
    const monsterDmg = Math.max(1, currentMonster.strength + Math.floor(Math.random() * 5) - 2 - stats.defense);
    player.hp -= monsterDmg;
    player.hp = Math.max(0, player.hp);
    
    addDungeonLog(`🗡️ ${currentMonster.name} нанес вам ${monsterDmg} урона`);
    updateUI();
    
    // Check player defeated
    if (player.hp <= 0) {
        dungeonDefeat();
    }
}

function addDungeonLog(text) {
    const logDiv = document.getElementById('dungeonCombatLog');
    const entry = document.createElement('div');
    entry.className = 'log-entry';
    entry.textContent = text;
    logDiv.appendChild(entry);
    logDiv.scrollTop = logDiv.scrollHeight;
}

function dungeonVictory() {
    const floor = currentDungeon.floors[currentFloor];
    addDungeonLog(`✅ ${currentMonster.name} повержен!`);
    
    // Check if it was a boss
    if (floor.boss) {
        // Floor boss defeated - move to next floor or complete dungeon
        if (currentFloor < currentDungeon.floors.length - 1) {
            currentFloor++;
            currentMonsterIndex = 0;
            setTimeout(() => {
                alert(`✅ Этаж пройден! Переход на этаж ${currentFloor + 1}...`);
                startDungeonFloor();
            }, 500);
        } else {
            // Dungeon completed!
            completeDungeon();
        }
    } else {
        // Regular monster defeated
        currentMonsterIndex++;
        
        if (currentMonsterIndex < floor.monsters.length) {
            // More monsters on this floor
            setTimeout(() => startDungeonFloor(), 500);
        } else {
            // Floor cleared, move to next
            if (currentFloor < currentDungeon.floors.length - 1) {
                currentFloor++;
                currentMonsterIndex = 0;
                setTimeout(() => {
                    alert(`✅ Этаж пройден! Переход на этаж ${currentFloor + 1}...`);
                    startDungeonFloor();
                }, 500);
            }
        }
    }
}

function completeDungeon() {
    inDungeon = false;
    
    // Award rewards
    player.experience += currentDungeon.rewards.exp;
    player.gold += currentDungeon.rewards.gold;
    
    const loot = [];
    currentDungeon.rewards.items.forEach(itemName => {
        player.inventory[itemName] = (player.inventory[itemName] || 0) + 1;
        loot.push(itemName);
    });
    
    // Mark dungeon as completed
    if (!player.completedDungeons) player.completedDungeons = [];
    if (!player.completedDungeons.includes(currentDungeon.id)) {
        player.completedDungeons.push(currentDungeon.id);
    }
    
    // Check level up
    const expNeeded = Math.floor(100 * Math.pow(1.5, player.level - 1));
    let leveledUp = false;
    
    while (player.experience >= expNeeded) {
        player.level++;
        player.experience -= expNeeded;
        player.maxHp += 10;
        player.strength += 2;
        player.defense += 1;
        player.agility += 1;
        player.hp = getStats().maxHp;
        leveledUp = true;
    }
    
    // Show rewards
    const rewardDiv = document.getElementById('dungeonRewardDisplay');
    rewardDiv.classList.remove('hidden');
    rewardDiv.innerHTML = `
        <h3>🎊 Подземелье пройдено!</h3>
        <div class="reward-item">💰 Золото: +${currentDungeon.rewards.gold}</div>
        <div class="reward-item">⭐ Опыт: +${currentDungeon.rewards.exp}</div>
        ${leveledUp ? `<div class="reward-item" style="color: var(--success); font-weight: bold;">🎊 Новый уровень: ${player.level}!</div>` : ''}
        ${loot.length > 0 ? `<div class="reward-item">🎁 Награды: ${loot.join(', ')}</div>` : ''}
        <button class="btn btn-primary" onclick="exitDungeon()" style="margin-top: 15px;">Вернуться к списку подземелий</button>
    `;
    
    updateUI();
    loadDungeons();
}

function dungeonDefeat() {
    inDungeon = false;
    addDungeonLog('💀 Вы были побеждены!');
    alert('Вы были побеждены в подземелье! Вас вылечили в городе.');
    player.hp = getStats().maxHp;
    exitDungeon();
}

function exitDungeon() {
    inDungeon = false;
    currentDungeon = null;
    currentFloor = 0;
    currentMonsterIndex = 0;
    
    document.getElementById('dungeonCombatCard').classList.add('hidden');
    document.getElementById('dungeonsList').classList.remove('hidden');
    
    updateUI();
    loadDungeons();
}

// Enter key for login
document.getElementById('username')?.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') login();
});

// Initialize game
initGame();
