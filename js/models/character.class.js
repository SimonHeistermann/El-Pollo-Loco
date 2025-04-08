/**
 * Class representing a Character in the game that can walk, jump, and interact with the world.
 * It extends the MovableObject class and manages animations, movements, and interactions.
 */
class Character extends MovableObject {
    height = 368;
    width = 236;
    y = 480 - this.height - 40;
    groundLevel = 480 - this.height - 40;
    x = 250;
    IMAGES_IDLE = [
        './assets/img/2_character_pepe/1_idle/idle/I-1.png',
        './assets/img/2_character_pepe/1_idle/idle/I-2.png',
        './assets/img/2_character_pepe/1_idle/idle/I-3.png',
        './assets/img/2_character_pepe/1_idle/idle/I-4.png',
        './assets/img/2_character_pepe/1_idle/idle/I-5.png',
        './assets/img/2_character_pepe/1_idle/idle/I-6.png',
        './assets/img/2_character_pepe/1_idle/idle/I-7.png',
        './assets/img/2_character_pepe/1_idle/idle/I-8.png',
        './assets/img/2_character_pepe/1_idle/idle/I-9.png',
        './assets/img/2_character_pepe/1_idle/idle/I-10.png'
    ];
    IMAGES_LONG_IDLE = [
        './assets/img/2_character_pepe/1_idle/long_idle/I-11.png',
        './assets/img/2_character_pepe/1_idle/long_idle/I-12.png',
        './assets/img/2_character_pepe/1_idle/long_idle/I-13.png',
        './assets/img/2_character_pepe/1_idle/long_idle/I-14.png',
        './assets/img/2_character_pepe/1_idle/long_idle/I-15.png',
        './assets/img/2_character_pepe/1_idle/long_idle/I-16.png',
        './assets/img/2_character_pepe/1_idle/long_idle/I-17.png',
        './assets/img/2_character_pepe/1_idle/long_idle/I-18.png',
        './assets/img/2_character_pepe/1_idle/long_idle/I-19.png',
        './assets/img/2_character_pepe/1_idle/long_idle/I-20.png'
    ];
    IMAGES_WALKING = [
        './assets/img/2_character_pepe/2_walk/W-21.png',
        './assets/img/2_character_pepe/2_walk/W-22.png',
        './assets/img/2_character_pepe/2_walk/W-23.png',
        './assets/img/2_character_pepe/2_walk/W-24.png',
        './assets/img/2_character_pepe/2_walk/W-25.png',
        './assets/img/2_character_pepe/2_walk/W-26.png'
    ];
    IMAGES_JUMPING = [
        './assets/img/2_character_pepe/3_jump/J-31.png',
        './assets/img/2_character_pepe/3_jump/J-32.png',
        './assets/img/2_character_pepe/3_jump/J-33.png',
        './assets/img/2_character_pepe/3_jump/J-34.png',
        './assets/img/2_character_pepe/3_jump/J-35.png',
        './assets/img/2_character_pepe/3_jump/J-36.png',
        './assets/img/2_character_pepe/3_jump/J-37.png',
        './assets/img/2_character_pepe/3_jump/J-38.png',
        './assets/img/2_character_pepe/3_jump/J-39.png',
    ];
    IMAGES_HURT = [
        './assets/img/2_character_pepe/4_hurt/H-41.png',
        './assets/img/2_character_pepe/4_hurt/H-42.png',
        './assets/img/2_character_pepe/4_hurt/H-43.png',
    ];
    IMAGES_DEAD = [
        './assets/img/2_character_pepe/5_dead/D-51.png',
        './assets/img/2_character_pepe/5_dead/D-52.png',
        './assets/img/2_character_pepe/5_dead/D-53.png',
        './assets/img/2_character_pepe/5_dead/D-54.png',
        './assets/img/2_character_pepe/5_dead/D-55.png',
        './assets/img/2_character_pepe/5_dead/D-56.png',
        './assets/img/2_character_pepe/5_dead/D-57.png'
    ];
    world;
    characterSpeed = 10;
    offset = {
        top: 120,
        bottom: 30,
        left: 50, 
        right: 100
    }
    jumpSound = sounds.jumpSound;
    hurtSound = sounds.hurtSound;
    collectSound = sounds.collectSound;
    jumpAttackSound = sounds.jumpAttackSound;

    /**
     * Creates an instance of the Character.
     * @param {Object} world - The game world that the character belongs to.
     */
    constructor(world) {
        super().loadImage('./assets/img/2_character_pepe/1_idle/idle/I-1.png');
        this.loadImages(this.IMAGES_IDLE);
        this.loadImages(this.IMAGES_LONG_IDLE);
        this.loadImages(this.IMAGES_WALKING);
        this.loadImages(this.IMAGES_JUMPING);
        this.loadImages(this.IMAGES_HURT);
        this.loadImages(this.IMAGES_DEAD);
        this.world = world;
        this.animate();
        this.applyGravity(this.groundLevel);
    }

    /**
     * Starts the animation and movement of the character.
     */
    animate() {
        this.startMoving();
        this.startAnimation();
    }

    /**
     * Controls the movement of the character based on keyboard input.
     * The character can move left or right and jump.
     * The camera follows the character's movement.
     */
    startMoving() {
        setStoppableInterval(() => {
            if (this.isDead()) return;
            if (this.world.keyboard.RIGHT && this.x < this.world.level.level_end_x) {
                this.movingRight();
            }
            if (this.world.keyboard.LEFT && this.x > 125) {
                this.movingLeft();
            }
            if ((this.world.keyboard.UP || this.world.keyboard.SPACE) && !this.isAboveGroundLevel()) {
                this.jump();
            }
            this.world.camera_x = -this.x + 100;
        }, 1000 / currentHz);
    }

    /**
     * Starts the animation based on the character's current state (walking, idle, jumping, hurt, dead).
     * The animation speed is adjusted based on the state.
     */
    startAnimation() {
        let lastAnimation = null;
        let idleTimer = null;
        setStoppableInterval(() => {
            let { newAnimation, speed } = this.getCurrentAnimation();
            idleTimer = this.handleIdleTimer(newAnimation, idleTimer);
            if (newAnimation !== lastAnimation) {
                lastAnimation = newAnimation;
                this.playAnimationWithSpeed(newAnimation, speed);
            }
        }, 25);
    }

    /**
     * Determines the current animation based on the character's state.
     * @returns {Object} An object containing the current animation and the animation speed.
     */
    getCurrentAnimation() {
        if (this.isDead()) return { newAnimation: this.IMAGES_DEAD, speed: 200 };
        if (this.isHurt()) return { newAnimation: this.IMAGES_HURT, speed: 200 };
        if (this.isAboveGroundLevel()) return { newAnimation: this.IMAGES_JUMPING, speed: 60 };
        if (this.world.keyboard.RIGHT || this.world.keyboard.LEFT) return { newAnimation: this.IMAGES_WALKING, speed: 50 };
        return { newAnimation: this.IMAGES_IDLE, speed: 2000 };
    }

    /**
     * Handles the idle timer for the character. If the character is idle for a certain period, it switches to a long idle animation.
     * @param {Array} newAnimation - The current animation to check.
     * @param {number|null} idleTimer - The current idle timer.
     * @returns {number|null} The updated idle timer.
     */
    handleIdleTimer(newAnimation, idleTimer) {
        if (newAnimation !== this.IMAGES_IDLE) {
            clearTimeout(idleTimer);
            return null;
        }
        if (!idleTimer) {
            idleTimer = setTimeout(() => this.playAnimationWithSpeed(this.IMAGES_LONG_IDLE, 300), 12500);
        }
        return idleTimer;
    }
}
