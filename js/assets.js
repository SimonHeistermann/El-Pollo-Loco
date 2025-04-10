let currentHz = 120;
const baseHz = 60;
let speedFactor = currentHz / baseHz;

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
 * Redirects the user to the settings page (settings.html).
 */
function openSettings() {
    window.location.href = 'settings.html';
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
    buttonRef.style.cursor = "pointer";
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

/**
 * Enables the snore sound by attempting to play it once after a user interaction.
 * This is required to comply with browser autoplay policies, which block sound
 * playback unless triggered by a user gesture.
 *
 * The sound is immediately paused and reset after playing to ensure it can be
 * played later without restrictions.
 */
function enableSnoreSound() {
    world.character.snoreSound.play()
        .then(() => {
            world.character.snoreSound.pause();
            world.character.snoreSound.currentTime = 0;
        })
        .catch(e => console.log('Autoplay blocked:', e));
}

/**
 * Determines if the current device is a mobile device based on the pointer and hover capabilities.
 * This checks for touch devices by evaluating if the device does not support hover or has a coarse pointer (e.g., touch screen).
 * 
 * @returns {boolean} True if the device is a mobile/touch device, otherwise false.
 */
function isMobile() {
    return window.matchMedia('(hover: none) and (pointer: coarse)').matches;
}

/**
 * Applies the styles necessary to lock the layout in landscape mode.
 * Adds specific CSS classes to lock the screen in landscape orientation for better gameplay experience.
 * 
 * @returns {void}
 */
function applyLandscapeLockStyles() {
    document.body.classList.add('locked__landscape');
    document.documentElement.classList.add('locked__landscape');
    document.querySelector('.main__container').classList.add('main__locked__container');
}

/**
 * Removes the styles that lock the layout in landscape mode.
 * Reverts the screen layout back to its default state after unlocking.
 * 
 * @returns {void}
 */
function removeLandscapeLockStyles() {
    document.body.classList.remove('locked__landscape');
    document.documentElement.classList.remove('locked__landscape');
    document.querySelector('.main__container').classList.remove('main__locked__container');
}

/**
 * Adds mobile-specific controls to the page if the device supports touch events.
 * This function checks for the presence of touch support and, if present, makes mobile controls visible.
 * 
 * @returns {void}
 */
function addMobileControls() {
    const isTouchDevice = 'ontouchstart' in window || navigator.maxTouchPoints > 0;
    if (isTouchDevice) {
        document.querySelector('.controls__container__smartphone')?.classList.add('show__controls');
    }
}

/**
 * Hides the mobile-specific controls on the page if the device supports touch events.
 * This function removes the visibility of mobile controls by removing the 'show__controls' class.
 * 
 * @returns {void}
 */
function hideMobileControls() {
    const isTouchDevice = 'ontouchstart' in window || navigator.maxTouchPoints > 0;
    if (isTouchDevice) {
        document.querySelector('.controls__container__smartphone')?.classList.remove('show__controls');
    }
}

/**
 * Toggles the visibility of the desktop controls on the page.
 * This function only runs if the game has already started (`gameStarted` is true).
 * It shows or hides the desktop controls based on the `show` parameter and
 * updates the visibility of the "show" and "hide" control toggle buttons accordingly.
 *
 * @param {boolean} show - If true, desktop controls are shown and the "hide" button is visible.
 *                         If false, desktop controls are hidden and the "show" button is visible.
 * @returns {void}
 */
function toggleControls(show) {
    if (!gameStarted) return;
    const desktopControls = document.querySelector('.controls__container');
    const btnHideControls = document.getElementById('do_not_see_mobile_controls_btn');
    const btnShowControls = document.getElementById('see_mobile_controls_btn');
    desktopControls.style.display = show ? 'flex' : 'none';
    btnHideControls.classList.toggle('d__none', !show);
    btnShowControls.classList.toggle('d__none', show);
}

/**
 * Toggles the visibility of the "How to Play" section.
 * When clicked, the button shows or hides the controls instructions.
 * 
 * @returns {void}
 */
function toggleHowToPlay() {
    const howToPlayContent = document.getElementById('how_to_play_content');
    howToPlayContent.classList.toggle('how_to_play__content_display');
}

/**
 * Toggles the visibility of the "How to Play" section on mobile devices.
 * 
 * Adds or removes the 'how_to_play__content_display' class to show or hide
 * the mobile-specific instructions content.
 */
function toggleHowToPlayMobile() {
    const howToPlayContent = document.getElementById('how_to_play_content_mobile');
    howToPlayContent.classList.toggle('how_to_play__content_display');
}

/**
 * Sets the frame rate and updates the displayed value.
 * This function also stores the frame rate in localStorage to persist it across sessions.
 * 
 * @param {number} value - The frame rate to be set, in frames per second (FPS).
 * @returns {void}
 */
function setFrameRate(value) {
    const frameRateDisplay = document.getElementById('frame_rate__display');
    frameRateDisplay.textContent = `${value} FPS`;
    localStorage.setItem('frameRate', value);
}

/**
 * Loads the frame rate from localStorage and applies it.
 * If the frame rate is found in localStorage, it updates the input field and the display.
 * It also updates the `currentHz` and `speedFactor` based on the stored frame rate.
 * 
 * @param {string} type - The type of loading context (e.g., 'settings') to handle the frame rate accordingly.
 * @returns {void}
 */
function loadFrameRate(type) {
    const storedFrameRate = localStorage.getItem('frameRate');
    if (storedFrameRate) {
        if (type == 'settings') {
            const frameRateInput = document.getElementById('frame_rate__input');
            frameRateInput.value = storedFrameRate; 
            setFrameRate(storedFrameRate); 
        }
        currentHz = storedFrameRate;
        speedFactor = currentHz / baseHz;
    }
    localStorage.setItem('frameRate', currentHz);
}

/**
 * Initializes the settings by loading the stored frame rate.
 * This function is called when the settings page or initialization is triggered.
 * 
 * @returns {void}
 */
function initSettings() {
    loadFrameRate('settings');
}

 /**
 * Hides the mobile footer by adding the 'd__none' class.
 * 
 * This function checks if the mobile footer element exists in the DOM.
 * If it does, it adds a class that hides it (typically using `display: none`).
 */
function removeMobileFooterAndHowToPlay() {
    const mobileFooterRef = document.getElementById('mobile_footer');
    if (mobileFooterRef) mobileFooterRef.classList.add('d__none');
    const mobileHowToPlayRef = document.getElementById('htp_container_mobile');
    if (mobileHowToPlayRef) mobileHowToPlayRef.classList.add('d__none');
}

/**
 * Adds a CSS class 'justify__content__flex__end' to the 'hud_top_container' element
 * to modify its styling. The class is used to align content to the end of the container
 * using flexbox layout.
 *
 * @function addHudTopContainerStyling
 * @returns {void} This function does not return any value.
 */
function addHudTopContainerStyling() {
    const hudTopContainerRef = document.getElementById('hud_top_container');
    if (hudTopContainerRef) hudTopContainerRef.classList.add('justify__content__flex__end');
}

/**
 * Prevents the default context menu from appearing when right-clicking on the page.
 * This is typically used to disable right-click functionality for specific UI elements.
 * 
 * @listens document#contextmenu
 * @param {Event} e - The event object for the contextmenu event.
 * @returns {void} This function does not return any value.
 */
document.addEventListener('contextmenu', e => e.preventDefault());

/**
 * Adds event listeners for entering and leaving fullscreen mode.
 * The function adds both 'click' and 'touchstart' event listeners
 * to the fullscreen and normal screen buttons. The 'touchstart' events
 * are marked as passive to improve performance on mobile devices.
 *
 * @function
 * @name addFullscreenEventListeners
 * @description Attaches event listeners to buttons for toggling fullscreen mode.
 * The function adds event listeners for 'click' and 'touchstart' on the
 * fullscreen and normal screen buttons. The 'touchstart' listeners are passive
 * to prevent blocking the scrolling behavior.
 */
function addFullscreenEventListeners() {
    const fullscreenButton = document.getElementById('fullscreen_btn');
    fullscreenButton.addEventListener('click', enterFullscreenMode);
    fullscreenButton.addEventListener('touchstart', enterFullscreenMode, { passive: true });
    const normalScreenButton = document.getElementById('normal_screen_btn');
    normalScreenButton.addEventListener('click', leaveFullscreenMode);
    normalScreenButton.addEventListener('touchstart', leaveFullscreenMode, { passive: true });
}

