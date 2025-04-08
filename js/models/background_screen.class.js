/**
 * Class representing the background screen displayed in the game.
 * This screen appears when the game is lost, displaying a background image.
 */
class BackgroundScreen extends DrawableObject {
    height = 480;
    width = 854;
    y = 0;
    x = 0;
    IMAGES_LOSTSCREEN = [
        './assets/img/5_background/first_half_background.png',
        './assets/img/5_background/second_half_background.png'
    ];

    /**
     * Creates an instance of the BackgroundScreen and initializes the background image.
     * A random image from the `IMAGES_LOSTSCREEN` array is chosen and displayed.
     * @constructor
     */
    constructor() {
        super().loadImage(this.getRandomImage(this.IMAGES_LOSTSCREEN));
    }
}
