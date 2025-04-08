class Endboss extends MovableObject {
    height = 472;
    width = 488;
    y = 480 - this.height - 40;
    IMAGES_WALK = [
        './assets/img/4_enemie_boss_chicken/1_walk/G1.png',
        './assets/img/4_enemie_boss_chicken/1_walk/G2.png',
        './assets/img/4_enemie_boss_chicken/1_walk/G3.png',
        './assets/img/4_enemie_boss_chicken/1_walk/G4.png'
    ];
    IMAGES_ALERT = [
        './assets/img/4_enemie_boss_chicken/2_alert/G5.png',
        './assets/img/4_enemie_boss_chicken/2_alert/G6.png',
        './assets/img/4_enemie_boss_chicken/2_alert/G7.png',
        './assets/img/4_enemie_boss_chicken/2_alert/G8.png',
        './assets/img/4_enemie_boss_chicken/2_alert/G9.png',
        './assets/img/4_enemie_boss_chicken/2_alert/G10.png',
        './assets/img/4_enemie_boss_chicken/2_alert/G11.png',
        './assets/img/4_enemie_boss_chicken/2_alert/G12.png'
    ];
    IMAGES_ATTACK = [
        './assets/img/4_enemie_boss_chicken/3_attack/G13.png',
        './assets/img/4_enemie_boss_chicken/3_attack/G14.png',
        './assets/img/4_enemie_boss_chicken/3_attack/G15.png',
        './assets/img/4_enemie_boss_chicken/3_attack/G16.png',
        './assets/img/4_enemie_boss_chicken/3_attack/G17.png',
        './assets/img/4_enemie_boss_chicken/3_attack/G18.png',
        './assets/img/4_enemie_boss_chicken/3_attack/G19.png',
        './assets/img/4_enemie_boss_chicken/3_attack/G20.png'
    ];
    IMAGES_HURT = [
        './assets/img/4_enemie_boss_chicken/4_hurt/G21.png',
        './assets/img/4_enemie_boss_chicken/4_hurt/G22.png',
        './assets/img/4_enemie_boss_chicken/4_hurt/G23.png'
    ];
    IMAGES_DEAD = [
        './assets/img/4_enemie_boss_chicken/5_dead/G24.png',
        './assets/img/4_enemie_boss_chicken/5_dead/G25.png',
        './assets/img/4_enemie_boss_chicken/5_dead/G26.png'
    ];
    offset = {
        top: 100,
        left: 60,
        right: 5,
        bottom: 10
    }
    endBossSpeed = 1.5 + Math.random() * 0.25;
    energy = 100;
    hurtSound = sounds.endbossHurtSound;

    constructor(level_end_x) {
        super().loadImage(this.IMAGES_WALK[0]);
        this.x = level_end_x - this.width - 150;
        this.loadImages(this.IMAGES_WALK);
        this.loadImages(this.IMAGES_ALERT);
        this.loadImages(this.IMAGES_ATTACK);
        this.loadImages(this.IMAGES_HURT);
        this.loadImages(this.IMAGES_DEAD);
        this.hurtSound.volume = 0.5;
        this.animate();
        this.energy = 100;
    }

    animate() {
        let i = 0;
        let lastAnimation = null;
        setStoppableInterval(() => {
            if (!endBossReady) return;
            let newAnimation = this.getAnimation(i);
            let speed = 200;
            this.checkMoveLeft(newAnimation);
            this.checkForAttack(newAnimation);
            if (newAnimation !== lastAnimation) {
                lastAnimation = newAnimation;
                this.playAnimationWithSpeed(newAnimation, speed);
            }
            i++;
        }, 50);
    }
    
    getAnimation(i) {
        if (this.isDead()) return this.IMAGES_DEAD;
        if (this.isHurt()) return this.IMAGES_HURT;
        if (i <= 32) return this.IMAGES_WALK;
        if (i > 64 && i <= 192) return this.IMAGES_ATTACK;
        if (i > 206 && i <= 222) return this.IMAGES_WALK;
        if (i > 222) return this.IMAGES_ATTACK;
        return this.IMAGES_ALERT;
    }
    
    checkMoveLeft(newAnimation) {
        if(newAnimation == this.IMAGES_WALK) this.moveLeft(this.endBossSpeed);
        else clearInterval(this.moveLeftInterval);
    }

    checkForAttack(newAnimation) {
        if (newAnimation !== this.IMAGES_ATTACK) return;
        const distance = Math.abs(world.character.x - this.x);
        const attackRange = 700; 
        if (distance <= attackRange) {
            world.character.hit();
            world.healthBar.setPercentage(world.character.energy);
        }
    }
    
    
}