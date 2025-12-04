// ═══════════════════════════════════════════════════════════════════
// SIMPLE SAVE SYSTEM (localStorage without login)
// ═══════════════════════════════════════════════════════════════════

// Fallback WORLD_BOSSES if not defined
if (typeof WORLD_BOSSES === 'undefined') {
    var WORLD_BOSSES = [
        {
            id: 'titan_golem',
            name: '🗻 Титан-голем',
            level: 15,
            hp: 5000,
            maxHp: 5000,
            strength: 90,
            defense: 35,
            exp: 2000,
            gold: 1000,
            loot: {'Драконобоец': 0.3, 'Драконья чешуя': 0.4, 'Эликсир героя': 1.0}
        },
        {
            id: 'void_dragon',
            name: '🌌 Дракон Пустоты',
            level: 20,
            hp: 10000,
            maxHp: 10000,
            strength: 120,
            defense: 45,
            exp: 5000,
            gold: 2500,
            loot: {'Драконобоец': 0.5, 'Драконья чешуя': 0.6, 'Щит веры': 0.4}
        }
    ];
}

// Загрузка данных игрока
function loadPlayerData() {
    const savedData = localStorage.getItem('rpg_player_save');
    
    if (savedData) {
        player = JSON.parse(savedData);
        
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
    } else {
        // Создать нового персонажа
        player = {
            username: 'Герой',
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
            bossTickets: 0,
            worldBossTickets: 0,
            defeatedBosses: [],
            worldBosses: {},
            weaponSlots: 1,
            accessorySlots: 1,
            weapons: ['Деревянный меч'],
            accessories: [null],
            activeQuest: null
        };
        
        // Initialize world bosses
        WORLD_BOSSES.forEach(wb => {
            player.worldBosses[wb.id] = {
                hp: wb.maxHp,
                maxHp: wb.maxHp,
                defeated: false
            };
        });
    }
}

// Сохранение данных игрока
function savePlayerData() {
    if (typeof player !== 'undefined' && player) {
        localStorage.setItem('rpg_player_save', JSON.stringify(player));
    }
}

// Переопределение savePlayer() для совместимости
function savePlayer() {
    savePlayerData();
}

// Автозагрузка при загрузке страницы
window.addEventListener('DOMContentLoaded', () => {
    loadPlayerData();
    
    if (typeof loadBattleTab === 'function') {
        loadBattleTab('adventures');
    }
    if (typeof updateUI === 'function') {
        updateUI();
    }
    if (typeof loadShop === 'function') {
        loadShop();
    }
    if (typeof loadQuests === 'function') {
        loadQuests();
    }
});