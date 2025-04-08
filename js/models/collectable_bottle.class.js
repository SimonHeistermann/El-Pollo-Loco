/**
 * Represents a collectable bottle in the game.
 * Inherits from CollectableObject and handles bottle-specific behavior.
 */
class CollectableBottle extends CollectableObject {

    /**
     * Array of images representing the bottle's appearance when on the ground.
     * Contains two images for animation or random selection.
     */
    IMAGES_BOTTLE_ON_GROUND = [
        './assets/img/6_salsa_bottle/1_salsa_bottle_on_ground.png',
        './assets/img/6_salsa_bottle/2_salsa_bottle_on_ground.png'
    ];

    /**
     * Array to track the X positions where bottles have already been placed.
     * This prevents placing bottles too close to each other.
     */
    static spawnedPositions = [];

    /**
     * Offset values for collision detection or position adjustment.
     */
    offset = {
        top: 20,
        left: 30,
        right: 30,
        bottom: 10
    };

    /**
     * Creates an instance of a collectable bottle.
     * Sets the image, position, and size of the bottle.
     * @param {number} edgeX - The X-coordinate at the edge of the current segment.
     * @param {number} segmentWidth - The width of the current segment.
     */
    constructor(edgeX, segmentWidth) {
        super().loadImage(this.getRandomImage(this.IMAGES_BOTTLE_ON_GROUND)); // Load random bottle image
        this.x = this.getRandomX(edgeX, segmentWidth); // Set random X-coordinate within the segment
        this.y = 340; // Set fixed Y-coordinate for the bottle
        this.height = 120; // Set height of the bottle
        this.width = 120; // Set width of the bottle
    }

    /**
    * Calculates a random X-coordinate for the bottle within the specified range,
    * ensuring the bottle does not overlap with other bottles.
    * @param {number} edgeX - The X-coordinate at the edge of the current segment.
    * @param {number} segmentWidth - The width of the current segment.
    * @returns {number|null} The X-coordinate where the bottle will be placed, or null if placement fails.
    */
    getRandomX(edgeX, segmentWidth) {
        const minX = Math.max(400, edgeX);
        const maxX = edgeX + segmentWidth;
        const distance = this.getRandomDistance();
        let attempts = 0;
        while (attempts < 50) {
            const newX = this.getRandomPosition(minX, maxX);
            if (this.isValidPosition(newX, minX, distance)) {
                CollectableBottle.spawnedPositions.push(newX);
                return newX;
            }
            attempts++;
        }
        return null;
    }

    /**
    * Generates a random distance value between 300 and 400.
    */
    getRandomDistance() {
        return Math.floor(Math.random() * 101) + 300;
    }

    /**
     * Returns a random position within the provided range.
    */
    getRandomPosition(minX, maxX) {
        return Math.floor(Math.random() * (maxX - minX) + minX);
    }

    /**
     * Checks if the position is valid (not too close to other bottles).
    */
    isValidPosition(newX, minX, distance) {
        if (newX - minX < distance) {
            newX = minX + distance;
        }
        return !CollectableBottle.spawnedPositions.some(pos => Math.abs(pos - newX) < distance);
    }
}
