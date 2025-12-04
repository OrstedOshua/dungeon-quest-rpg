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

// ... остальной код без изменений

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

// Helper function to get item stats text
function getItemStatsText(itemName) {
    if (!itemName) return '';
    
    const item = ITEMS.find(i => i.name === itemName);
    if (!item) return '';
    
    const stats = [];
    if (item.damage) {
        const sign = item.damage > 0 ? '+' : '';
        stats.push(`⚔️ ${sign}${item.damage}`);
    }
    if (item.defense) {
        const sign = item.defense > 0 ? '+' : '';
        stats.push(`🛡️ ${sign}${item.defense}`);
    }
    if (item.agility) {
        stats.push(`⚡ +${item.agility}`);
    }
    if (item.hp) {
        stats.push(`❤️ +${item.hp}`);
    }
    
    return stats.length > 0 ? ` (${stats.join(', ')})` : '';
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
    
    // Equipment display WITH STATS
    const weaponsList = player.weapons.filter(w => w).map(w => w + getItemStatsText(w));
    const weaponText = weaponsList.length > 0 ? weaponsList.join(', ') : 'Нет';
    
    const armorText = player.armor ? player.armor + getItemStatsText(player.armor) : 'Нет';
    
    const accessoriesList = player.accessories.filter(a => a).map(a => a + getItemStatsText(a));
    const accessoryText = accessoriesList.length > 0 ? accessoriesList.join(', ') : 'Нет';
    
    document.getElementById('equippedWeapon').textContent = weaponText;
    document.getElementById('equippedArmor').textContent = armorText;
    document.getElementById('equippedAccessory').textContent = accessoryText;
    
    // Inventory with action buttons
    updateInventoryUI();
    
    savePlayer();
}