/**
 * Represents a Poults enemy character in the game.
 * Inherits from the MovableObject class and handles the animation and movement of the Poults.
 */
class Poults extends MovableObject {
    height = 81.3;
    width = 82.67;
    y = 480 - this.height - 40;
    groundLevel = 480 - this.height - 40;
    IMAGES_WALKING = [
        './assets/img/3_enemies_chicken/chicken_small/1_walk/1_w.png',
        './assets/img/3_enemies_chicken/chicken_small/1_walk/2_w.png',
        './assets/img/3_enemies_chicken/chicken_small/1_walk/3_w.png',
    ];
    IMAGE_DEAD = [
        './assets/img/3_enemies_chicken/chicken_small/2_dead/dead.png'
    ];
    poultSpeed = 0.25 + Math.random() * 0.35;
    animationInterval = null;
    offset = { top: 10, left: 10, right: 10, bottom: 10 };

    /**
     * Creates a new Poults enemy object and initializes its position, image, and animation.
     */
    constructor() {
        super().loadImage(this.IMAGES_WALKING[0]);
        this.x = 200 + Math.random() * 500;
        this.loadImages(this.IMAGES_WALKING);
        this.animate();
    }

    /**
     * Starts the animation and movement of the Poults.
     * Moves the Poults to the left and plays the walking animation.
     */
    animate() {
        this.moveLeft(this.poultSpeed);
        this.animationInterval = setInterval(() => { 
            this.playAnimation(this.IMAGES_WALKING);
        }, 150);
    }
}
