function getCanvas() {
    canvas = document.getElementById('canvas');
    if(canvas) return canvas;
}

/**
 * Reloads the current website by reassigning the location.
 */
function reloadWebsite() {
    location.href = location.href;
}

function openHome() {
    window.location.href = 'index.html';
}

/**
 * Redirects the user to the legal notice page.
 */
function openLegalNoticeWebsite() {
    window.location.href = 'legal_notice.html';
}