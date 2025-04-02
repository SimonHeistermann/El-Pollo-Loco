class HealthBar extends StatusBars {
    IMAGES_BLUE = [
        '../assets/img/7_statusbars/1_statusbar/2_statusbar_health/blue/0.png',
        '../assets/img/7_statusbars/1_statusbar/2_statusbar_health/blue/20.png',
        '../assets/img/7_statusbars/1_statusbar/2_statusbar_health/blue/40.png',
        '../assets/img/7_statusbars/1_statusbar/2_statusbar_health/blue/60.png',
        '../assets/img/7_statusbars/1_statusbar/2_statusbar_health/blue/80.png',
        '../assets/img/7_statusbars/1_statusbar/2_statusbar_health/blue/100.png'
    ];
    IMAGES_GREEN = [
        '../assets/img/7_statusbars/1_statusbar/2_statusbar_health/green/0.png',
        '../assets/img/7_statusbars/1_statusbar/2_statusbar_health/green/20.png',
        '../assets/img/7_statusbars/1_statusbar/2_statusbar_health/green/40.png',
        '../assets/img/7_statusbars/1_statusbar/2_statusbar_health/green/60.png',
        '../assets/img/7_statusbars/1_statusbar/2_statusbar_health/green/80.png',
        '../assets/img/7_statusbars/1_statusbar/2_statusbar_health/green/100.png'
    ];
    IMAGES_ORANGE = [
        '../assets/img/7_statusbars/1_statusbar/2_statusbar_health/orange/0.png',
        '../assets/img/7_statusbars/1_statusbar/2_statusbar_health/orange/20.png',
        '../assets/img/7_statusbars/1_statusbar/2_statusbar_health/orange/40.png',
        '../assets/img/7_statusbars/1_statusbar/2_statusbar_health/orange/60.png',
        '../assets/img/7_statusbars/1_statusbar/2_statusbar_health/orange/80.png',
        '../assets/img/7_statusbars/1_statusbar/2_statusbar_health/orange/100.png'
    ];

    constructor() {
        super().loadImages(this.IMAGES_BLUE);
        this.loadImages(this.IMAGES_GREEN);
        this.loadImages(this.IMAGES_ORANGE);
        this.y = this.height - 15;
        this.percentage = returnHealthPercentage();
        this.setPercentage(1000);
    }

    setPercentage(percentage) {
        if(percentage >= 0 && percentage <= 1000) {
            this.percentage = percentage;
            let images = this["IMAGES_" + colorSetting];
            let index = this.resolveImageIndex();
            if (images) {
                this.img = this.imageCache[images[index]];
            }
        }
    }

    resolveImageIndex() {
        return Math.floor(this.percentage / 200);
    }


}