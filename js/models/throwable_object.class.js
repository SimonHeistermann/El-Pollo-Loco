/**
 * Represents a throwable object (bottle) in the game.
 * Inherits from the MovableObject class.
 */
class ThrowableObject extends MovableObject {
    IMAGE_BOTTLE = './assets/img/6_salsa_bottle/salsa_bottle.png';
    IMAGES_BOTTLE_THROWING = [
        './assets/img/6_salsa_bottle/bottle_rotation/1_bottle_rotation.png',
        './assets/img/6_salsa_bottle/bottle_rotation/2_bottle_rotation.png',
        './assets/img/6_salsa_bottle/bottle_rotation/3_bottle_rotation.png',
        './assets/img/6_salsa_bottle/bottle_rotation/4_bottle_rotation.png'
    ];
    IMAGES_BOTTLE_SPLASH = [
        './assets/img/6_salsa_bottle/bottle_rotation/bottle_splash/1_bottle_splash.png',
        './assets/img/6_salsa_bottle/bottle_rotation/bottle_splash/2_bottle_splash.png',
        './assets/img/6_salsa_bottle/bottle_rotation/bottle_splash/3_bottle_splash.png',
        './assets/img/6_salsa_bottle/bottle_rotation/bottle_splash/4_bottle_splash.png',
        './assets/img/6_salsa_bottle/bottle_rotation/bottle_splash/5_bottle_splash.png',
        './assets/img/6_salsa_bottle/bottle_rotation/bottle_splash/6_bottle_splash.png'
    ];
    groundLevel = 72;
    speedX = 20;
    stoppedThrow;
    throwInterval = null;
    throwingSound = sounds.throwingSound;

    /**
     * Creates a new throwable object (bottle).
     * @param {number} x - The x-position of the bottle.
     * @param {number} y - The y-position of the bottle.
     * @param {Object} world - The world the bottle belongs to (e.g., game world).
     */
    constructor(x, y, world) {
        super().loadImage(this.IMAGE_BOTTLE);
        this.loadImages(this.IMAGES_BOTTLE_THROWING);
        this.loadImages(this.IMAGES_BOTTLE_SPLASH);
        this.world = world;
        this.x = 100;
        this.y = 100;
        this.height = 120;
        this.width = 120;
        this.throw(x, y);
    }

    /**
     * Starts the throwing of the bottle, decreasing the bottle bar percentage
     * and initiating the throwing process.
     * @param {number} x - The x-position where the bottle is thrown.
     * @param {number} y - The y-position where the bottle is thrown.
     */
    throw(x, y) {
        let currentPercentage = this.world.bottleBar.percentage;
        this.world.bottleBar.setPercentage(currentPercentage - 10);
        this.startThrowing(x, y);
        this.startAnimation();
        this.throwingSound.play();
    }

    /**
     * Starts the movement of the bottle, applying gravity and updating its position.
     * @param {number} x - The starting x-position of the bottle.
     * @param {number} y - The starting y-position of the bottle.
     */
    startThrowing(x, y) {
        this.x = x;
        this.y = y;
        this.speedY = 10;
        this.applyGravity(this.groundLevel);
        const movementPerFrame = this.speedX / speedFactor;
        const intervalTime = 1000 / currentHz;
        this.throwInterval = setInterval(() => {
            this.x += movementPerFrame;
        }, intervalTime);
    }

    /**
     * Starts the animation of the bottle, either throwing or splashing depending
     * on its state.
     */
    startAnimation() {
        let lastAnimation = null;
        setInterval(() => {
            let newAnimation;
            let speed;
            if (this.isSplashing()) {
                newAnimation = this.IMAGES_BOTTLE_SPLASH;
                speed = 60;
            } else {
                newAnimation = this.IMAGES_BOTTLE_THROWING;
                speed = 60;
            }
            if (newAnimation !== lastAnimation) {
                lastAnimation = newAnimation;
                this.playAnimationWithSpeed(newAnimation, speed);
            }
        }, 50);
    }

    /**
     * Stops the throwing process, clearing the movement and gravity intervals.
     */
    stopThrowing() {
        clearInterval(this.throwInterval);
        clearInterval(this.gravityInterval);
        this.speedY = 0;
    }
}
