class Endboss extends MovableObject {
    height = 472;
    width = 488;
    y = 480 - this.height - 40;
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
    offset = {
        top: 100,
        left: 60,
        right: 5,
        bottom: 10
    }

    constructor(level_end_x) {
        super().loadImage(this.IMAGES_ALERT[0]);
        this.x = level_end_x - this.width - 150;
        this.loadImages(this.IMAGES_ALERT);
        this.animate();
    }

    animate() {
        setInterval( () => {
            this.playAnimation(this.IMAGES_ALERT);
        }, 500);
    }
}