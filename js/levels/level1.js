const level_end_x = 16000;
let level1;
const occupiedPositions = new Set();
let enemies = [];


/**
 * Initializes Level 1 by adding enemies and creating the level instance.
 * This function should be called to set up the level for gameplay.
 */
function initLevel1() {
    enemies = [];
    addAllEnemies();
    level1 = new Level(enemies, level_end_x);
    world.initLevel(level1);
}

/**
 * Adds all enemies to the level, including those inside and outside the map as well as the end boss.
 */
function addAllEnemies() {
    const numEnemies = getRandomEnemyCount(level_end_x, difficulty);
    addEnemiesInsideOfTheMap(numEnemies);
    addEnemiesOutsideOfTheMap(numEnemies);
    addEndboss();
}

/**
 * Returns a random number of enemies based on the difficulty level.
 * The number of enemies is determined by the difficulty and the length of the level.
 *
 * @param {string} difficulty - The difficulty level, which can be 'EASY', 'MEDIUM', 'HARD', or 'DEFAULT'.
 * @returns {number} The number of enemies to spawn based on the difficulty.
 */
function getRandomEnemyCount(difficulty) {
    const difficultyRanges = {
        'EASY': [600, 400],
        'MEDIUM': [500, 350],
        'HARD': [400, 250],
        'DEFAULT': [600, 400]
    };
    const [minDivisor, maxDivisor] = difficultyRanges[difficulty] || difficultyRanges['DEFAULT'];
    const minEnemies = Math.floor(level_end_x / minDivisor);
    const maxEnemies = Math.floor(level_end_x / maxDivisor);
    return Math.floor(Math.random() * (maxEnemies - minEnemies + 1)) + minEnemies;
}

/**
 * Adds enemies that are located inside the map, ensuring they don't overlap with each other.
 *
 * @param {number} numEnemies - The number of enemies to spawn.
 */
function addEnemiesInsideOfTheMap(numEnemies) {
    for (let i = 0; i < numEnemies; i++) {
        const enemyType = Math.random() > 0.5 ? Chicken : Poults;
        let enemy;
        let xPos;
        // Ensure that enemy does not spawn at an already occupied position
        do {
            xPos = 800 + Math.random() * (level_end_x - 500 - 800);
        } while (occupiedPositions.has(xPos));
        enemy = new enemyType();
        enemy.x = xPos;
        enemies.push(enemy);
        occupiedPositions.add(xPos);
    }
}

/**
 * Adds enemies that spawn outside the visible map area, ensuring they don't overlap.
 *
 * @param {number} numEnemies - The number of extra enemies to spawn.
 */
function addEnemiesOutsideOfTheMap(numEnemies) {
    const numExtraEnemies = Math.floor(numEnemies);
    for (let i = 0; i < numExtraEnemies; i++) {
        const enemyType = Math.random() > 0.5 ? Chicken : Poults;
        let enemy;
        let xPos;
        // Ensure enemy does not spawn at an already occupied position
        do {
            xPos = (level_end_x - 500) + Math.random() * (level_end_x / 2);
        } while (occupiedPositions.has(xPos));
        enemy = new enemyType();
        enemy.x = xPos;
        enemies.push(enemy);
        occupiedPositions.add(xPos);
    }
}

/**
 * Adds the end boss to the level at the end of the level's x position.
 */
function addEndboss() {
    const endBoss = new Endboss(level_end_x);
    enemies.push(endBoss);
}


