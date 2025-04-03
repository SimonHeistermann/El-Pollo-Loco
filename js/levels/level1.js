const level_end_x = 8000;
let level1;
const occupiedPositions = new Set();
const enemies = [];

function initLevel1() {
    addAllEnemies();
    level1 = new Level(enemies, level_end_x);
    world.initLevel(level1);
}

function addAllEnemies() {
    const numEnemies = getRandomEnemyCount(level_end_x, difficulty);
    addEnemiesInsideOfTheMap(numEnemies);
    addEnemiesOutsideOfTheMap(numEnemies);
    addEndboss();
}

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

function addEnemiesInsideOfTheMap(numEnemies) {
    for (let i = 0; i < numEnemies; i++) {
        const enemyType = Math.random() > 0.5 ? Chicken : Poults;
        let enemy;
        let xPos;
        do {
            xPos = 800 + Math.random() * (level_end_x - 500 - 800);
        } while (occupiedPositions.has(xPos));
        enemy = new enemyType();
        enemy.x = xPos;
        enemies.push(enemy);
        occupiedPositions.add(xPos);
    }
}

function addEnemiesOutsideOfTheMap(numEnemies) {
    const numExtraEnemies = Math.floor(numEnemies);
    for (let i = 0; i < numExtraEnemies; i++) {
        const enemyType = Math.random() > 0.5 ? Chicken : Poults;
        let enemy;
        let xPos;
        do {
            xPos = (level_end_x - 500) + Math.random() * (level_end_x / 2);
        } while (occupiedPositions.has(xPos));
        enemy = new enemyType();
        enemy.x = xPos;
        enemies.push(enemy);
        occupiedPositions.add(xPos);
    }
}

function addEndboss() {
    const endBoss = new Endboss(level_end_x);
    enemies.push(endBoss);
}





