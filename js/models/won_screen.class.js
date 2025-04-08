/**
 * Represents the "You Won" screen in the game.
 * Inherits from the DrawableObject class.
 */
class WonScreen extends DrawableObject {
    height = 480;
    width = 800;
    y = 0;
    x = 27;
    IMAGES_LOSTSCREEN = [
        './assets/img/You won, you lost/You Win A.png',
        './assets/img/You won, you lost/You won A.png'
    ];

    /**
     * Creates a new WonScreen object and loads a random image from the available options.
     */
    constructor() {
        super().loadImage(this.getRandomImage(this.IMAGES_LOSTSCREEN));
    }
}
