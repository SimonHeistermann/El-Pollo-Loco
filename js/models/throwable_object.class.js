class ThrowableObject extends MovableObject {
    IMAGE_BOTTLE = '../assets/img/6_salsa_bottle/salsa_bottle.png';
    IMAGES_BOTTLE_THROWING = [
        '../assets/img/6_salsa_bottle/bottle_rotation/1_bottle_rotation.png',
        '../assets/img/6_salsa_bottle/bottle_rotation/2_bottle_rotation.png',
        '../assets/img/6_salsa_bottle/bottle_rotation/3_bottle_rotation.png',
        '../assets/img/6_salsa_bottle/bottle_rotation/4_bottle_rotation.png'
    ];
    IMAGES_BOTTLE_SPLASH = [
        '../assets/img/6_salsa_bottle/bottle_rotation/bottle_splash/1_bottle_splash.png',
        '../assets/img/6_salsa_bottle/bottle_rotation/bottle_splash/2_bottle_splash.png',
        '../assets/img/6_salsa_bottle/bottle_rotation/bottle_splash/3_bottle_splash.png',
        '../assets/img/6_salsa_bottle/bottle_rotation/bottle_splash/4_bottle_splash.png',
        '../assets/img/6_salsa_bottle/bottle_rotation/bottle_splash/5_bottle_splash.png',
        '../assets/img/6_salsa_bottle/bottle_rotation/bottle_splash/6_bottle_splash.png'
    ];
    groundLevel = 72;
    speedX = 20;

    constructor(x, y) {
        super().loadImage(this.IMAGE_BOTTLE);
        this.loadImages(this.IMAGES_BOTTLE_THROWING);
        this.loadImages(this.IMAGES_BOTTLE_SPLASH);
        this.x = 100;
        this.y = 100;
        this.height = 120;
        this.width = 120;
        this.throw(x, y);
    }

    throw(x, y) {
        this.startThrowing(x, y);
        this.startAnimation();
    }

    startThrowing(x, y) {
        this.x = x;
        this.y = y;
        this.speedY = 10;
        this.applyGravity(this.groundLevel);
        const movementPerFrame = this.speedX / speedFactor;
        const intervalTime = 1000 / currentHz;
        this.throwInterval = setInterval(() => {
            this.x += movementPerFrame;
            if (this.y > 480) {
                this.removeObject();
            }
        }, intervalTime);
    }

    startAnimation() {
        let lastAnimation = null;
        setInterval(() => {
            let newAnimation;
            let speed;
            if (this.isHitting()) {
                newAnimation = this.IMAGES_BOTTLE_SPLASH;
                speed = 200;
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
    
}