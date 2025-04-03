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
function addStylingToStartButton() {
    const buttonRef = document.getElementById('start_button');
    buttonRef.disabled = true;
    buttonRef.style.opacity = "0.5";
    buttonRef.style.cursor = "not-allowed";
    setTimeout(() => {
        buttonRef.classList.add('d__none');
    }, 500);
}
