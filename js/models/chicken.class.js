/**
 * Class representing a Chicken enemy that moves across the screen.
 * It extends the MovableObject class and handles the walking and dead animations.
 */
class Chicken extends MovableObject {
    height = 122;
    width = 124;
    y = 480 - this.height - 40;
    groundLevel = 480 - this.height - 40;
    IMAGES_WALKING = [
        './assets/img/3_enemies_chicken/chicken_normal/1_walk/1_w.png',
        './assets/img/3_enemies_chicken/chicken_normal/1_walk/2_w.png',
        './assets/img/3_enemies_chicken/chicken_normal/1_walk/3_w.png'
    ];
    IMAGE_DEAD = [
        './assets/img/3_enemies_chicken/chicken_normal/2_dead/dead.png'
    ];
    chickenSpeed = 0.25 + Math.random() * 0.45;
    animationInterval = null;
    offset = { top: 5, left: 5, right: 5, bottom: 5 };

    /**
     * Creates an instance of a Chicken and initializes its position and animation.
     */
    constructor() {
        super().loadImage(this.IMAGES_WALKING[0]);
        this.x = 200 + Math.random() * 500;
        this.loadImages(this.IMAGES_WALKING);
        this.animate();
    }

    /**
     * Moves the chicken to the left and starts its walking animation.
     */
    animate() {
        this.moveLeft(this.chickenSpeed);
        this.animationInterval = setInterval(() => { 
            this.playAnimation(this.IMAGES_WALKING);
        }, 150);
    }
}
