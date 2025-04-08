/**
 * Class representing a background object in the game.
 * This object can be moved and is typically used for static or scrolling background elements.
 */
class BackgroundObject extends MovableObject {
    width = 854;
    height = 480;

    /**
     * Creates an instance of the BackgroundObject with a specified image and position.
     * The object is placed at the bottom of the screen by default.
     * 
     * @param {string} imagePath - The path to the image that will be loaded for the background object.
     * @param {number} x - The x-coordinate where the background object will be placed.
     * @constructor
     */
    constructor(imagePath, x) {
        super().loadImage(imagePath);
        this.x = x;
        this.y = 480 - this.height;
    }
}
