/**
 * Class representing a Cloud object that moves across the screen.
 * It extends the MovableObject class and handles cloud-specific behavior like animation.
 */
class Cloud extends MovableObject {
    y = 0;
    width = 854;
    height = 480;
    cloudSpeed = 0.0625;

    /**
     * Creates an instance of a Cloud.
     * @param {string} cloudType - The type of cloud (used to load the appropriate image).
     * @param {number} x - The X-coordinate where the cloud is placed.
     */
    constructor(cloudType, x) {
        super().loadImage(`./assets/img/5_background/layers/4_clouds/${cloudType}.png`);
        this.x = x;
        this.animate();
    }

    /**
     * Animates the cloud by moving it to the left at a constant speed.
     */
    animate() {
        this.moveLeft(this.cloudSpeed);
    }
}
