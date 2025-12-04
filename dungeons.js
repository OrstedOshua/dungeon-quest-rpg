// Dungeon System for Dungeon Quest RPG
// Add this code to your existing game

// DUNGEONS DATA - add to your game constants
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

// Dungeon state variables - add to your game state
let currentDungeon = null;
let currentFloor = 0;
let currentMonsterIndex = 0;
let inDungeon = false;

// Add to player object in login() function:
// completedDungeons: []

// DUNGEON FUNCTIONS

function loadDungeons() {
    const dungeonDiv = document.getElementById('dungeonsList');
    if (!dungeonDiv) return;
    
    dungeonDiv.innerHTML = '';
    
    DUNGEONS.forEach(dungeon => {
        const completed = player.completedDungeons && player.completedDungeons.includes(dungeon.id);
        const canEnter = player.level >= dungeon.level;
        
        const dungeonCard = document.createElement('div');
        dungeonCard.className = `dungeon-card ${completed ? 'completed' : ''}`;
        dungeonCard.style.cssText = `
            background: var(--bg-secondary);
            padding: 20px;
            border-radius: 12px;
            border: 2px solid ${completed ? 'var(--success)' : 'var(--border-color)'};
            margin-bottom: 15px;
            transition: all 0.3s;
        `;
        
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

// Add this CSS for dungeon cards
const dungeonCSS = `
.dungeon-card {
    background: var(--bg-secondary);
    padding: 20px;
    border-radius: 12px;
    border: 2px solid var(--border-color);
    transition: all 0.3s;
    margin-bottom: 15px;
}

.dungeon-card:hover {
    border-color: var(--accent-primary);
    transform: translateX(5px);
}

.dungeon-card.completed {
    border-color: var(--success);
    opacity: 0.8;
}
`;

console.log('Dungeon system loaded! ✅');
