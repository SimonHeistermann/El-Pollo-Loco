/**
 * Class to handle the state of keyboard keys.
 * Tracks whether specific keys (e.g., UP, DOWN, LEFT, RIGHT, SPACE, SHIFT, THROW) are pressed.
 */
class Keyboard {
    /**
     * Creates an instance of the Keyboard class with default key states set to false.
     */
    constructor() {
        /**
         * Represents the state of the UP arrow key.
         * @type {boolean}
         */
        this.UP = false;

        /**
         * Represents the state of the DOWN arrow key.
         * @type {boolean}
         */
        this.DOWN = false;

        /**
         * Represents the state of the LEFT arrow key.
         * @type {boolean}
         */
        this.LEFT = false;

        /**
         * Represents the state of the RIGHT arrow key.
         * @type {boolean}
         */
        this.RIGHT = false;

        /**
         * Represents the state of the SPACE key (e.g., for jumping or action).
         * @type {boolean}
         */
        this.SPACE = false;

        /**
         * Represents the state of the THROW action key.
         * @type {boolean}
         */
        this.THROW = false;
    }
}
