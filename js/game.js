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
let intervalIDs = [];
const sounds = {
    backgroundMusic: new Audio('./assets/sounds/background_rumba.mp3'),
    backgroundMusicEndboss: new Audio('./assets/sounds/background_endboss_dramatic_sound.mp3'),
    chickenAndPoults: new Audio('./assets/sounds/chicken_and_poults_sound.mp3'),
    gameWon: new Audio('./assets/sounds/game_won_sound.mp3'),
    gameLost: new Audio('./assets/sounds/game_lost_sound.mp3'),
    bottleBreaks: new Audio('./assets/sounds/bottle_breaks_sound.mp3'),
    jumpSound: new Audio('./assets/sounds/jump_sound.mp3'),
    hurtSound: new Audio('./assets/sounds/hurt_sound.mp3'),
    collectSound: new Audio('./assets/sounds/collect_sound.mp3'),
    jumpAttackSound: new Audio('./assets/sounds/jump_attack_sound.mp3'),
    endbossHurtSound: new Audio('./assets/sounds/endboss_hurt_sound.mp3'),
    throwingSound: new Audio('./assets/sounds/throwing_sound.mp3')
};
let isMuted = localStorage.getItem('muted') === 'true';


/**
 * Initializes the game by setting up the canvas, applying the current mute state, 
 * and creating a new game world instance.
 */
function init() {
    canvas = getCanvas();
    setMuteState(isMuted);
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
function startGame(type) {
    addStylingToButton(type);
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
    if (difficulty === 'EASY') return 70;
    if (difficulty === 'MEDIUM') return 60;
    if (difficulty === 'HARD') return 50;
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

/**
 * Restarts the game by resetting necessary variables, removing screens, and reinitializing the game world.
 * @param {string} type - The type of action that triggered the restart (e.g., "restart").
 */
function restartGame(type) {
    endBossReady = false;
    intervalIDs = [];
    addStylingToButton(type);
    world.removeEndScreen();
    world = null;
    init();
    world.removeStartScreen();
    initLevel1();
}

/**
 * Toggles the mute state for all sounds.
 * @param {boolean} mute - If true, mutes all sounds; otherwise, unmutes them.
 */
function toggleMute(mute) {
    setMuteState(mute);
}

/**
 * Sets the mute state for all sounds and updates the sound button styling.
 * Also saves the mute state to localStorage.
 * @param {boolean} mute - If true, mutes all sounds; otherwise, unmutes them.
 */
function setMuteState(mute) {
    isMuted = mute;
    for (const sound in sounds) {
        sounds[sound].muted = mute;
    }
    changeSoundButtonStyling(mute);
    localStorage.setItem('muted', mute.toString());
}

