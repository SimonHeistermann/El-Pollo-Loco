/**
 * Represents a collectable coin in the game.
 * Inherits from CollectableObject and handles coin-specific behavior.
 */
class CollectableCoin extends CollectableObject {
    
    /**
     * Array of images representing the coin's appearance.
     * Contains two images for animation or random selection.
     */
    IMAGES_COINS = [
        './assets/img/8_coin/coin_1.png',
        './assets/img/8_coin/coin_2.png'
    ];

    /**
     * Offset values for collision detection or position adjustment.
     */
    offset = {
        top: 80,
        left: 80,
        right: 80,
        bottom: 80
    }

    /**
     * Creates an instance of a collectable coin.
     * Sets the image and position of the coin.
     * @param {number} x - The x-coordinate where the coin will be placed.
     * @param {number} y - The y-coordinate where the coin will be placed.
     */
    constructor(x, y) {
        super().loadImage(this.getRandomImage(this.IMAGES_COINS));
        this.x = x;
        this.y = y;
        this.height = 200;
        this.width = 200;
    }
}

