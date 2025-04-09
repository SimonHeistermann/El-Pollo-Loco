/**
 * Represents a movable object in the game.
 * This class is a base class for all objects that have movement, gravity, and collisions.
 * Inherits from the DrawableObject class and handles basic movement, gravity, collisions, and animations.
 */
class MovableObject extends DrawableObject {
    currentImage = 0;
    otherDirection = false;
    speedY = 0;
    accelerationY = 0.25;
    groundLevel;
    offset = {
        top: 0,
        left: 0,
        right: 0,
        bottom: 0
    };
    energy = 100;
    lastHit = 0;
    gravityInterval;
    lastBottleHit = 0;
    moveLeftInterval;

    /**
     * Initializes the MovableObject with default properties.
     */
    constructor() {
        super();
    }

    /**
     * Applies gravity to the object, making it fall towards the ground.
     * @param {number} groundLevel - The y-coordinate that represents the ground level.
     */
    applyGravity(groundLevel) {
        this.groundLevel = groundLevel;
        const gravityIntervalTime = 1000 / currentHz;
        const adjustedAccelerationY = this.accelerationY * speedFactor;
        this.gravityInterval = setInterval(() => {
            this.lastY = this.y;
            if (this.isAboveGroundLevel() || this.speedY > 0) {
                this.speedY -= adjustedAccelerationY;
                this.y -= this.speedY;
            } else {
                this.y = groundLevel;
                this.speedY = 0;
            }
        }, gravityIntervalTime);
    }

    /**
     * Checks if the object is above the ground level.
     * @returns {boolean} - True if the object is above the ground, otherwise false.
     */
    isAboveGroundLevel() {
        if (this instanceof ThrowableObject) return true;
        else return this.y < this.groundLevel;
    }

    /**
     * Removes the object from the world and stops all intervals related to the object.
     */
    removeObject() {
        clearInterval(this.throwInterval);
        clearInterval(this.gravityInterval);
        this.speedY = 0;
        let index = world.throwableObjects.indexOf(this);
        if (index > -1) {
            world.throwableObjects.splice(index, 1);
        }
    }

    /**
    * Checks whether this object is colliding with another object.
    * Collision is based on the object's bounding boxes, taking offsets into account.
    * 
    * @param {Object} obj - The other object to check collision against. 
    *                       Must implement getBounds().
    * @returns {boolean} - True if the objects are colliding, false otherwise.
    */
    isColliding(obj) {
        const [aLeft, aRight, aTop, aBottom] = this.getBounds();
        const [bLeft, bRight, bTop, bBottom] = obj.getBounds();
        return (
            aRight >= bLeft &&
            aLeft <= bRight &&
            aBottom >= bTop &&
            aTop <= bBottom
        );
    }

    /**
     * Calculates the bounding box of the object, adjusted by its offset.
     *
     * @returns {number[]} - An array containing [left, right, top, bottom] bounds.
     */
    getBounds() {
        return [
            this.x + this.offset.left,
            this.x + this.width - this.offset.right,
            this.y + this.offset.top,
            this.y + this.height - this.offset.bottom
        ];
    }

    /**
     * Checks if this object is jumping on another object.
     * @param {Object} obj - The object to check if the current object is jumping on.
     * @returns {boolean} - True if the object is jumping on the other object, otherwise false.
     */
    isJumpingOn(obj) {
        let puffer = 50;
        if (obj instanceof Poults) puffer = 40;
        return (
            this.lastY < this.y &&
            this.y + this.height - this.offset.bottom >= obj.y + obj.offset.top &&
            this.y + this.height - this.offset.bottom <= obj.y + obj.offset.top + puffer &&
            this.x + this.width - this.offset.right > obj.x + obj.offset.left &&
            this.x + this.offset.left < obj.x + obj.width - obj.offset.right
        );
    }

    /**
     * Makes the object bounce upwards.
     */
    bounce() {
        this.speedY = 15;
    }

    /**
     * Registers a bottle hit for the object.
     */
    bottleHit() {
        this.lastBottleHit = new Date().getTime();
    }

    /**
     * Checks if the object is splashing (based on the time since it was hit by a bottle).
     * @returns {boolean} - True if the object is splashing, otherwise false.
     */
    isSplashing() {
        let timePassed = new Date().getTime() - this.lastBottleHit;
        timePassed = timePassed / 1000;
        return timePassed < 1;
    }

    /**
     * Checks if the bottle has hit the ground.
     * @returns {boolean} - True if the bottle has hit the ground, otherwise false.
     */
    bottleHasHitGround() {
        return this.y > 280;
    }

    /**
     * Reduces the object's energy by a certain amount and plays a hurt sound.
     */
    hit() {
        this.energy -= returnDamage(this);
        this.hurtSound.play();
        if (this.energy < 0) {
            this.energy = 0;
        } else {
            this.lastHit = new Date().getTime();
        }
    }

    /**
     * Checks if the object is hurt (based on the time since the last hit).
     * @returns {boolean} - True if the object is hurt, otherwise false.
     */
    isHurt() {
        let timePassed = new Date().getTime() - this.lastHit;
        timePassed = timePassed / 1000;
        return timePassed < 0.5;
    }

    /**
     * Applies knockback effect when hit by the endboss.
     * @param {number} speedX - The speed at which to apply the knockback.
     */
    knockbackFromEndboss(speedX) {
        if (this.isKnockedBack) return;
        this.isKnockedBack = true;
        this.moveLeft(speedX);
        this.speedY = 15;
        setTimeout(() => {
            this.moveLeft(0);
            this.isKnockedBack = false;
        }, 500);
    }

    /**
     * Checks if the object is dead (energy equals 0).
     * @returns {boolean} - True if the object is dead, otherwise false.
     */
    isDead() {
        return this.energy <= 0;
    }

    /**
     * Handles the death of the object, including stopping animations and applying death-related changes.
     */
    die() {
        clearInterval(this.animationInterval);
        this.loadImage(this.IMAGE_DEAD);
        this.offset = { top: 140, left: 5, right: 5, bottom: 10 };
        this.speedY = 10;
        let fallInterval = setInterval(() => {
            this.y += 5;
            if (this.y > 480) {
                clearInterval(fallInterval);
                this.removeFromWorld();
            }
        }, 50);
    }

    /**
     * Removes the object from the world (removes it from the enemies array).
     */
    removeFromWorld() {
        let index = world.level.enemies.indexOf(this);
        if (index > -1) {
            world.level.enemies.splice(index, 1);
        }
    }

    /**
     * Collects an item (such as a bottle or coin) and updates the corresponding bar.
     * @param {Object} collectable - The collectable item to collect.
     */
    collect(collectable) {
        if (collectable instanceof CollectableBottle) {
            let currentPercentage = this.world.bottleBar.percentage;
            this.world.bottleBar.setPercentage(currentPercentage + 10);
        } else if (collectable instanceof CollectableCoin) {
            let currentPercentage = this.world.coinBar.percentage;
            this.world.coinBar.setPercentage(currentPercentage + 2);
        }
        this.collectSound.play();
    }

    /**
     * Moves the object left at a given speed.
     * @param {number} speed - The speed at which to move the object.
     */
    moveLeft(speed) {
        clearInterval(this.moveLeftInterval);
        const movementPerFrame = speed / speedFactor;
        this.moveLeftInterval = setInterval(() => {
            this.x -= movementPerFrame;
        }, 1000 / currentHz);
    }

    /**
     * Moves the object right at a given speed.
     * @param {number} speed - The speed at which to move the object.
     */
    moveRight(speed) {
        const movementPerFrame = speed / speedFactor;
        setInterval(() => {
            this.x += movementPerFrame;
        }, 1000 / currentHz);
    }

    /**
     * Moves the character to the right.
     */
    movingRight() {
        this.x += this.characterSpeed / speedFactor;
        this.otherDirection = false;
    }

    /**
     * Moves the character to the left.
     */
    movingLeft() {
        this.x -= this.characterSpeed / speedFactor;
        this.otherDirection = true;
    }

    /**
     * Displays an image at the specified path.
     * @param {string} imagePath - The path to the image.
     */
    displayImage(imagePath) {
        let path = imagePath;
        this.img = this.imageCache[path];
    }

    /**
     * Plays an animation using an array of images.
     * @param {Array} images - An array of image paths for the animation.
     */
    playAnimation(images) {
        let i = this.currentImage % images.length;
        let path = images[i];
        this.img = this.imageCache[path];
        this.currentImage++;
    }

    /**
     * Plays an animation with a specified speed using an array of images.
     * @param {Array} images - An array of image paths for the animation.
     * @param {number} speed - The speed at which to cycle through the images.
     */
    playAnimationWithSpeed(images, speed) {
        clearInterval(this.animationInterval);
        this.currentImage = 0;
        this.animationInterval = setInterval(() => {
            let i = this.currentImage % images.length;
            this.img = this.imageCache[images[i]];
            this.currentImage++;
        }, speed);
    }

    /**
     * Makes the object jump with a specified speed and plays the jump sound.
     */
    jump() {
        this.speedY = 15;
        this.jumpSound.play();
    }
}
