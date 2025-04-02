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


function init() {
    canvas = getCanvas();
    world = new World(canvas, keyboard);
}

document.addEventListener("keydown", (event) => updateKeyState(event.code, true));
document.addEventListener("keyup", (event) => updateKeyState(event.code, false));

function updateKeyState(code, isKeyDown) {
    if (keyMap[code]) {
        keyboard[keyMap[code]] = isKeyDown;
    }
}

function returnDamage() {
    if(difficulty === 'EASY') return 1;
    if(difficulty === 'MEDIUM') return 2.5;
    if(difficulty === 'HARD') return 5;
}

function returnBottleAndCoinPercentage() {
    if(difficulty === 'EASY') return 60;
    if(difficulty === 'MEDIUM') return 40;
    if(difficulty === 'HARD') return 20;
}

function returnHealthPercentage() {
    if(difficulty === 'EASY') return 100;
    if(difficulty === 'MEDIUM') return 80;
    if(difficulty === 'HARD') return 40;
}
