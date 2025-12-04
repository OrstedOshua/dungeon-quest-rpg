let currentPlayer = null;
let currentMonster = null;
let inCombat = false;

// Login
async function login() {
  const username = document.getElementById('username').value.trim();
  if (!username) {
    alert('Введите имя персонажа!');
    return;
  }

  try {
    let response = await fetch(`/api/player/${username}`);
    
    if (response.status === 404) {
      // Create new player
      response = await fetch('/api/player/create', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username })
      });
      
      const data = await response.json();
      if (data.error) {
        alert(data.error);
        return;
      }
      currentPlayer = data.player;
    } else {
      currentPlayer = await response.json();
    }
    
    document.getElementById('loginScreen').classList.add('hidden');
    document.getElementById('gameScreen').classList.remove('hidden');
    updateUI();
    loadShop();
    loadQuests();
  } catch (error) {
    console.error('Login error:', error);
    alert('Ошибка подключения к серверу');
  }
}

// Update UI
async function updateUI() {
  const response = await fetch(`/api/player/${currentPlayer.username}`);
  currentPlayer = await response.json();
  
  const stats = currentPlayer.current_stats;
  
  // Character info
  document.getElementById('playerName').textContent = currentPlayer.username;
  document.getElementById('playerLevel').textContent = currentPlayer.level;
  document.getElementById('playerExp').textContent = `${currentPlayer.experience} / ${currentPlayer.exp_for_next_level}`;
  document.getElementById('playerGold').textContent = currentPlayer.gold;
  
  // Stats
  document.getElementById('playerHp').textContent = `${stats.hp} / ${stats.max_hp}`;
  document.getElementById('playerStrength').textContent = stats.strength;
  document.getElementById('playerDefense').textContent = stats.defense;
  document.getElementById('playerAgility').textContent = stats.agility;
  
  // HP bar
  const hpPercent = (stats.hp / stats.max_hp) * 100;
  const hpBar = document.getElementById('hpBar');
  hpBar.style.width = `${hpPercent}%`;
  hpBar.textContent = `${stats.hp} / ${stats.max_hp}`;
  
  // EXP bar
  const expPercent = (currentPlayer.experience / currentPlayer.exp_for_next_level) * 100;
  const expBar = document.getElementById('expBar');
  expBar.style.width = `${expPercent}%`;
  expBar.textContent = `${currentPlayer.experience} / ${currentPlayer.exp_for_next_level}`;
  
  // Equipment
  document.getElementById('equippedWeapon').textContent = currentPlayer.weapon || 'Нет';
  document.getElementById('equippedArmor').textContent = currentPlayer.armor || 'Нет';
  document.getElementById('equippedAccessory').textContent = currentPlayer.accessory || 'Нет';
  
  // Inventory
  const inventory = JSON.parse(currentPlayer.inventory);
  const inventoryDiv = document.getElementById('inventoryItems');
  inventoryDiv.innerHTML = '';
  
  for (const [item, count] of Object.entries(inventory)) {
    const itemDiv = document.createElement('div');
    itemDiv.className = 'inventory-item';
    itemDiv.innerHTML = `
      <div>${item}</div>
      <span class="item-count">x${count}</span>
    `;
    inventoryDiv.appendChild(itemDiv);
  }
  
  if (Object.keys(inventory).length === 0) {
    inventoryDiv.innerHTML = '<p style="color: var(--text-secondary);">Инвентарь пуст</p>';
  }
}

// Combat
async function startCombat() {
  if (inCombat) return;
  
  const response = await fetch('/api/combat/start', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ username: currentPlayer.username })
  });
  
  const data = await response.json();
  currentMonster = data.monster;
  inCombat = true;
  
  document.getElementById('combatArea').classList.remove('hidden');
  document.getElementById('monsterName').textContent = currentMonster.name;
  document.getElementById('monsterLevel').textContent = currentMonster.level;
  updateMonsterHP();
  
  document.getElementById('combatLog').innerHTML = '<div class="log-entry">Бой начался!</div>';
  document.getElementById('rewardDisplay').classList.add('hidden');
}

function updateMonsterHP() {
  const hpPercent = (currentMonster.hp / currentMonster.hp) * 100;
  const monsterHpBar = document.getElementById('monsterHpBar');
  monsterHpBar.style.width = `${Math.max(0, (currentMonster.hp / (currentMonster.hp + 100)) * 100)}%`;
  document.getElementById('monsterHp').textContent = `${Math.max(0, currentMonster.hp)} HP`;
}

async function attack() {
  if (!inCombat) return;
  
  const response = await fetch('/api/combat/attack', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ 
      username: currentPlayer.username,
      monster: currentMonster
    })
  });
  
  const data = await response.json();
  const logDiv = document.getElementById('combatLog');
  
  data.combat_log.forEach(msg => {
    const entry = document.createElement('div');
    entry.className = 'log-entry';
    entry.textContent = msg;
    logDiv.appendChild(entry);
  });
  
  logDiv.scrollTop = logDiv.scrollHeight;
  
  if (data.victory) {
    inCombat = false;
    currentMonster = null;
    
    const rewardDiv = document.getElementById('rewardDisplay');
    rewardDiv.classList.remove('hidden');
    rewardDiv.innerHTML = `
      <h3>Победа! 🎉</h3>
      <div class="reward-item">💰 Золото: +${data.rewards.gold}</div>
      <div class="reward-item">⭐ Опыт: +${data.rewards.exp}</div>
      ${data.rewards.leveled_up ? `<div class="reward-item" style="color: var(--success); font-weight: bold;">🎊 Новый уровень: ${data.rewards.new_level}!</div>` : ''}
      ${data.rewards.loot.length > 0 ? `<div class="reward-item">🎁 Добыча: ${data.rewards.loot.join(', ')}</div>` : ''}
    `;
    
    await updateUI();
  } else if (data.defeat) {
    inCombat = false;
    alert('Вы были побеждены! Вас вылечили в городе.');
    await healPlayer();
    document.getElementById('combatArea').classList.add('hidden');
  } else {
    currentMonster = data.monster;
    updateMonsterHP();
    await updateUI();
  }
}

function fleeCombat() {
  inCombat = false;
  currentMonster = null;
  document.getElementById('combatArea').classList.add('hidden');
}

// Heal
async function healPlayer() {
  const response = await fetch('/api/player/heal', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ username: currentPlayer.username })
  });
  
  const data = await response.json();
  if (data.error) {
    alert(data.error);
  } else {
    await updateUI();
    alert(`Вы восстановили здоровье за ${data.gold_spent} золота`);
  }
}

// Shop
async function loadShop() {
  const response = await fetch('/api/shop/items');
  const items = await response.json();
  
  const shopDiv = document.getElementById('shopItems');
  shopDiv.innerHTML = '';
  
  items.forEach(item => {
    const itemDiv = document.createElement('div');
    itemDiv.className = 'shop-item';
    
    const stats = [];
    if (item.damage > 0) stats.push(`⚔️ Урон: +${item.damage}`);
    if (item.defense_bonus > 0) stats.push(`🛡️ Защита: +${item.defense_bonus}`);
    if (item.agility_bonus > 0) stats.push(`⚡ Ловкость: +${item.agility_bonus}`);
    if (item.hp_bonus > 0) stats.push(`❤️ HP: +${item.hp_bonus}`);
    
    itemDiv.innerHTML = `
      <div class="item-info">
        <div class="item-name">${item.name}</div>
        <div class="item-stats">${stats.join(' | ')}</div>
        <div class="item-stats">Требуемый уровень: ${item.required_level}</div>
      </div>
      <div>
        <span class="item-price">💰 ${item.price}</span>
        <button class="btn btn-secondary" onclick="buyItem('${item.name}')" 
          ${currentPlayer.level < item.required_level || currentPlayer.gold < item.price ? 'disabled' : ''}>
          Купить
        </button>
      </div>
    `;
    
    shopDiv.appendChild(itemDiv);
  });
}

async function buyItem(itemName) {
  const response = await fetch('/api/shop/buy', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ 
      username: currentPlayer.username,
      item_name: itemName
    })
  });
  
  const data = await response.json();
  if (data.error) {
    alert(data.error);
  } else {
    await updateUI();
    await loadShop();
    alert(`Вы купили: ${itemName}`);
  }
}

// Quests
async function loadQuests() {
  const response = await fetch(`/api/quests?username=${currentPlayer.username}`);
  const quests = await response.json();
  
  const questDiv = document.getElementById('questList');
  questDiv.innerHTML = '';
  
  quests.forEach(quest => {
    const questItem = document.createElement('div');
    questItem.className = `quest-item ${quest.completed ? 'completed' : ''}`;
    questItem.innerHTML = `
      <div class="quest-title">${quest.title} ${quest.completed ? '✅' : ''}</div>
      <div class="quest-desc">${quest.description}</div>
      <div class="quest-reward">Награда: ${quest.reward_exp} опыта, ${quest.reward_gold} золота${quest.reward_item ? `, ${quest.reward_item}` : ''}</div>
    `;
    questDiv.appendChild(questItem);
  });
}

// Enter key for login
document.getElementById('username')?.addEventListener('keypress', (e) => {
  if (e.key === 'Enter') login();
});