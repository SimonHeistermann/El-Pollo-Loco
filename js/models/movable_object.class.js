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
    }
    energy = 100;
    lastHit = 0;

    constructor() {
        super();
    }

    applyGravity(groundLevel) {
        this.groundLevel = groundLevel;
        const gravityInterval = 1000 / currentHz;
        const adjustedAccelerationY = this.accelerationY * speedFactor;
        setInterval(() => {
            if (this.isAboveGroundLevel() || this.speedY > 0) {
                this.speedY -= adjustedAccelerationY;
                this.y -= this.speedY;
            } else {
                this.y = groundLevel;
                this.speedY = 0;
            }
        }, gravityInterval);
    }

    isAboveGroundLevel() {
        if (this instanceof ThrowableObject) return true;
        else return this.y < this.groundLevel;
    }

    removeObject() {
        clearInterval(this.throwInterval);
        clearInterval(this.gravityInterval);
        let index = world.throwableObjects.indexOf(this);
        if (index > -1) {
            world.throwableObjects.splice(index, 1);
        }
    }

    isColliding(obj) {
        return (
            this.x + this.offset.left + this.width - this.offset.right >= obj.x &&
            this.x + this.offset.left <= obj.x + obj.width &&
            this.y + this.offset.top + this.height - this.offset.bottom >= obj.y &&
            this.y + this.offset.top <= obj.y + obj.height
        );
    }

    isHitting() {

    }

    hit() {
        this.energy -= returnDamage();
        if (this.energy < 0) {
            this.energy = 0;
        } else {
            this.lastHit = new Date().getTime();
        }
    }

    isHurt() {
        let timePassed = new Date().getTime() - this.lastHit;
        timePassed = timePassed / 1000;
        return timePassed < 0.5;
    }

    isDead() {
        return this.energy == 0;
    }
    
    moveLeft(speed) {
        const movementPerFrame = speed / speedFactor;
        setInterval( () => {
            this.x -= movementPerFrame;
        }, 1000 / currentHz);
    }

    moveRight(speed) {
        const movementPerFrame = speed / speedFactor;
        setInterval( () => {
            this.x += movementPerFrame;
        }, 1000 / currentHz);
    }

    movingRight() {
        this.x += this.characterSpeed / speedFactor;
        this.otherDirection = false;
    }

    movingLeft() {
        this.x -= this.characterSpeed / speedFactor;
        this.otherDirection = true;
    }

    playAnimation(images) {
        let i = this.currentImage % images.length;
        let path = images[i];
        this.img = this.imageCache[path];
        this.currentImage++;
    }

    playAnimationWithSpeed(images, speed) {
        clearInterval(this.animationInterval);
        this.currentImage = 0;
        this.animationInterval = setInterval(() => {
            let i = this.currentImage % images.length;
            this.img = this.imageCache[images[i]];
            this.currentImage++;
        }, speed);
    }

    jump() {
        this.speedY = 15;
    }

}