// ═══════════════════════════════════════════════════════════════════
// DUNGEON QUEST RPG v3.0 - MAJOR UPDATE
// ═══════════════════════════════════════════════════════════════════

// ═══════════════════════════════════════════════════════════════════
// GAME DATA
// ═══════════════════════════════════════════════════════════════════

const ITEMS = [
    // Weapons (цены x3)
    {name: 'Деревянный меч', type: 'weapon', damage: 5, price: 0, level: 1, desc: 'Базовое оружие'},
    {name: 'Железный меч', type: 'weapon', damage: 15, price: 150, level: 3, desc: 'Прочный железный клинок'},
    {name: 'Стальной клинок', type: 'weapon', damage: 25, price: 450, level: 5, desc: 'Острое стальное оружие'},
    {name: 'Боевой топор', type: 'weapon', damage: 35, price: 750, level: 7, desc: 'Тяжелый топор для ближнего боя'},
    {name: 'Молот паладина', type: 'weapon', damage: 45, price: 1200, level: 9, desc: 'Освященный боевой молот'},
    {name: 'Драконобоец', type: 'weapon', damage: 60, price: 2100, level: 12, desc: 'Легендарный меч'},
    
    // Armor (цены x3)
    {name: 'Тканевая броня', type: 'armor', defense: 3, price: 0, level: 1, desc: 'Простая защита'},
    {name: 'Кожаная броня', type: 'armor', defense: 8, price: 120, level: 2, desc: 'Легкая кожаная защита'},
    {name: 'Железная броня', type: 'armor', defense: 15, price: 360, level: 5, desc: 'Тяжелая железная защита'},
    {name: 'Стальная броня', type: 'armor', defense: 22, price: 660, level: 7, desc: 'Усиленная стальная броня'},
    {name: 'Чёрный кирас', type: 'armor', defense: 28, price: 1050, level: 9, desc: 'Тёмная усиленная броня'},
    {name: 'Драконья чешуя', type: 'armor', defense: 40, price: 2400, level: 13, desc: 'Броня из чешуи дракона'},
    
    // Accessories (цены x3)
    {name: 'Кольцо силы', type: 'accessory', damage: 5, price: 300, level: 3, desc: '+5 Силы'},
    {name: 'Амулет защиты', type: 'accessory', defense: 5, price: 300, level: 3, desc: '+5 Защиты'},
    {name: 'Сапоги скорости', type: 'accessory', agility: 5, price: 300, level: 3, desc: '+5 Ловкости'},
    {name: 'Кулон здоровья', type: 'accessory', hp: 50, price: 450, level: 5, desc: '+50 Макс. HP'},
    {name: 'Пояс берсерка', type: 'accessory', damage: 8, defense: -2, price: 600, level: 6, desc: '+8 Силы, -2 Защиты'},
    {name: 'Щит веры', type: 'accessory', defense: 10, hp: 30, price: 780, level: 8, desc: '+10 Защиты, +30 HP'},
    
    // Consumables (цены x3)
    {name: 'Зелье здоровья', type: 'consumable', heal: 50, price: 60, level: 1, desc: 'Восстанавливает 50 HP'},
    {name: 'Большое зелье', type: 'consumable', heal: 150, price: 150, level: 5, desc: 'Восстанавливает 150 HP'},
    {name: 'Эликсир героя', type: 'consumable', heal: 300, price: 360, level: 8, desc: 'Сильно восстанавливает здоровье'}
];

// Monsters (сила +30%)
const MONSTERS = [
    {name: 'Слизень', level: 1, hp: 30, strength: 7, defense: 2, exp: 15, gold: 7, loot: {'Зелье здоровья': 0.3}},
    {name: 'Крысиный вор', level: 1, hp: 35, strength: 8, defense: 1, exp: 18, gold: 11, loot: {'Зелье здоровья': 0.25}},
    {name: 'Гигантская крыса', level: 2, hp: 50, strength: 10, defense: 3, exp: 25, gold: 11, loot: {'Зелье здоровья': 0.4}},
    {name: 'Гоблин', level: 3, hp: 70, strength: 16, defense: 5, exp: 40, gold: 18, loot: {'Зелье здоровья': 0.3, 'Железный меч': 0.1}},
    {name: 'Гоблин-ремесленник', level: 4, hp: 80, strength: 17, defense: 6, exp: 55, gold: 25, loot: {'Кожаная броня': 0.15, 'Зелье здоровья': 0.4}},
    {name: 'Волк', level: 4, hp: 90, strength: 20, defense: 6, exp: 60, gold: 25, loot: {'Зелье здоровья': 0.5, 'Кожаная броня': 0.1}},
    {name: 'Ледяной волк', level: 5, hp: 110, strength: 23, defense: 7, exp: 80, gold: 32, loot: {'Стальной клинок': 0.1, 'Большое зелье': 0.4}},
    {name: 'Орк', level: 6, hp: 130, strength: 29, defense: 8, exp: 110, gold: 42, loot: {'Большое зелье': 0.3, 'Железный меч': 0.15}},
    {name: 'Орк-берсерк', level: 7, hp: 160, strength: 36, defense: 9, exp: 150, gold: 56, loot: {'Боевой топор': 0.12}},
    {name: 'Темный рыцарь', level: 8, hp: 200, strength: 42, defense: 12, exp: 220, gold: 63, loot: {'Большое зелье': 0.4, 'Стальной клинок': 0.1, 'Стальная броня': 0.1}},
    {name: 'Призрачный страж', level: 9, hp: 220, strength: 44, defense: 14, exp: 260, gold: 77, loot: {'Чёрный кирас': 0.12, 'Щит веры': 0.15}},
    {name: 'Тролль', level: 10, hp: 260, strength: 52, defense: 15, exp: 360, gold: 98, loot: {'Большое зелье': 0.5, 'Железная броня': 0.15}},
    {name: 'Горный тролль', level: 11, hp: 310, strength: 59, defense: 18, exp: 450, gold: 126, loot: {'Эликсир героя': 0.4, 'Пояс берсерка': 0.15}},
    {name: 'Дракон', level: 15, hp: 550, strength: 85, defense: 22, exp: 850, gold: 224, loot: {'Драконобоец': 0.06, 'Драконья чешуя': 0.12, 'Большое зелье': 0.8, 'Эликсир героя': 0.6}}
];

// Bosses (требуют билеты)
const BOSSES = [
    {
        id: 1,
        name: 'Повелитель слизней',
        level: 5,
        hp: 300,
        maxHp: 300,
        strength: 25,
        defense: 10,
        ticketCost: 2,
        rewards: {exp: 250, gold: 200, items: ['Большое зелье', 'Большое зелье']}
    },
    {
        id: 2,
        name: 'Гоблинский король',
        level: 7,
        hp: 500,
        maxHp: 500,
        strength: 35,
        defense: 14,
        ticketCost: 4,
        rewards: {exp: 450, gold: 350, items: ['Стальной клинок', 'Эликсир героя']}
    },
    {
        id: 3,
        name: 'Ледяной титан',
        level: 10,
        hp: 750,
        maxHp: 750,
        strength: 48,
        defense: 18,
        ticketCost: 8,
        rewards: {exp: 700, gold: 550, items: ['Боевой топор', 'Стальная броня', 'Эликсир героя']}
    },
    {
        id: 4,
        name: 'Повелитель нежити',
        level: 12,
        hp: 1000,
        maxHp: 1000,
        strength: 58,
        defense: 22,
        ticketCost: 16,
        rewards: {exp: 1100, gold: 800, items: ['Молот паладина', 'Чёрный кирас', 'Эликсир героя', 'Эликсир героя']}
    },
    {
        id: 5,
        name: 'Горный великан',
        level: 14,
        hp: 1400,
        maxHp: 1400,
        strength: 72,
        defense: 26,
        ticketCost: 32,
        rewards: {exp: 1600, gold: 1200, items: ['Драконобоец', 'Щит веры', 'Эликсир героя', 'Эликсир героя', 'Эликсир героя']}
    },
    {
        id: 6,
        name: 'Древний дракон',
        level: 18,
        hp: 2200,
        maxHp: 2200,
        strength: 95,
        defense: 32,
        ticketCost: 64,
        rewards: {exp: 2500, gold: 2000, items: ['Драконобоец', 'Драконья чешуя', 'Эликсир героя', 'Эликсир героя', 'Эликсир героя', 'Эликсир героя']}
    }
];

// World Bosses (прогресс сохраняется)
const WORLD_BOSSES = [
    {
        id: 1,
        name: 'Терра, Страж Земли',
        level: 20,
        maxHp: 5000,
        strength: 85,
        defense: 30,
        rewards: {exp: 3000, gold: 2500, items: ['Драконобоец', 'Драконья чешуя', 'Эликсир героя', 'Эликсир героя', 'Эликсир героя']}
    },
    {
        id: 2,
        name: 'Инферно, Владыка Огня',
        level: 25,
        maxHp: 8000,
        strength: 110,
        defense: 38,
        rewards: {exp: 5000, gold: 4000, items: ['Драконобоец', 'Драконобоец', 'Драконья чешуя', 'Эликсир героя', 'Эликсир героя', 'Эликсир героя', 'Эликсир героя']}
    },
    {
        id: 3,
        name: 'Абисс, Повелитель Тьмы',
        level: 30,
        maxHp: 12000,
        strength: 140,
        defense: 45,
        rewards: {exp: 8000, gold: 6000, items: ['Драконобоец', 'Драконобоец', 'Драконобоец', 'Драконья чешуя', 'Драконья чешуя', 'Эликсир героя', 'Эликсир героя', 'Эликсир героя', 'Эликсир героя', 'Эликсир героя']}
    }
];

// Expanded quests (20+ квестов с автозаменой)
const QUESTS = [
    {id: 1, title: 'Первая охота', desc: 'Победите 3 слизней', level: 1, target: 'Слизень', count: 3, exp: 50, gold: 30, item: 'Зелье здоровья'},
    {id: 2, title: 'Крысиная проблема', desc: 'Очистите подвал от 5 крыс', level: 1, target: 'Крысиный вор', count: 5, exp: 80, gold: 50},
    {id: 3, title: 'Охота на крыс', desc: 'Победите 8 гигантских крыс', level: 2, target: 'Гигантская крыса', count: 8, exp: 150, gold: 80},
    {id: 4, title: 'Гоблинская угроза', desc: 'Победите 6 гоблинов', level: 3, target: 'Гоблин', count: 6, exp: 200, gold: 100, item: 'Железный меч'},
    {id: 5, title: 'Мастерская гоблинов', desc: 'Зачистите 4 ремесленников', level: 4, target: 'Гоблин-ремесленник', count: 4, exp: 250, gold: 120},
    {id: 6, title: 'Охота на волков', desc: 'Победите 5 волков', level: 4, target: 'Волк', count: 5, exp: 300, gold: 150, item: 'Кожаная броня'},
    {id: 7, title: 'Ледяная угроза', desc: 'Устраните 6 ледяных волков', level: 5, target: 'Ледяной волк', count: 6, exp: 400, gold: 200},
    {id: 8, title: 'Набег орков', desc: 'Остановите орков (7 орков)', level: 6, target: 'Орк', count: 7, exp: 550, gold: 280, item: 'Кольцо силы'},
    {id: 9, title: 'Берсерки', desc: 'Победите 5 орков-берсерков', level: 7, target: 'Орк-берсерк', count: 5, exp: 700, gold: 350},
    {id: 10, title: 'Темная башня', desc: 'Победите 3 темных рыцарей', level: 8, target: 'Темный рыцарь', count: 3, exp: 900, gold: 450, item: 'Стальной клинок'},
    {id: 11, title: 'Призраки', desc: 'Изгоните 4 призрачных стражей', level: 9, target: 'Призрачный страж', count: 4, exp: 1100, gold: 550},
    {id: 12, title: 'Логово тролля', desc: 'Зачистите пещеру (5 троллей)', level: 10, target: 'Тролль', count: 5, exp: 1400, gold: 700, item: 'Железная броня'},
    {id: 13, title: 'Горные тролли', desc: 'Победите 4 горных троллей', level: 11, target: 'Горный тролль', count: 4, exp: 1700, gold: 850},
    {id: 14, title: 'Убийца драконов', desc: 'Победите дракона', level: 15, target: 'Дракон', count: 1, exp: 2000, gold: 1000, item: 'Драконобоец'},
    {id: 15, title: 'Легенда о слизнях', desc: 'Победите 20 слизней', level: 2, target: 'Слизень', count: 20, exp: 350, gold: 180},
    {id: 16, title: 'Истребитель крыс', desc: 'Победите 15 любых крыс', level: 3, target: 'Гигантская крыса', count: 15, exp: 400, gold: 200},
    {id: 17, title: 'Вождь племени', desc: 'Победите 10 гоблинов-ремесленников', level: 5, target: 'Гоблин-ремесленник', count: 10, exp: 650, gold: 320},
    {id: 18, title: 'Ледяная тундра', desc: 'Победите 12 ледяных волков', level: 6, target: 'Ледяной волк', count: 12, exp: 850, gold: 420},
    {id: 19, title: 'Армия орков', desc: 'Победите 15 орков', level: 7, target: 'Орк', count: 15, exp: 1150, gold: 570},
    {id: 20, title: 'Темное войско', desc: 'Победите 8 темных рыцарей', level: 9, target: 'Темный рыцарь', count: 8, exp: 1800, gold: 900},
    {id: 21, title: 'Призрачная армия', desc: 'Победите 10 призрачных стражей', level: 10, target: 'Призрачный страж', count: 10, exp: 2200, gold: 1100},
    {id: 22, title: 'Троллинг', desc: 'Победите 12 троллей', level: 11, target: 'Тролль', count: 12, exp: 2800, gold: 1400},
    {id: 23, title: 'Горы гигантов', desc: 'Победите 8 горных троллей', level: 12, target: 'Горный тролль', count: 8, exp: 3200, gold: 1600},
    {id: 24, title: 'Драконья чума', desc: 'Победите 3 драконов', level: 16, target: 'Дракон', count: 3, exp: 4500, gold: 2250}
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

// ═══════════════════════════════════════════════════════════════════
// GAME STATE
// ═══════════════════════════════════════════════════════════════════

let player = null;
let currentMonster = null;
let inCombat = false;
let currentDungeon = null;
let currentFloor = 0;
let currentMonsterIndex = 0;
let inDungeon = false;

// Boss battle state
let currentBoss = null;
let inBossBattle = false;

// World boss state
let currentWorldBoss = null;
let inWorldBossBattle = false;

// Current battle tab
let currentBattleTab = 'adventures'; // adventures, dungeons, bosses, worldBosses

// ═══════════════════════════════════════════════════════════════════
// INITIALIZATION
// ═══════════════════════════════════════════════════════════════════

function initGame() {
    const savedPlayer = localStorage.getItem('dungeonQuestPlayer');
    if (savedPlayer) {
        // Можно сделать автологин позже
    }
}

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
            killCount: {},
            
            // NEW v3.0 features
            bossTickets: 0,              // Билеты к боссам
            worldBossTickets: 0,          // Билеты к мировым боссам
            defeatedBosses: [],           // Побежденные боссы
            worldBosses: {},              // {id: {hp: currentHp, maxHp: maxHp, defeated: bool}}
            
            // Equipment slots
            weaponSlots: 1,               // Количество слотов под оружие (базово 1)
            accessorySlots: 1,            // Количество слотов под аксессуары (базово 1)
            weapons: ['Деревянный меч'],  // Массив оружия
            accessories: [null],          // Массив аксессуаров
            
            // Active quest
            activeQuest: null             // Текущий активный квест
        };
    }

    // Backward compatibility
    if (!player.bossTickets) player.bossTickets = 0;
    if (!player.worldBossTickets) player.worldBossTickets = 0;
    if (!player.defeatedBosses) player.defeatedBosses = [];
    if (!player.worldBosses) player.worldBosses = {};
    if (!player.weaponSlots) player.weaponSlots = 1;
    if (!player.accessorySlots) player.accessorySlots = 1;
    if (!player.weapons) player.weapons = [player.weapon || 'Деревянный меч'];
    if (!player.accessories) player.accessories = [player.accessory || null];
    if (!player.activeQuest) player.activeQuest = null;
    if (!player.completedDungeons) player.completedDungeons = [];

    // Initialize world bosses
    WORLD_BOSSES.forEach(wb => {
        if (!player.worldBosses[wb.id]) {
            player.worldBosses[wb.id] = {
                hp: wb.maxHp,
                maxHp: wb.maxHp,
                defeated: false
            };
        }
    });

    document.getElementById('loginScreen').classList.add('hidden');
    document.getElementById('gameScreen').classList.remove('hidden');
    
    // Load battle tab (default: adventures)
    loadBattleTab('adventures');
    
    updateUI();
    loadShop();
    loadQuests();
}

// ═══════════════════════════════════════════════════════════════════
// TAB SWITCHING
// ═══════════════════════════════════════════════════════════════════

function switchTab(evt, tabName) {
    document.querySelectorAll('.tab-content').forEach(tab => tab.classList.remove('active'));
    document.querySelectorAll('.tab-button').forEach(btn => btn.classList.remove('active'));
    document.getElementById(tabName + 'Tab').classList.add('active');
    evt.currentTarget.classList.add('active');
}

// Battle tab switching
function loadBattleTab(tabName) {
    currentBattleTab = tabName;
    
    // Hide all battle sub-tabs
    const subTabs = ['adventuresContent', 'dungeonsContent', 'bossesContent', 'worldBossesContent'];
    subTabs.forEach(id => {
        const el = document.getElementById(id);
        if (el) el.classList.add('hidden');
    });
    
    // Remove active from all battle sub-buttons
    document.querySelectorAll('.battle-tab-button').forEach(btn => {
        btn.classList.remove('active');
    });
    
    // Show selected tab
    const contentId = tabName + 'Content';
    const el = document.getElementById(contentId);
    if (el) el.classList.remove('hidden');
    
    // Mark button as active
    const btn = document.querySelector(`[data-battle-tab="${tabName}"]`);
    if (btn) btn.classList.add('active');
    
    // Load content
    if (tabName === 'dungeons') {
        loadDungeons();
    } else if (tabName === 'bosses') {
        loadBosses();
    } else if (tabName === 'worldBosses') {
        loadWorldBosses();
    }
}

// ═══════════════════════════════════════════════════════════════════
// STATS & UI
// ═══════════════════════════════════════════════════════════════════

function getStats() {
    let stats = {
        hp: player.hp,
        maxHp: player.maxHp,
        strength: player.strength,
        defense: player.defense,
        agility: player.agility
    };

    // Aggregate all equipped items
    const equippedItems = [...player.weapons, ...player.accessories, player.armor];
    
    equippedItems.forEach(equipName => {
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
    
    // Equipment display
    const weaponText = player.weapons.filter(w => w).join(', ') || 'Нет';
    const accessoryText = player.accessories.filter(a => a).join(', ') || 'Нет';
    document.getElementById('equippedWeapon').textContent = weaponText;
    document.getElementById('equippedArmor').textContent = player.armor || 'Нет';
    document.getElementById('equippedAccessory').textContent = accessoryText;
    
    // Inventory with action buttons
    updateInventoryUI();
    
    savePlayer();
}

function updateInventoryUI() {
    const invDiv = document.getElementById('inventoryItems');
    if (!invDiv) return;
    
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
                    buttonHtml = `<button class="btn btn-success btn-small" onclick="useItem('${item}')">💊 Выпить</button>`;
                } else if (itemData.type === 'weapon') {
                    const isEquipped = player.weapons.includes(item);
                    const canEquip = player.weapons.filter(w => w).length < player.weaponSlots;
                    
                    if (isEquipped) {
                        buttonHtml = `<button class="btn btn-secondary btn-small" onclick="unequipWeapon('${item}')">✖ Снять</button>`;
                    } else if (canEquip) {
                        buttonHtml = `<button class="btn btn-success btn-small" onclick="equipWeapon('${item}')">✔ Экипировать</button>`;
                    } else {
                        buttonHtml = `<button class="btn btn-secondary btn-small" disabled>Нет места</button>`;
                    }
                } else if (itemData.type === 'armor') {
                    const isEquipped = player.armor === item;
                    buttonHtml = isEquipped 
                        ? `<button class="btn btn-secondary btn-small" onclick="unequipItem('armor')">✖ Снять</button>`
                        : `<button class="btn btn-success btn-small" onclick="equipItem('${item}')">✔ Экипировать</button>`;
                } else if (itemData.type === 'accessory') {
                    const isEquipped = player.accessories.includes(item);
                    const canEquip = player.accessories.filter(a => a).length < player.accessorySlots;
                    
                    if (isEquipped) {
                        buttonHtml = `<button class="btn btn-secondary btn-small" onclick="unequipAccessory('${item}')">✖ Снять</button>`;
                    } else if (canEquip) {
                        buttonHtml = `<button class="btn btn-success btn-small" onclick="equipAccessory('${item}')">✔ Экипировать</button>`;
                    } else {
                        buttonHtml = `<button class="btn btn-secondary btn-small" disabled>Нет места</button>`;
                    }
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
}

// ═══════════════════════════════════════════════════════════════════
// EQUIPMENT SYSTEM
// ═══════════════════════════════════════════════════════════════════

function equipWeapon(itemName) {
    const item = ITEMS.find(i => i.name === itemName);
    if (!item || item.type !== 'weapon') return;
    
    if (!player.inventory[itemName] || player.inventory[itemName] <= 0) {
        alert('У вас нет этого предмета!');
        return;
    }
    
    if (player.level < item.level) {
        alert(`Нужен уровень ${item.level}!`);
        return;
    }
    
    // Check if we have free slot
    const freeSlotIndex = player.weapons.findIndex(w => !w);
    if (freeSlotIndex === -1) {
        alert('Нет свободных слотов для оружия!');
        return;
    }
    
    player.weapons[freeSlotIndex] = itemName;
    player.inventory[itemName]--;
    if (player.inventory[itemName] <= 0) {
        delete player.inventory[itemName];
    }
    
    updateUI();
    alert(`✅ Экипировано: ${itemName}`);
}

function unequipWeapon(itemName) {
    const index = player.weapons.indexOf(itemName);
    if (index === -1) return;
    
    player.weapons[index] = null;
    
    if (itemName && itemName !== 'Деревянный меч') {
        player.inventory[itemName] = (player.inventory[itemName] || 0) + 1;
    }
    
    updateUI();
    alert(`✅ Снято: ${itemName}`);
}

function equipAccessory(itemName) {
    const item = ITEMS.find(i => i.name === itemName);
    if (!item || item.type !== 'accessory') return;
    
    if (!player.inventory[itemName] || player.inventory[itemName] <= 0) {
        alert('У вас нет этого предмета!');
        return;
    }
    
    if (player.level < item.level) {
        alert(`Нужен уровень ${item.level}!`);
        return;
    }
    
    // Check if we have free slot
    const freeSlotIndex = player.accessories.findIndex(a => !a);
    if (freeSlotIndex === -1) {
        alert('Нет свободных слотов для аксессуаров!');
        return;
    }
    
    player.accessories[freeSlotIndex] = itemName;
    player.inventory[itemName]--;
    if (player.inventory[itemName] <= 0) {
        delete player.inventory[itemName];
    }
    
    updateUI();
    alert(`✅ Экипировано: ${itemName}`);
}

function unequipAccessory(itemName) {
    const index = player.accessories.indexOf(itemName);
    if (index === -1) return;
    
    player.accessories[index] = null;
    player.inventory[itemName] = (player.inventory[itemName] || 0) + 1;
    
    updateUI();
    alert(`✅ Снято: ${itemName}`);
}

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
    
    if (item.type === 'armor') {
        // Put old armor to inventory
        if (player.armor && player.armor !== 'Тканевая броня') {
            player.inventory[player.armor] = (player.inventory[player.armor] || 0) + 1;
        }
        player.armor = item.name;
    }
    
    // Remove from inventory
    player.inventory[itemName]--;
    if (player.inventory[itemName] <= 0) {
        delete player.inventory[itemName];
    }
    
    updateUI();
    alert(`✅ Экипировано: ${itemName}`);
}

function unequipItem(slot) {
    let itemName = null;
    if (slot === 'armor') {
        itemName = player.armor;
        player.armor = 'Тканевая броня';
    }
    
    if (itemName && itemName !== 'Тканевая броня') {
        player.inventory[itemName] = (player.inventory[itemName] || 0) + 1;
    }
    
    updateUI();
    alert(`✅ Снято: ${itemName}`);
}

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

// ═══════════════════════════════════════════════════════════════════
// COMBAT SYSTEM (Adventures)
// ═══════════════════════════════════════════════════════════════════

function startCombat() {
    if (inCombat) return;
    
    const availableMonsters = MONSTERS.filter(m => 
        m.level >= player.level - 2 && m.level <= player.level + 2
    );
    
    if (availableMonsters.length === 0) {
        currentMonster = JSON.parse(JSON.stringify(MONSTERS[0]));
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
    
    // после начала боя кнопка должна быть именно "Атаковать"
    const attackBtn = document.getElementById('attackButton');
    if (attackBtn) {
        attackBtn.textContent = '⚔️ Атаковать';
        attackBtn.onclick = attack;
    }
}

function updateMonsterHP() {
    document.getElementById('monsterHpText').textContent = `${Math.max(0, currentMonster.hp)} / ${currentMonster.maxHp}`;
    const hpPercent = (currentMonster.hp / currentMonster.maxHp) * 100;
    document.getElementById('monsterHpBar').style.width = `${Math.max(0, hpPercent)}%`;
    document.getElementById('monsterHpBar').textContent = `${Math.max(0, currentMonster.hp)} HP`;
}

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
    if (!logDiv) return;
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
    for (const [itemName, chance] of Object.entries(currentMonster.loot || {})) {
        if (Math.random() < chance) {
            loot.push(itemName);
            player.inventory[itemName] = (player.inventory[itemName] || 0) + 1;
        }
    }
    
    // Boss ticket drop (14% chance)
    if (Math.random() < 0.14) {
        player.bossTickets++;
        loot.push('🎫 Билет к боссу');
    }
    
    player.experience += currentMonster.exp;
    player.gold += currentMonster.gold;
    
    // Track kills for quests
    player.killCount[currentMonster.name] = (player.killCount[currentMonster.name] || 0) + 1;
    
    // Check quest progress
    checkQuestProgress();
    
    // Check level up
    checkLevelUp();
    
    // Show rewards
    const rewardDiv = document.getElementById('rewardDisplay');
    rewardDiv.classList.remove('hidden');
    rewardDiv.innerHTML = `
        <h3>🎉 Победа!</h3>
        <div class="reward-item">💰 Золото: +${currentMonster.gold}</div>
        <div class="reward-item">⭐ Опыт: +${currentMonster.exp}</div>
        ${loot.length > 0 ? `<div class="reward-item">🎁 Добыча: ${loot.join(', ')}</div>` : ''}
    `;
    
    // после победы меняем кнопку на "Искать противника"
    const attackBtn = document.getElementById('attackButton');
    if (attackBtn) {
        attackBtn.textContent = '🗡️ Искать противника';
        attackBtn.onclick = startCombat;
    }
    
    updateUI();
    loadQuests();
}

function defeat() {
    inCombat = false;
    addLog('💀 Вы были побеждены!');
    alert('Вы были побеждены! Вас вылечили в городе.');
    player.hp = getStats().maxHp;
    document.getElementById('combatArea').classList.add('hidden');
    updateUI();
}

function fleeCombat() {
    inCombat = false;
    currentMonster = null;
    document.getElementById('combatArea').classList.add('hidden');
}

function healPlayer() {
    const cost = 100; // Increased from 20 to 100 (x5)
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

function checkLevelUp() {
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
    
    if (leveledUp) {
        alert(`🎊 Новый уровень: ${player.level}!`);
    }
}

// ═══════════════════════════════════════════════════════════════════
// SHOP SYSTEM
// ═══════════════════════════════════════════════════════════════════

function loadShop() {
    const shopDiv = document.getElementById('shopItems');
    if (!shopDiv) return;
    
    shopDiv.innerHTML = '';
    
    // Equipment items
    const equipmentItems = ITEMS.filter(item => item.type !== 'consumable');
    
    // Add slot purchases
    const slotPurchases = [];
    
    // Weapon slot
    if (player.weaponSlots < 2) {
        slotPurchases.push({
            name: '🎰 Дополнительный слот: Оружие',
            desc: 'Позволяет экипировать еще одно оружие',
            price: 1000,
            level: 5,
            type: 'slot',
            slotType: 'weapon'
        });
    }
    
    // Accessory slots
    const accessoryCosts = [400, 800, 1600];
    for (let i = player.accessorySlots; i < 4; i++) {
        slotPurchases.push({
            name: `🎰 Дополнительный слот: Аксессуар ${i}`,
            desc: `Позволяет экипировать ${i + 1}-й аксессуар`,
            price: accessoryCosts[i - 1],
            level: 3 + i * 2,
            type: 'slot',
            slotType: 'accessory'
        });
    }
    
    // Consumables
    const consumables = ITEMS.filter(item => item.type === 'consumable');
    
    // Combine all
    const allItems = [...slotPurchases, ...equipmentItems, ...consumables];
    
    if (allItems.length === 0) {
        shopDiv.innerHTML = '<div class="empty-state">Магазин пуст</div>';
        return;
    }
    
    allItems.forEach(item => {
        const itemDiv = document.createElement('div');
        itemDiv.className = 'shop-item';
        
        const stats = [];
        if (item.damage) stats.push(`⚔️ Урон: +${item.damage}`);
        if (item.defense) stats.push(`🛡️ Защита: +${item.defense}`);
        if (item.agility) stats.push(`⚡ Ловкость: +${item.agility}`);
        if (item.hp) stats.push(`❤️ HP: +${item.hp}`);
        if (item.heal) stats.push(`❤️ Лечение: ${item.heal}`);
        
        const canBuy = player.level >= item.level && player.gold >= item.price;
        
        const buyFunction = item.type === 'slot' 
            ? `buySlot('${item.slotType}')`
            : `buyItem('${item.name}')`;
        
        itemDiv.innerHTML = `
            <div class="item-info">
                <div class="item-name">${item.name}</div>
                <div class="item-stats">${item.desc || stats.join(' | ')}</div>
                <div class="item-stats">Требуемый уровень: ${item.level}</div>
            </div>
            <div>
                ${item.price > 0 ? `<span class="item-price">💰 ${item.price}</span>` : ''}
                <button class="btn btn-secondary btn-small" onclick="${buyFunction}" ${!canBuy ? 'disabled' : ''}>
                    Купить
                </button>
            </div>
        `;
        
        shopDiv.appendChild(itemDiv);
    });
}

function buySlot(slotType) {
    if (slotType === 'weapon') {
        if (player.weaponSlots >= 2) {
            alert('Максимальное количество слотов!');
            return;
        }
        
        const cost = 1000;
        if (player.gold < cost) {
            alert('Недостаточно золота!');
            return;
        }
        
        if (player.level < 5) {
            alert('Нужен 5 уровень!');
            return;
        }
        
        player.gold -= cost;
        player.weaponSlots++;
        player.weapons.push(null);
        
        updateUI();
        loadShop();
        alert('✅ Куплен дополнительный слот для оружия!');
        
    } else if (slotType === 'accessory') {
        if (player.accessorySlots >= 4) {
            alert('Максимальное количество слотов!');
            return;
        }
        
        const costs = [400, 800, 1600];
        const cost = costs[player.accessorySlots - 1];
        const requiredLevel = 3 + player.accessorySlots * 2;
        
        if (player.gold < cost) {
            alert('Недостаточно золота!');
            return;
        }
        
        if (player.level < requiredLevel) {
            alert(`Нужен ${requiredLevel} уровень!`);
            return;
        }
        
        player.gold -= cost;
        player.accessorySlots++;
        player.accessories.push(null);
        
        updateUI();
        loadShop();
        alert('✅ Куплен дополнительный слот для аксессуара!');
    }
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
        // Try to equip if we have free slot
        const freeSlotIndex = player.weapons.findIndex(w => !w);
        if (freeSlotIndex !== -1) {
            player.weapons[freeSlotIndex] = item.name;
        } else {
            // Add to inventory
            player.inventory[item.name] = (player.inventory[item.name] || 0) + 1;
        }
    } else if (item.type === 'armor') {
        // Put old armor to inventory
        if (player.armor && player.armor !== 'Тканевая броня') {
            player.inventory[player.armor] = (player.inventory[player.armor] || 0) + 1;
        }
        player.armor = item.name;
    } else if (item.type === 'accessory') {
        // Try to equip if we have free slot
        const freeSlotIndex = player.accessories.findIndex(a => !a);
        if (freeSlotIndex !== -1) {
            player.accessories[freeSlotIndex] = item.name;
        } else {
            // Add to inventory
            player.inventory[item.name] = (player.inventory[item.name] || 0) + 1;
        }
    } else if (item.type === 'consumable') {
        player.inventory[item.name] = (player.inventory[item.name] || 0) + 1;
    }
    
    updateUI();
    loadShop();
    alert(`✅ Куплено: ${item.name}`);
}

// ═══════════════════════════════════════════════════════════════════
// QUEST SYSTEM (Auto-replace)
// ═══════════════════════════════════════════════════════════════════

function loadQuests() {
    const questDiv = document.getElementById('questList');
    if (!questDiv) return;
    
    questDiv.innerHTML = '';
    
    // Get available quests
    const availableQuests = QUESTS.filter(q => 
        q.level <= player.level && 
        !player.completedQuests.includes(q.id)
    );
    
    if (availableQuests.length === 0) {
        questDiv.innerHTML = '<div class="empty-state">Нет доступных квестов<br>📜<br>Повышайте уровень, чтобы разблокировать новые квесты!</div>';
        return;
    }
    
    // Get or assign active quest
    if (!player.activeQuest || player.completedQuests.includes(player.activeQuest)) {
        // Assign new quest
        player.activeQuest = availableQuests[0].id;
    }
    
    // Show only active quest
    const quest = QUESTS.find(q => q.id === player.activeQuest);
    if (!quest) return;
    
    const progress = player.killCount[quest.target] || 0;
    const completed = progress >= quest.count;
    
    const questDiv2 = document.createElement('div');
    questDiv2.className = `quest-item ${completed ? 'completed' : ''}`;
    questDiv2.innerHTML = `
        <div class="quest-title">📜 ${quest.title}</div>
        <div class="quest-desc">${quest.desc}</div>
        <div class="quest-desc">Прогресс: ${Math.min(progress, quest.count)}/${quest.count}</div>
        <div class="quest-reward">Награда: ${quest.exp} опыта, ${quest.gold} золота${quest.item ? `, ${quest.item}` : ''}</div>
        ${completed ? '<button class="btn btn-success btn-small" onclick="completeQuest(' + quest.id + ')" style="margin-top: 10px;">🎁 Получить награду</button>' : ''}
    `;
    questDiv.appendChild(questDiv2);
}

function checkQuestProgress() {
    if (!player.activeQuest) return;
    
    const quest = QUESTS.find(q => q.id === player.activeQuest);
    if (!quest) return;
    
    const progress = player.killCount[quest.target] || 0;
    
    if (progress >= quest.count && !player.completedQuests.includes(quest.id)) {
        // Quest completed notification
        addLog(`✨ Квест завершен: ${quest.title}!`);
    }
    
    loadQuests();
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
    
    checkLevelUp();
    
    // Auto-replace with next quest
    const availableQuests = QUESTS.filter(q => 
        q.level <= player.level && 
        !player.completedQuests.includes(q.id)
    );
    
    if (availableQuests.length > 0) {
        player.activeQuest = availableQuests[0].id;
    } else {
        player.activeQuest = null;
    }
    
    updateUI();
    loadQuests();
    alert(`✅ Квест завершен!\n⭐ +${quest.exp} опыта\n💰 +${quest.gold} золота${quest.item ? '\n🎁 +' + quest.item : ''}\n\n${availableQuests.length > 0 ? '📜 Получен новый квест!' : ''}`);
}

// ═══════════════════════════════════════════════════════════════════
// DUNGEON SYSTEM
// ═══════════════════════════════════════════════════════════════════

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
    if (floorInfo) {
        floorInfo.innerHTML = `
            <strong>Этаж ${currentFloor + 1}/${currentDungeon.floors.length}: ${floor.name}</strong><br>
            ${floor.boss ? '👑 Босс-бой!' : `Враг ${currentMonsterIndex + 1}/${floor.monsters.length}`}
        `;
    }
    
    // Spawn monster or boss
    if (floor.boss) {
        currentMonster = JSON.parse(JSON.stringify(floor.boss));
        currentMonster.maxHp = currentMonster.hp;
        const display = document.getElementById('dungeonMonsterDisplay');
        if (display) {
            display.style.cssText = `
                background: linear-gradient(135deg, var(--bg-secondary) 0%, #1a1534 100%);
                padding: 30px;
                border-radius: 12px;
                margin-bottom: 20px;
                border: 2px солид var(--accent-secondary);
                text-align: center;
            `;
        }
    } else {
        const monsterName = floor.monsters[currentMonsterIndex];
        const baseMonster = MONSTERS.find(m => m.name === monsterName);
        currentMonster = JSON.parse(JSON.stringify(baseMonster));
        currentMonster.maxHp = currentMonster.hp;
        const display = document.getElementById('dungeonMonsterDisplay');
        if (display) {
            display.style.cssText = `
                background: var(--bg-secondary);
                padding: 30px;
                border-radius: 12px;
                margin-bottom: 20px;
                border: 2px solid var(--danger);
                text-align: center;
            `;
        }
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
    const hpText = document.getElementById('dungeonMonsterHpText');
    const hpBar = document.getElementById('dungeonMonsterHpBar');
    
    if (hpText) hpText.textContent = `${Math.max(0, currentMonster.hp)} / ${currentMonster.maxHp}`;
    
    const hpPercent = (currentMonster.hp / currentMonster.maxHp) * 100;
    if (hpBar) {
        hpBar.style.width = `${Math.max(0, hpPercent)}%`;
        hpBar.textContent = `${Math.max(0, currentMonster.hp)} HP`;
    }
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
    if (!logDiv) return;
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
    
    checkLevelUp();
    
    // Show rewards
    const rewardDiv = document.getElementById('dungeonRewardDisplay');
    if (rewardDiv) {
        rewardDiv.classList.remove('hidden');
        rewardDiv.innerHTML = `
            <h3>🎊 Подземелье пройдено!</h3>
            <div class="reward-item">💰 Золото: +${currentDungeon.rewards.gold}</div>
            <div class="reward-item">⭐ Опыт: +${currentDungeon.rewards.exp}</div>
            ${loot.length > 0 ? `<div class="reward-item">🎁 Награды: ${loot.join(', ')}</div>` : ''}
            <button class="btn btn-primary" onclick="exitDungeon()" style="margin-top: 15px;">Вернуться к списку подземелий</button>
        `;
    }
    
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

// ═══════════════════════════════════════════════════════════════════
// BOSS SYSTEM
// ═══════════════════════════════════════════════════════════════════

function loadBosses() {
    const bossDiv = document.getElementById('bossesList');
    if (!bossDiv) return;
    
    bossDiv.innerHTML = `
        <div style="background: var(--bg-card); padding: 15px; border-radius: 8px; margin-bottom: 20px; border-left: 3px solid var(--accent-primary);">
            <strong>🎫 Билеты к боссам: ${player.bossTickets}</strong><br>
            <span style="color: var(--text-secondary); font-size: 14px;">Билеты падают с монстров с шансом 14%</span>
        </div>
    `;
    
    BOSSES.forEach(boss => {
        const defeated = player.defeatedBosses && player.defeatedBosses.includes(boss.id);
        const canFight = player.bossTickets >= boss.ticketCost;
        
        const bossCard = document.createElement('div');
        bossCard.className = `dungeon-card ${defeated ? 'completed' : ''}`;
        
        let rewardsText = `${boss.rewards.exp} опыта, ${boss.rewards.gold} золота`;
        if (boss.rewards.items.length > 0) {
            rewardsText += `, ${boss.rewards.items.join(', ')}`;
        }
        
        bossCard.innerHTML = `
            <h3 style="color: var(--accent-primary); margin-bottom: 10px;">👑 ${boss.name} ${defeated ? '✅' : ''}</h3>
            <div style="color: var(--text-secondary); margin-bottom: 8px;">Уровень: ${boss.level}</div>
            <div style="color: var(--text-secondary); margin-bottom: 8px;">HP: ${boss.hp} | ⚔️ ${boss.strength} | 🛡️ ${boss.defense}</div>
            <div style="color: var(--warning); font-weight: bold; margin-bottom: 8px;">🎫 Требуется билетов: ${boss.ticketCost}</div>
            <div style="color: var(--text-secondary); margin-bottom: 12px;">Награды: ${rewardsText} + 🎫 Билет к мировому боссу</div>
            <button class="btn ${defeated ? 'btn-secondary' : 'btn-success'}" 
                onclick="startBossFight(${boss.id})" 
                ${!canFight ? 'disabled' : ''} 
                style="margin-top: 15px;">
                ${defeated ? '🔄 Сразиться снова' : '⚔️ Сразиться с боссом'}
            </button>
            ${!canFight ? `<div style="color: var(--danger); margin-top: 10px; font-size: 13px;">Не хватает билетов!</div>` : ''}
        `;
        
        bossDiv.appendChild(bossCard);
    });
}

function startBossFight(bossId) {
    const boss = BOSSES.find(b => b.id === bossId);
    if (!boss) return;
    
    if (player.bossTickets < boss.ticketCost) {
        alert('Не хватает билетов!');
        return;
    }
    
    // Deduct tickets
    player.bossTickets -= boss.ticketCost;
    
    // Start fight
    currentBoss = JSON.parse(JSON.stringify(boss));
    currentBoss.currentHp = currentBoss.hp;
    inBossBattle = true;
    
    // Hide boss list, show combat
    document.getElementById('bossesList').classList.add('hidden');
    document.getElementById('bossCombatCard').classList.remove('hidden');
    document.getElementById('bossTitle').textContent = `👑 ${currentBoss.name}`;
    
    // Update boss display
    document.getElementById('bossMonsterName').textContent = currentBoss.name;
    document.getElementById('bossMonsterLevel').textContent = currentBoss.level;
    document.getElementById('bossMonsterStrength').textContent = currentBoss.strength;
    document.getElementById('bossMonsterDefense').textContent = currentBoss.defense;
    updateBossHP();
    
    document.getElementById('bossCombatLog').innerHTML = '<div class="log-entry">⚔️ Бой с боссом начался!</div>';
    document.getElementById('bossRewardDisplay').classList.add('hidden');
    
    updateUI();
}

function updateBossHP() {
    const hpText = document.getElementById('bossMonsterHpText');
    const hpBar = document.getElementById('bossMonsterHpBar');
    
    if (hpText) hpText.textContent = `${Math.max(0, currentBoss.currentHp)} / ${currentBoss.hp}`;
    
    const hpPercent = (currentBoss.currentHp / currentBoss.hp) * 100;
    if (hpBar) {
        hpBar.style.width = `${Math.max(0, hpPercent)}%`;
        hpBar.textContent = `${Math.max(0, currentBoss.currentHp)} HP`;
    }
}

function bossAttack() {
    if (!inBossBattle) return;
    
    const stats = getStats();
    
    // Player attacks
    const playerDmg = Math.max(1, stats.strength + Math.floor(Math.random() * 7) - 3 - currentBoss.defense);
    currentBoss.currentHp -= playerDmg;
    
    addBossLog(`💥 Вы нанесли ${playerDmg} урона ${currentBoss.name}`);
    updateBossHP();
    
    // Check boss defeated
    if (currentBoss.currentHp <= 0) {
        bossVictory();
        return;
    }
    
    // Boss attacks
    const bossDmg = Math.max(1, currentBoss.strength + Math.floor(Math.random() * 8) - 4 - stats.defense);
    player.hp -= bossDmg;
    player.hp = Math.max(0, player.hp);
    
    addBossLog(`🗡️ ${currentBoss.name} нанес вам ${bossDmg} урона`);
    updateUI();
    
    // Check player defeated
    if (player.hp <= 0) {
        bossDefeat();
    }
}

function addBossLog(text) {
    const logDiv = document.getElementById('bossCombatLog');
    if (!logDiv) return;
    const entry = document.createElement('div');
    entry.className = 'log-entry';
    entry.textContent = text;
    logDiv.appendChild(entry);
    logDiv.scrollTop = logDiv.scrollHeight;
}

function bossVictory() {
    inBossBattle = false;
    addBossLog(`✅ ${currentBoss.name} повержен!`);
    
    // Award rewards
    player.experience += currentBoss.rewards.exp;
    player.gold += currentBoss.rewards.gold;
    player.worldBossTickets++; // Always drop world boss ticket
    
    const loot = [];
    currentBoss.rewards.items.forEach(itemName => {
        player.inventory[itemName] = (player.inventory[itemName] || 0) + 1;
        loot.push(itemName);
    });
    loot.push('🎫 Билет к мировому боссу');
    
    // Mark boss as defeated
    if (!player.defeatedBosses.includes(currentBoss.id)) {
        player.defeatedBosses.push(currentBoss.id);
    }
    
    checkLevelUp();
    
    // Show rewards
    const rewardDiv = document.getElementById('bossRewardDisplay');
    if (rewardDiv) {
        rewardDiv.classList.remove('hidden');
        rewardDiv.innerHTML = `
            <h3>🎊 Босс побежден!</h3>
            <div class="reward-item">💰 Золото: +${currentBoss.rewards.gold}</div>
            <div class="reward-item">⭐ Опыт: +${currentBoss.rewards.exp}</div>
            ${loot.length > 0 ? `<div class="reward-item">🎁 Добыча: ${loot.join(', ')}</div>` : ''}
            <button class="btn btn-primary" onclick="exitBoss()" style="margin-top: 15px;">Вернуться к списку боссов</button>
        `;
    }
    
    updateUI();
    loadBosses();
}

function bossDefeat() {
    inBossBattle = false;
    addBossLog('💀 Вы были побеждены боссом!');
    alert('Вы были побеждены боссом! Бой начинается заново. Вас вылечили в городе.');
    player.hp = getStats().maxHp;
    exitBoss();
}

function exitBoss() {
    inBossBattle = false;
    currentBoss = null;
    
    document.getElementById('bossCombatCard').classList.add('hidden');
    document.getElementById('bossesList').classList.remove('hidden');
    
    updateUI();
    loadBosses();
}

// ═══════════════════════════════════════════════════════════════════
// WORLD BOSS SYSTEM
// ═══════════════════════════════════════════════════════════════════

function loadWorldBosses() {
    const wbDiv = document.getElementById('worldBossesList');
    if (!wbDiv) return;
    
    wbDiv.innerHTML = `
        <div style="background: var(--bg-card); padding: 15px; border-radius: 8px; margin-bottom: 20px; border-left: 3px solid var(--accent-secondary);">
            <strong>🎫 Билеты к мировым боссам: ${player.worldBossTickets}</strong><br>
            <span style="color: var(--text-secondary); font-size: 14px;">Билеты выпадают со 100% шансом при победе над боссами</span><br>
            <span style="color: var(--warning); font-size: 14px; margin-top: 5px; display: block;">⚠️ Прогресс урона по мировым боссам сохраняется между попытками!</span>
        </div>
    `;
    
    WORLD_BOSSES.forEach(wb => {
        const wbData = player.worldBosses[wb.id];
        const defeated = wbData && wbData.defeated;
        const canFight = player.worldBossTickets > 0;
        
        const currentHp = wbData ? wbData.hp : wb.maxHp;
        const hpPercent = (currentHp / wb.maxHp) * 100;
        
        const wbCard = document.createElement('div');
        wbCard.className = `dungeon-card ${defeated ? 'completed' : ''}`;
        
        let rewardsText = `${wb.rewards.exp} опыта, ${wb.rewards.gold} золота`;
        if (wb.rewards.items.length > 0) {
            rewardsText += `, ${wb.rewards.items.join(', ')}`;
        }
        
        wbCard.innerHTML = `
            <h3 style="color: var(--accent-secondary); margin-bottom: 10px;">🌍 ${wb.name} ${defeated ? '✅' : ''}</h3>
            <div style="color: var(--text-secondary); margin-bottom: 8px;">Уровень: ${wb.level}</div>
            <div style="color: var(--text-secondary); margin-bottom: 8px;">⚔️ ${wb.strength} | 🛡️ ${wb.defense}</div>
            
            <div style="margin: 10px 0;">
                <div style="display: flex; justify-content: space-between; margin-bottom: 5px;">
                    <span style="color: var(--text-secondary);">HP прогресс:</span>
                    <span style="color: ${defeated ? 'var(--success)' : 'var(--danger)'}; font-weight: bold;">${defeated ? 'ПОБЕЖДЕН' : `${currentHp} / ${wb.maxHp}`}</span>
                </div>
                <div class="progress-bar">
                    <div class="progress-fill" style="width: ${Math.max(0, hpPercent)}%; background: ${defeated ? 'var(--success)' : 'linear-gradient(90deg, #f56565, #c73851)'};">${defeated ? 'ПОБЕЖДЕН' : `${hpPercent.toFixed(1)}%`}</div>
                </div>
            </div>
            
            <div style="color: var(--warning); font-weight: bold; margin-bottom: 8px;">🎫 Требуется билетов: 1 за попытку</div>
            <div style="color: var(--text-secondary); margin-bottom: 12px;">Награды: ${rewardsText}</div>
            <button class="btn ${defeated ? 'btn-secondary' : 'btn-success'}" 
                onclick="startWorldBossFight(${wb.id})" 
                ${!canFight || defeated ? 'disabled' : ''} 
                style="margin-top: 15px;">
                ${defeated ? '✅ Побежден' : '⚔️ Сразиться с мировым боссом'}
            </button>
            ${!canFight && !defeated ? `<div style="color: var(--danger); margin-top: 10px; font-size: 13px;">Нужен билет к мировому боссу!</div>` : ''}
        `;
        
        wbDiv.appendChild(wbCard);
    });
}

function startWorldBossFight(wbId) {
    const wb = WORLD_BOSSES.find(w => w.id === wbId);
    if (!wb) return;
    
    if (player.worldBossTickets < 1) {
        alert('Нужен билет к мировому боссу!');
        return;
    }
    
    const wbData = player.worldBosses[wbId];
    if (wbData && wbData.defeated) {
        alert('Вы уже победили этого мирового босса!');
        return;
    }
    
    // Deduct ticket
    player.worldBossTickets--;
    
    // Start fight with saved HP
    currentWorldBoss = {
        ...JSON.parse(JSON.stringify(wb)),
        currentHp: wbData ? wbData.hp : wb.maxHp
    };
    inWorldBossBattle = true;
    
    // Hide world boss list, show combat
    document.getElementById('worldBossesList').classList.add('hidden');
    document.getElementById('worldBossCombatCard').classList.remove('hidden');
    document.getElementById('worldBossTitle').textContent = `🌍 ${currentWorldBoss.name}`;
    
    // Update display
    document.getElementById('wbMonsterName').textContent = currentWorldBoss.name;
    document.getElementById('wbMonsterLevel').textContent = currentWorldBoss.level;
    document.getElementById('wbMonsterStrength').textContent = currentWorldBoss.strength;
    document.getElementById('wbMonsterDefense').textContent = currentWorldBoss.defense;
    updateWorldBossHP();
    
    document.getElementById('worldBossCombatLog').innerHTML = '<div class="log-entry">⚔️ Бой с мировым боссом начался!</div>';
    document.getElementById('worldBossRewardDisplay').classList.add('hidden');
    
    updateUI();
}

function updateWorldBossHP() {
    const hpText = document.getElementById('wbMonsterHpText');
    const hpBar = document.getElementById('wbMonsterHpBar');
    
    if (hpText) hpText.textContent = `${Math.max(0, currentWorldBoss.currentHp)} / ${currentWorldBoss.maxHp}`;
    
    const hpPercent = (currentWorldBoss.currentHp / currentWorldBoss.maxHp) * 100;
    if (hpBar) {
        hpBar.style.width = `${Math.max(0, hpPercent)}%`;
        hpBar.textContent = `${Math.max(0, currentWorldBoss.currentHp)} HP`;
    }
}

function worldBossAttack() {
    if (!inWorldBossBattle) return;
    
    const stats = getStats();
    
    // Player attacks
    const playerDmg = Math.max(1, stats.strength + Math.floor(Math.random() * 7) - 3 - currentWorldBoss.defense);
    currentWorldBoss.currentHp -= playerDmg;
    
    addWorldBossLog(`💥 Вы нанесли ${playerDmg} урона ${currentWorldBoss.name}`);
    updateWorldBossHP();
    
    // Save progress
    player.worldBosses[currentWorldBoss.id].hp = Math.max(0, currentWorldBoss.currentHp);
    savePlayer();
    
    // Check boss defeated
    if (currentWorldBoss.currentHp <= 0) {
        worldBossVictory();
        return;
    }
    
    // Boss attacks
    const bossDmg = Math.max(1, currentWorldBoss.strength + Math.floor(Math.random() * 10) - 5 - stats.defense);
    player.hp -= bossDmg;
    player.hp = Math.max(0, player.hp);
    
    addWorldBossLog(`🗡️ ${currentWorldBoss.name} нанес вам ${bossDmg} урона`);
    updateUI();
    
    // Check player defeated
    if (player.hp <= 0) {
        worldBossDefeat();
    }
}

function addWorldBossLog(text) {
    const logDiv = document.getElementById('worldBossCombatLog');
    if (!logDiv) return;
    const entry = document.createElement('div');
    entry.className = 'log-entry';
    entry.textContent = text;
    logDiv.appendChild(entry);
    logDiv.scrollTop = logDiv.scrollHeight;
}

function worldBossVictory() {
    inWorldBossBattle = false;
    addWorldBossLog(`✅ ${currentWorldBoss.name} повержен!`);
    
    // Award rewards
    player.experience += currentWorldBoss.rewards.exp;
    player.gold += currentWorldBoss.rewards.gold;
    
    const loot = [];
    currentWorldBoss.rewards.items.forEach(itemName => {
        player.inventory[itemName] = (player.inventory[itemName] || 0) + 1;
        loot.push(itemName);
    });
    
    // Mark as defeated
    player.worldBosses[currentWorldBoss.id].defeated = true;
    player.worldBosses[currentWorldBoss.id].hp = 0;
    
    checkLevelUp();
    
    // Show rewards
    const rewardDiv = document.getElementById('worldBossRewardDisplay');
    if (rewardDiv) {
        rewardDiv.classList.remove('hidden');
        rewardDiv.innerHTML = `
            <h3>🎊 Мировой босс побежден!</h3>
            <div class="reward-item">💰 Золото: +${currentWorldBoss.rewards.gold}</div>
            <div class="reward-item">⭐ Опыт: +${currentWorldBoss.rewards.exp}</div>
            ${loot.length > 0 ? `<div class="reward-item">🎁 Добыча: ${loot.join(', ')}</div>` : ''}
            <button class="btn btn-primary" onclick="exitWorldBoss()" style="margin-top: 15px;">Вернуться к списку мировых боссов</button>
        `;
    }
    
    updateUI();
    loadWorldBosses();
}

function worldBossDefeat() {
    inWorldBossBattle = false;
    addWorldBossLog('💀 Вы были побеждены!');
    
    // Save current HP progress
    player.worldBosses[currentWorldBoss.id].hp = Math.max(0, currentWorldBoss.currentHp);
    
    alert(`Вы были побеждены! Прогресс сохранен: ${currentWorldBoss.currentHp}/${currentWorldBoss.maxHp} HP осталось у босса.\n\nВас вылечили в городе.`);
    player.hp = getStats().maxHp;
    exitWorldBoss();
}

function exitWorldBoss() {
    inWorldBossBattle = false;
    currentWorldBoss = null;
    
    document.getElementById('worldBossCombatCard').classList.add('hidden');
    document.getElementById('worldBossesList').classList.remove('hidden');
    
    updateUI();
    loadWorldBosses();
}

// ═══════════════════════════════════════════════════════════════════
// EVENT LISTENERS
// ═══════════════════════════════════════════════════════════════════

// Enter key for login
if (document.getElementById('username')) {
    document.getElementById('username').addEventListener('keypress', (e) => {
        if (e.key === 'Enter') login();
    });
}

// Initialize game
initGame();
