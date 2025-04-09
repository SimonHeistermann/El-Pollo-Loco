let canvas;
let world;
const keyboard = new Keyboard();;
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
    "KeyE": "THROW"
};
let colorSetting = 'BLUE';
let difficulty = 'EASY';
let endBossReady = false;
let intervalIDs = [];
const sounds = {
    backgroundMusic: new Audio('./assets/sounds/background_rumba.mp3'),
    backgroundMusicEndboss: new Audio('./assets/sounds/background_endboss_dramatic_sound.mp3'),
    gameWon: new Audio('./assets/sounds/game_won_sound.mp3'),
    gameLost: new Audio('./assets/sounds/game_lost_sound.mp3'),
    bottleBreaks: new Audio('./assets/sounds/bottle_breaks_sound.mp3'),
    jumpSound: new Audio('./assets/sounds/jump_sound.mp3'),
    hurtSound: new Audio('./assets/sounds/hurt_sound.mp3'),
    collectSound: new Audio('./assets/sounds/collect_sound.mp3'),
    jumpAttackSound: new Audio('./assets/sounds/jump_attack_sound.mp3'),
    endbossHurtSound: new Audio('./assets/sounds/endboss_hurt_sound.mp3'),
    throwingSound: new Audio('./assets/sounds/throwing_sound.mp3'),
    snoreSound: new Audio('./assets/sounds/snore_sound.mp3')
};
let isMuted = localStorage.getItem('muted') === 'true';
let gameStarted = false;


/**
 * Initializes the game by setting up the canvas, applying the current mute state, 
 * and creating a new game world instance.
 */
function init() {
    // loadFrameRate();
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
 * Handles touch events for mobile controls (touchstart and touchend).
 * 
 * @param {Event} event - The event triggered by the touch.
 * @param {boolean} isTouchStart - True for touchstart, false for touchend.
 */
function handleControlTouch(event, isTouchStart) {
    const button = event.currentTarget;
    if (button) {
        const control = getControlFromButton(button);
        if (control) {
            keyboard[control] = isTouchStart;
        }
    }
}

/**
 * Maps the button clicked or touched to the corresponding control action.
 * 
 * This function maps the button's ID to its associated action, like "LEFT", "RIGHT", "UP", or "THROW".
 * The ID of the button must follow a specific pattern: `id_<action>_<device_type>`, e.g., `id_move_left_desktop`.
 * 
 * @param {HTMLElement} button - The button element that was clicked or touched.
 * @returns {string|null} - The control action (e.g., "LEFT", "RIGHT", "UP", "THROW"), or null if not recognized.
 */
function getControlFromButton(button) {
    const actionMap = {
        "left": "LEFT",
        "right": "RIGHT",
        "up": "UP",
        "throw": "THROW"
    };
    const action = button.id.split('_')[2]; 
    return actionMap[action] || null;
}

/**
 * Initializes the event listeners for the desktop control buttons.
 * 
 * This function sets up `mousedown`, `mouseup`, and `mouseleave` event listeners on each desktop control button. 
 * The `mousedown` event simulates a button press, while `mouseup` and `mouseleave` events simulate releasing the button.
 * The appropriate control action is then triggered based on the button clicked or touched.
 * 
 * @returns {void}
 */
function initDesktopControls() {
    document.querySelectorAll('.controls__container .controls__btn').forEach((button) => {
        button.addEventListener('mousedown', (event) => {
            handleControlTouch(event, true);
        });
        button.addEventListener('mouseup', (event) => {
            handleControlTouch(event, false);
        });
        button.addEventListener('mouseleave', (event) => {
            handleControlTouch(event, false);
        });
    });
}

/**
 * Adds event listeners for mobile control buttons (touchstart, touchend).
 * The event listeners handle touch interactions on the control buttons for mobile devices.
 * 
 * @returns {void}
 */
function initMobileControls() {
    document.querySelectorAll('.controls__container__smartphone .controls__btn').forEach((button) => {
        button.addEventListener('touchstart', (event) => {
            handleControlTouch(event, true);
        }, { passive: true });

        button.addEventListener('touchend', (event) => {
            handleControlTouch(event, false);
        }, { passive: true });
    });
}

/**
 * Initializes the control button listeners once the DOM is fully loaded.
 *
 * @returns {void}
 */
document.addEventListener('DOMContentLoaded', function () {
    initDesktopControls();
    initMobileControls();
});

/**
 * Starts the game by applying styles to the start button, removing the start screen, and initializing the first level.
 */
function startGame(type) {
    addingEssentialsToStartGame(type);
    enableSnoreSound();
    world.removeStartScreen();
    initLevel1();
    world.character.animate();
}

/**
 * Initializes essential setup required to start the game.
 * 
 * Sets the game state to started, applies landscape styling adjustments,
 * styles the button that triggered the game start, and adds mobile control elements to the UI.
 *
 * @param {string} type - The type or ID of the button used to start the game (used for styling).
 * @returns {void}
 */
function addingEssentialsToStartGame(type) {
    gameStarted = true;
    applyLandscapeLockStyles();
    addStylingToButton(type);
    addMobileControls();
    removeMobileFooterAndHowToPlay();
    addHudTopContainerStyling();
}

/**
 * Returns the amount of damage based on the difficulty level for the given object.
 * 
 * @param {Object} obj - The object to calculate the damage for (e.g., a Character or an Endboss).
 * @returns {number} - The amount of damage dealt to the object.
 */
function returnDamage(obj) {
    if (obj instanceof Character) {
        if (difficulty === 'EASY') return 0.2;
        if (difficulty === 'MEDIUM') return 0.5;
        if (difficulty === 'HARD') return 1;
    } else if (obj instanceof Endboss) {
        if (difficulty === 'EASY') return 0.6;
        if (difficulty === 'MEDIUM') return 2;
        if (difficulty === 'HARD') return 0.3;
    }
}

/**
 * Returns the percentage chance for **coins** to appear based on the selected difficulty level.
 * 
 * - EASY: 40%
 * - MEDIUM: 30%
 * - HARD: 20%
 * 
 * @returns {number} - The percentage chance for coins to appear.
 */
function returnCoinPercentage() {
    if (difficulty === 'EASY') return 40;
    if (difficulty === 'MEDIUM') return 30;
    if (difficulty === 'HARD') return 20;
}

/**
 * Returns the percentage chance for **bottles** to appear based on the selected difficulty level.
 * 
 * - EASY: 20%
 * - MEDIUM: 10%
 * - HARD: 5%
 * 
 * @returns {number} - The percentage chance for bottles to appear.
 */
function returnBottlePercentage() {
    if (difficulty === 'EASY') return 20;
    if (difficulty === 'MEDIUM') return 10;
    if (difficulty === 'HARD') return 5;
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
    addingEssentialsToStartGame(type);
    world.removeEndScreen();
    world = null;
    init();
    enableSnoreSound();
    world.removeStartScreen();
    initLevel1();
    world.character.animate();
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

