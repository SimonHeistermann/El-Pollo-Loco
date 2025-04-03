let canvas;
let world;
const keyboard = new Keyboard();;
let currentHz = 120;
const baseHz = 60;
const speedFactor = currentHz / baseHz;
const keyMap = {
    "KeyW": "UP",
    "KeyA": "LEFT",
    "KeyS": "DOWN",
    "KeyD": "RIGHT",
    "ArrowUp": "UP",
    "ArrowDown": "DOWN",
    "ArrowLeft": "LEFT",
    "ArrowRight": "RIGHT",
    "Space": "SPACE",
    "ShiftLeft": "SHIFT",
    "ShiftRight": "SHIFT",
    "KeyE": "THROW"
};
let colorSetting = 'BLUE';
let difficulty = 'EASY';
let endBossReady = false;


/**
 * Initializes the game by setting up the canvas and the world.
 */
function init() {
    canvas = getCanvas();
    world = new World(canvas, keyboard);
}

/**
 * Listens to key events and updates the keyboard state based on key presses.
 * 
 * @param {KeyboardEvent} event - The event triggered when a key is pressed or released.
 */
document.addEventListener("keydown", (event) => updateKeyState(event.code, true));
document.addEventListener("keyup", (event) => updateKeyState(event.code, false));

/**
 * Updates the state of the keyboard object when a key is pressed or released.
 * 
 * @param {string} code - The code of the key (e.g., "KeyW").
 * @param {boolean} isKeyDown - True if the key is being pressed, false if it is being released.
 */
function updateKeyState(code, isKeyDown) {
    if (keyMap[code]) {
        keyboard[keyMap[code]] = isKeyDown;
    }
}

/**
 * Starts the game by applying styles to the start button, removing the start screen, and initializing the first level.
 */
function startGame() {
    addStylingToStartButton();
    world.removeStartScreen();
    initLevel1();
}

/**
 * Returns the amount of damage based on the difficulty level for the given object.
 * 
 * @param {Object} obj - The object to calculate the damage for (e.g., a Character or an Endboss).
 * @returns {number} - The amount of damage dealt to the object.
 */
function returnDamage(obj) {
    if (obj instanceof Character) {
        if (difficulty === 'EASY') return 1;
        if (difficulty === 'MEDIUM') return 2.5;
        if (difficulty === 'HARD') return 5;
    } else if (obj instanceof Endboss) {
        if (difficulty === 'EASY') return 3;
        if (difficulty === 'MEDIUM') return 2;
        if (difficulty === 'HARD') return 1.5;
    }
}

/**
 * Returns the percentage chance for bottles and coins to appear based on the selected difficulty level.
 * 
 * @returns {number} - The percentage chance (60 for Easy, 40 for Medium, 20 for Hard).
 */
function returnBottleAndCoinPercentage() {
    if (difficulty === 'EASY') return 60;
    if (difficulty === 'MEDIUM') return 40;
    if (difficulty === 'HARD') return 20;
}

/**
 * Returns the health percentage for the character based on the selected difficulty level.
 * 
 * @returns {number} - The health percentage (100 for Easy, 80 for Medium, 40 for Hard).
 */
function returnHealthPercentage() {
    if (difficulty === 'EASY') return 100;
    if (difficulty === 'MEDIUM') return 80;
    if (difficulty === 'HARD') return 40;
}
