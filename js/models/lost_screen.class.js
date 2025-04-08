/**
 * Represents the lost screen in the game.
 * Displays different images when the game ends and the player loses.
 * Inherits from the DrawableObject class and loads a random image from the 'game over' screen collection.
 */
class LostScreen extends DrawableObject {
    height = 480;
    width = 854;
    y = 0;
    x = 0;
    IMAGES_LOSTSCREEN = [
        './assets/img/9_intro_outro_screens/game_over/game over!.png',
        './assets/img/9_intro_outro_screens/game_over/game over.png',
        './assets/img/9_intro_outro_screens/game_over/oh no you lost!.png',
        './assets/img/9_intro_outro_screens/game_over/you lost.png',
        './assets/img/You won, you lost/Game over A.png',
        './assets/img/You won, you lost/Game Over.png',
        './assets/img/You won, you lost/You lost b.png',
        './assets/img/You won, you lost/You lost.png'
    ];

    /**
     * Constructor for the LostScreen class.
     * Loads a random image from the IMAGES_LOSTSCREEN array to be displayed.
     */
    constructor() {
        super().loadImage(this.getRandomImage(this.IMAGES_LOSTSCREEN));
    }
}
