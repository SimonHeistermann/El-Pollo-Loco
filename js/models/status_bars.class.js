/**
 * Represents a status bar in the game, which can display different statuses (e.g., health, energy).
 * Inherits from the DrawableObject class.
 */
class StatusBars extends DrawableObject {
    x = 10;
    y = 0;
    width = 238;
    height = 63.2;
    IMAGES_BLUE = [];
    IMAGES_GREEN = [];
    IMAGES_ORANGE = [];
    percentage;

    /**
     * Creates a new StatusBars object. The constructor calls the parent class' constructor.
     */
    constructor() {
        super();
    }
}
