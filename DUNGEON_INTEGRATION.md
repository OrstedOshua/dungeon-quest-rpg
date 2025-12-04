# 🏰 Интеграция системы подземелий

## Что добавлено:
- 5 подземелий с разными уровнями (3-14)
- Система этажей с последовательными боями
- Боссы на последнем этаже
- Особые награды за прохождение
- Отслеживание пройденных подземелий

## Шаг 1: Добавьте вкладку "Подземелья" в HTML

Найдите в `index.html` секцию `<!-- Tab Navigation -->` и добавьте после кнопки "Бой":

```html
<button class="tab-button" data-tab="dungeons" onclick="switchTab(event, 'dungeons')">
    🏰 Подземелья
</button>
```

## Шаг 2: Добавьте HTML для вкладки подземелий

После `<!-- Combat Tab -->` добавьте:

```html
<!-- Dungeons Tab -->
<div id="dungeonsTab" class="tab-content">
    <div class="card">
        <h2>🏰 Подземелья</h2>
        <p style="color: var(--text-secondary); margin-bottom: 15px;">Исследуйте опасные подземелья и сражайтесь с боссами</p>
        <div id="dungeonsList"></div>
    </div>

    <!-- Dungeon Combat -->
    <div id="dungeonCombatCard" class="card combat-card hidden">
        <h2 id="dungeonTitle">🏰 Подземелье</h2>
        
        <div id="dungeonCombatArea">
            <div class="combat-content">
                <div class="floor-info" id="floorInfo" style="background: var(--bg-card); padding: 10px; border-radius: 6px; margin-bottom: 15px; border-left: 3px solid var(--warning);"></div>
                
                <div class="monster-display" id="dungeonMonsterDisplay">
                    <h3 id="dungeonMonsterName">-</h3>
                    <div style="color: var(--text-secondary); margin-bottom: 10px;">
                        Уровень <span id="dungeonMonsterLevel">-</span> | 
                        ⚔️ <span id="dungeonMonsterStrength">-</span> | 
                        🛡️ <span id="dungeonMonsterDefense">-</span>
                    </div>
                    <div>
                        <div style="display: flex; justify-content: space-between; margin-bottom: 5px;">
                            <span>HP:</span>
                            <span id="dungeonMonsterHpText">-</span>
                        </div>
                        <div class="progress-bar">
                            <div class="progress-fill" id="dungeonMonsterHpBar" style="width: 100%; background: linear-gradient(90deg, #f56565, #c73851);">-</div>
                        </div>
                    </div>
                </div>
                
                <div class="combat-log" id="dungeonCombatLog"></div>
                
                <div id="dungeonRewardDisplay" class="reward-display hidden"></div>
            </div>
            
            <!-- Fixed dungeon action buttons -->
            <div style="position: absolute; bottom: 20px; left: 20px; right: 20px; background: var(--bg-card); padding: 15px; border-radius: 12px; box-shadow: 0 -4px 15px rgba(0, 0, 0, 0.3); z-index: 100;">
                <div class="combat-buttons">
                    <button id="dungeonAttackButton" class="btn" onclick="dungeonAttack()">⚔️ Атаковать</button>
                    <button class="btn btn-secondary" onclick="exitDungeon()">🚪 Выйти из подземелья</button>
                </div>
            </div>
        </div>
    </div>
</div>
```

## Шаг 3: Добавьте код из dungeons.js в ваш script

1. Откройте `dungeons.js`
2. Скопируйте весь код (кроме последней строки с console.log)
3. Вставьте в раздел `<script>` после определения QUESTS

## Шаг 4: Обновите функцию login()

В функции `login()` добавьте поле `completedDungeons` в объект игрока:

```javascript
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
    completedDungeons: [],  // <-- Добавьте эту строку
    killCount: {}
};
```

Также добавьте вызов `loadDungeons()` в конце функции:

```javascript
updateUI();
loadShop();
loadQuests();
loadDungeons();  // <-- Добавьте это
```

## Шаг 5: Обновите функцию switchTab()

Добавьте загрузку подземелий при переключении вкладки:

```javascript
function switchTab(evt, tabName) {
    document.querySelectorAll('.tab-content').forEach(tab => tab.classList.remove('active'));
    document.querySelectorAll('.tab-button').forEach(btn => btn.classList.remove('active'));
    document.getElementById(tabName + 'Tab').classList.add('active');
    evt.currentTarget.classList.add('active');
    
    // Добавьте это:
    if (tabName === 'dungeons') {
        loadDungeons();
    }
}
```

## Готово! 🎉

Теперь у вас есть:
- ✅ Новая вкладка "Подземелья"
- ✅ 5 разных подземелий с боссами
- ✅ Прогрессия по этажам
- ✅ Особые награды
- ✅ Отслеживание прохождения

## Подземелья:

1. **Забытые катакомбы** (ур. 3)
   - 3 этажа
   - Босс: Король крыс

2. **Логово гоблинов** (ур. 5)
   - 3 этажа
   - Босс: Гоблин-вождь

3. **Ледяная крепость** (ур. 7)
   - 3 этажа
   - Босс: Ледяной король

4. **Темная башня** (ур. 10)
   - 4 этажа
   - Босс: Темный маг

5. **Драконье логово** (ур. 14)
   - 3 этажа
   - Босс: Древний дракон
