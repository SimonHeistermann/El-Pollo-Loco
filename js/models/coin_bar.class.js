/**
 * Class representing a CoinBar, a status bar that shows the coin collection progress.
 * It changes the display image based on the percentage of coins collected.
 */
class CoinBar extends StatusBars {
    /**
     * Array of blue images representing the different coin collection percentages.
     * @type {string[]}
     */
    IMAGES_BLUE = [
        './assets/img/7_statusbars/1_statusbar/1_statusbar_coin/blue/0.png',
        './assets/img/7_statusbars/1_statusbar/1_statusbar_coin/blue/20.png',
        './assets/img/7_statusbars/1_statusbar/1_statusbar_coin/blue/40.png',
        './assets/img/7_statusbars/1_statusbar/1_statusbar_coin/blue/60.png',
        './assets/img/7_statusbars/1_statusbar/1_statusbar_coin/blue/80.png',
        './assets/img/7_statusbars/1_statusbar/1_statusbar_coin/blue/100.png'
    ];

    /**
     * Array of green images representing the different coin collection percentages.
     * @type {string[]}
     */
    IMAGES_GREEN = [
        './assets/img/7_statusbars/1_statusbar/1_statusbar_coin/green/0.png',
        './assets/img/7_statusbars/1_statusbar/1_statusbar_coin/green/20.png',
        './assets/img/7_statusbars/1_statusbar/1_statusbar_coin/green/40.png',
        './assets/img/7_statusbars/1_statusbar/1_statusbar_coin/green/60.png',
        './assets/img/7_statusbars/1_statusbar/1_statusbar_coin/green/80.png',
        './assets/img/7_statusbars/1_statusbar/1_statusbar_coin/green/100.png'
    ];

    /**
     * Array of orange images representing the different coin collection percentages.
     * @type {string[]}
     */
    IMAGES_ORANGE = [
        './assets/img/7_statusbars/1_statusbar/1_statusbar_coin/orange/0.png',
        './assets/img/7_statusbars/1_statusbar/1_statusbar_coin/orange/20.png',
        './assets/img/7_statusbars/1_statusbar/1_statusbar_coin/orange/40.png',
        './assets/img/7_statusbars/1_statusbar/1_statusbar_coin/orange/60.png',
        './assets/img/7_statusbars/1_statusbar/1_statusbar_coin/orange/80.png',
        './assets/img/7_statusbars/1_statusbar/1_statusbar_coin/orange/100.png'
    ];

    /**
     * Creates an instance of CoinBar.
     * Loads images and sets initial percentage value based on the bottle and coin percentage.
     */
    constructor() {
        super().loadImages(this.IMAGES_BLUE);
        this.loadImages(this.IMAGES_GREEN);
        this.loadImages(this.IMAGES_ORANGE);
        this.y = (2 * this.height) - 35;
        this.percentage = returnCoinPercentage();
        this.setPercentage(this.percentage);
    }

    /**
     * Sets the percentage of coins collected and updates the displayed image accordingly.
     * @param {number} percentage - The percentage of coins collected (0-100).
     */
    setPercentage(percentage) {
        if(percentage >= 0 && percentage <= 100) {
            this.percentage = percentage;
            let images = this["IMAGES_" + colorSetting];
            let index = this.resolveImageIndex();
            if (images) {
                this.img = this.imageCache[images[index]];
            }
        }
    }

    /**
     * Resolves the appropriate image index based on the percentage of coins collected.
     * @returns {number} The index of the image in the image array.
     */
    resolveImageIndex() {
        return Math.floor(this.percentage / 20);
    }
}
