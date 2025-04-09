/**
 * HealthBar class represents a health status bar with multiple color themes.
 * It extends the StatusBars base class and manages the display of the health bar 
 * based on the character's health percentage.
 */
class HealthBar extends StatusBars {
    /**
     * Array of image paths for blue health bar status at 0%, 20%, ..., 100%.
     * @type {string[]}
     */
    IMAGES_BLUE = [
        './assets/img/7_statusbars/1_statusbar/2_statusbar_health/blue/0.png',
        './assets/img/7_statusbars/1_statusbar/2_statusbar_health/blue/20.png',
        './assets/img/7_statusbars/1_statusbar/2_statusbar_health/blue/40.png',
        './assets/img/7_statusbars/1_statusbar/2_statusbar_health/blue/60.png',
        './assets/img/7_statusbars/1_statusbar/2_statusbar_health/blue/80.png',
        './assets/img/7_statusbars/1_statusbar/2_statusbar_health/blue/100.png'
    ];

    /**
     * Array of image paths for green health bar status at 0%, 20%, ..., 100%.
     * @type {string[]}
     */
    IMAGES_GREEN = [
        './assets/img/7_statusbars/1_statusbar/2_statusbar_health/green/0.png',
        './assets/img/7_statusbars/1_statusbar/2_statusbar_health/green/20.png',
        './assets/img/7_statusbars/1_statusbar/2_statusbar_health/green/40.png',
        './assets/img/7_statusbars/1_statusbar/2_statusbar_health/green/60.png',
        './assets/img/7_statusbars/1_statusbar/2_statusbar_health/green/80.png',
        './assets/img/7_statusbars/1_statusbar/2_statusbar_health/green/100.png'
    ];

    /**
     * Array of image paths for orange health bar status at 0%, 20%, ..., 100%.
     * @type {string[]}
     */
    IMAGES_ORANGE = [
        './assets/img/7_statusbars/1_statusbar/2_statusbar_health/orange/0.png',
        './assets/img/7_statusbars/1_statusbar/2_statusbar_health/orange/20.png',
        './assets/img/7_statusbars/1_statusbar/2_statusbar_health/orange/40.png',
        './assets/img/7_statusbars/1_statusbar/2_statusbar_health/orange/60.png',
        './assets/img/7_statusbars/1_statusbar/2_statusbar_health/orange/80.png',
        './assets/img/7_statusbars/1_statusbar/2_statusbar_health/orange/100.png'
    ];


    /**
     * Constructs the HealthBar and loads all required images.
     * Initializes position and sets initial health percentage.
     */
    constructor() {
        super().loadImages(this.IMAGES_BLUE);
        this.loadImages(this.IMAGES_GREEN);
        this.loadImages(this.IMAGES_ORANGE);
        this.y = this.height - 15;
        this.percentage = returnHealthPercentage();
        this.setPercentage(this.percentage);
    }

    /**
     * Sets the health percentage and updates the displayed image accordingly.
     * @param {number} percentage - The current health value (0 to 100).
     */
    setPercentage(percentage) {
        if (percentage >= 0 && percentage <= 100) {
            this.percentage = percentage;
            let images = this["IMAGES_" + colorSetting];
            let index = this.resolveImageIndex();
            if (images) {
                this.img = this.imageCache[images[index]];
            }
        }
    }

    /**
     * Resolves which image index to use based on the current health percentage.
     * @returns {number} Index corresponding to the image for the current health.
     */
    resolveImageIndex() {
        return Math.floor(this.percentage / 20);
    }
}
