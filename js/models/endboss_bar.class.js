/**
 * Class representing the end boss's health status bar.
 * Inherits from the StatusBars class and manages the end boss health bar's display.
 */
class EndbossBar extends StatusBars {
    /**
     * The image for the blue health bar (usually represents full health).
     * @type {Array<string>}
     */
    IMAGE_BLUE = [
        './assets/img/7_statusbars/2_statusbar_endboss/blue.png'
    ];

    /**
     * The image for the green health bar (usually represents moderate health).
     * @type {Array<string>}
     */
    IMAGE_GREEN = [
        './assets/img/7_statusbars/2_statusbar_endboss/green.png'
    ];

    /**
     * The image for the orange health bar (usually represents low health).
     * @type {Array<string>}
     */
    IMAGE_ORANGE = [
        './assets/img/7_statusbars/2_statusbar_endboss/orange.png'
    ];

    /**
     * Creates an instance of the EndbossBar and sets the appropriate image based on the current color setting.
     */
    constructor() {
        super().loadImages(this.IMAGE_BLUE);
        this.loadImages(this.IMAGE_GREEN);
        this.loadImages(this.IMAGE_ORANGE);
        this.y = this.height;
        this.x = 844 - this.width;
        this.setImage();
    }

    /**
     * Sets the image of the health bar based on the current color setting.
     * It dynamically selects the image to display depending on the health status.
     */
    setImage() {
        let image = this["IMAGE_" + colorSetting];
        if (image) {
            this.img = this.imageCache[image];
        }
    }
}
