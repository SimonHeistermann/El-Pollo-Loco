/**
 * Represents the start screen of the game.
 * Inherits from the DrawableObject class and displays a random start screen image.
 */
class StartScreen extends DrawableObject {
    height = 480;
    width = 854;
    y = 0;
    x = 0;
    IMAGES_STARTSCREEN = [
        './assets/img/9_intro_outro_screens/start/startscreen_1.png',
        './assets/img/9_intro_outro_screens/start/startscreen_2.png'
    ];

    /**
     * Creates a new StartScreen object and loads a random start screen image.
     */
    constructor() {
        super().loadImage(this.getRandomImage(this.IMAGES_STARTSCREEN));
    }
}
