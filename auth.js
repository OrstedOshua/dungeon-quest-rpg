// ═══════════════════════════════════════════════════════════════════
// AUTHENTICATION SYSTEM (localStorage)
// ⚠️ WARNING: NOT SECURE - ONLY FOR DEMO PURPOSES
// ═══════════════════════════════════════════════════════════════════

let currentUser = null;

// Переключение между формами
function toggleForms() {
    const loginForm = document.getElementById('loginForm');
    const registerForm = document.getElementById('registerForm');
    const messageBox = document.getElementById('messageBox');
    
    loginForm.classList.toggle('hidden');
    registerForm.classList.toggle('hidden');
    messageBox.innerHTML = '';
    
    // Очистить поля
    document.getElementById('loginUsername').value = '';
    document.getElementById('loginPassword').value = '';
    document.getElementById('registerUsername').value = '';
    document.getElementById('registerPassword').value = '';
    document.getElementById('registerPasswordConfirm').value = '';
}

// Показ сообщения
function showMessage(message, type = 'error') {
    const messageBox = document.getElementById('messageBox');
    const className = type === 'success' ? 'success-message' : 'error-message';
    messageBox.innerHTML = `<div class="${className}">${message}</div>`;
}

// Регистрация
function register() {
    const username = document.getElementById('registerUsername').value.trim();
    const password = document.getElementById('registerPassword').value;
    const passwordConfirm = document.getElementById('registerPasswordConfirm').value;
    
    // Валидация
    if (!username || !password || !passwordConfirm) {
        showMessage('Заполните все поля!');
        return;
    }
    
    if (username.length < 3 || username.length > 20) {
        showMessage('Логин должен быть от 3 до 20 символов!');
        return;
    }
    
    if (password.length < 6) {
        showMessage('Пароль должен быть минимум 6 символов!');
        return;
    }
    
    if (password !== passwordConfirm) {
        showMessage('Пароли не совпадают!');
        return;
    }
    
    // Проверка существования пользователя
    const users = JSON.parse(localStorage.getItem('rpg_users') || '{}');
    if (users[username]) {
        showMessage('Такой логин уже существует!');
        return;
    }
    
    // Создание аккаунта
    users[username] = {
        password: password, // ⚠️ НЕ БЕЗОПАСНО - пароль не зашифрован!
        createdAt: new Date().toISOString()
    };
    
    localStorage.setItem('rpg_users', JSON.stringify(users));
    
    showMessage('✅ Аккаунт создан! Теперь вы можете войти.', 'success');
    
    // Автоматический вход через 2 секунды
    setTimeout(() => {
        document.getElementById('loginUsername').value = username;
        document.getElementById('loginPassword').value = password;
        toggleForms();
    }, 1500);
}

// Вход
function login() {
    const username = document.getElementById('loginUsername').value.trim();
    const password = document.getElementById('loginPassword').value;
    
    if (!username || !password) {
        showMessage('Введите логин и пароль!');
        return;
    }
    
    // Проверка креденшалов
    const users = JSON.parse(localStorage.getItem('rpg_users') || '{}');
    
    if (!users[username]) {
        showMessage('Пользователь не найден!');
        return;
    }
    
    if (users[username].password !== password) {
        showMessage('Неверный пароль!');
        return;
    }
    
    // Успешный вход
    currentUser = username;
    localStorage.setItem('rpg_currentUser', username);
    
    // Загрузить сохранение игрока
    loadPlayerData(username);
    
    // Показать игровой экран
    document.getElementById('loginScreen').classList.add('hidden');
    document.getElementById('gameScreen').classList.remove('hidden');
    document.getElementById('logoutButton').classList.remove('hidden');
    
    // Загрузить боевую вкладку
    loadBattleTab('adventures');
    
    updateUI();
    loadShop();
    loadQuests();
}

// Выход
function logout() {
    if (!confirm('Вы уверены, что хотите выйти?')) {
        return;
    }
    
    // Сохранить прогресс
    if (player && currentUser) {
        savePlayerData();
    }
    
    currentUser = null;
    player = null;
    localStorage.removeItem('rpg_currentUser');
    
    // Вернуться на экран входа
    document.getElementById('gameScreen').classList.add('hidden');
    document.getElementById('logoutButton').classList.add('hidden');
    document.getElementById('loginScreen').classList.remove('hidden');
    
    // Очистить поля
    document.getElementById('loginUsername').value = '';
    document.getElementById('loginPassword').value = '';
    document.getElementById('messageBox').innerHTML = '';
}

// Загрузка данных игрока
function loadPlayerData(username) {
    const savedData = localStorage.getItem(`rpg_player_${username}`);
    
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
    if (currentUser && player) {
        localStorage.setItem(`rpg_player_${currentUser}`, JSON.stringify(player));
    }
}

// Переопределение savePlayer() для работы с аккаунтами
function savePlayer() {
    savePlayerData();
}

// Проверка автовхода при загрузке страницы
window.addEventListener('DOMContentLoaded', () => {
    const savedUser = localStorage.getItem('rpg_currentUser');
    if (savedUser) {
        // Автовход
        currentUser = savedUser;
        loadPlayerData(savedUser);
        
        document.getElementById('loginScreen').classList.add('hidden');
        document.getElementById('gameScreen').classList.remove('hidden');
        document.getElementById('logoutButton').classList.remove('hidden');
        
        loadBattleTab('adventures');
        updateUI();
        loadShop();
        loadQuests();
    }
});
