/**
 * Retrieves the canvas element from the DOM.
 * 
 * @returns {HTMLCanvasElement|null} - The canvas element if found, otherwise null.
 */
function getCanvas() {
    canvas = document.getElementById('canvas');
    if (canvas) return canvas;
}

/**
 * Reloads the current website by reassigning the location to itself.
 */
function reloadWebsite() {
    location.href = location.href;
}

/**
 * Redirects the user to the home page (index.html).
 */
function openHome() {
    window.location.href = 'index.html';
}

/**
 * Redirects the user to the legal notice page (legal_notice.html).
 */
function openLegalNoticeWebsite() {
    window.location.href = 'legal_notice.html';
}

/**
 * Adds styling to the start button to disable it and fade it out.
 * The button will become unclickable and its opacity will be set to 0.5.
 * After 500ms, the button will be hidden by adding a CSS class to it.
 */
function addStylingToButton(type) {
    const buttonRef = document.getElementById(type + '_button');
    buttonRef.disabled = true;
    buttonRef.style.opacity = "0.5";
    buttonRef.style.cursor = "not-allowed";
    setTimeout(() => {
        buttonRef.classList.add('d__none');
    }, 500);
}

/**
 * Removes specific styling from a button and enables it.
 * @param {string} type - The type of button to modify (e.g., "restart").
 */
function removeStylingToButton(type) {
    const buttonRef = document.getElementById(type + '_button');
    buttonRef.disabled = false;
    buttonRef.style.opacity = "1";
    buttonRef.style.cursor = "standard";
}

/**
 * Checks the orientation of the window and adjusts the canvas height accordingly.
 * If in landscape mode and height is less than 480px, it adjusts the canvas height.
 */
function checkOrientation() {
    if (window.matchMedia("(orientation: landscape)").matches) {
        if (window.innerHeight < 480) {
            newHeight = window.innerHeight;
            document.getElementById('canvas').style.height = `${newHeight}px`;
        }
    }
    else {
        document.getElementById('canvas').style.height = `100%`;
    }
}

/**
 * Sets an interval and stores its ID to allow later clearing.
 * @param {function} fn - The function to be executed at intervals.
 * @param {number} time - The time interval in milliseconds.
 */
function setStoppableInterval(fn, time) {
    const id = setInterval(fn, time);
    intervalIDs.push(id);
}

/**
 * Clears all active intervals that have been set with setStoppableInterval.
 */
function clearAllIntervals() {
    intervalIDs.forEach(clearInterval);
    intervalIDs.length = 0; 
}

/**
 * Displays the restart button after a delay.
 */
function showRestartButton() {
    const buttonRef = document.getElementById('restart_button');
    removeStylingToButton('restart');
    setTimeout(() => {
        buttonRef.classList.remove('d__none');
    }, 1000);
}

/**
 * Clears all intervals in a safety version, using a loop to clear intervals.
 */
function clearAllIntervalsSafetyVersion() {
    for (let i = 1; i < 9999; i++) window.clearInterval(i);
}

/**
 * Changes the styling of the fullscreen button and its corresponding normal screen button.
 * @param {string} btn1 - The ID of the first button to modify.
 * @param {string} btn2 - The ID of the second button to modify.
 */
function changeFullscreenBtnStyling(btn1, btn2) {
    const btn1Ref = document.getElementById(btn1);
    btn1Ref.disabled = true;
    btn1Ref.classList.add('d__none');
    const btn2Ref = document.getElementById(btn2);
    btn2Ref.disabled = false;
    btn2Ref.classList.remove('d__none');
}

/**
 * Enters fullscreen mode by changing the button styling and calling enterFullscreen.
 */
function enterFullscreenMode() {
    changeFullscreenBtnStyling('fullscreen_btn', 'normal_screen_btn');
    enterFullscreen();
}

/**
 * Leaves fullscreen mode by changing the button styling and calling leaveFullscreen.
 */
function leaveFullscreenMode() {    
    changeFullscreenBtnStyling('normal_screen_btn', 'fullscreen_btn');
    leaveFullscreen();
}

/**
 * Enters fullscreen mode on the element with the ID 'game_container'.
 */
function enterFullscreen() {
    const elem = document.getElementById('game_container');
    if (elem.requestFullscreen) {
        elem.requestFullscreen();
    } else if (elem.webkitRequestFullscreen) {
        elem.webkitRequestFullscreen();
    } else if (elem.msRequestFullscreen) {
        elem.msRequestFullscreen();
    }
}

/**
 * Exits fullscreen mode.
 */
function leaveFullscreen() {
    if (document.exitFullscreen) {
        document.exitFullscreen();
    } else if (document.webkitExitFullscreen) { 
        document.webkitExitFullscreen();
    } else if (document.msExitFullscreen) { 
        document.msExitFullscreen();
    }
}

/**
 * Plays a given sound.
 * @param {HTMLAudioElement} sound - The audio element to play.
 */
function playSound(sound) {
    sound.play();
}

/**
 * Changes the sound button's visibility depending on the mute state.
 * @param {boolean} mute - If true, shows the mute button; otherwise, shows the unmute button.
 */
function changeSoundButtonStyling(mute) {
    const playSoundBtn = document.getElementById('play_sound_btn');
    const muteSoundBtn = document.getElementById('mute_sound_btn');
    playSoundBtn.classList.toggle('d__none', !mute); 
    muteSoundBtn.classList.toggle('d__none', mute);
}
