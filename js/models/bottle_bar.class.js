class BottleBar extends StatusBars {
    IMAGES_BLUE = [
        '../assets/img/7_statusbars/1_statusbar/3_statusbar_bottle/blue/0.png',
        '../assets/img/7_statusbars/1_statusbar/3_statusbar_bottle/blue/20.png',
        '../assets/img/7_statusbars/1_statusbar/3_statusbar_bottle/blue/40.png',
        '../assets/img/7_statusbars/1_statusbar/3_statusbar_bottle/blue/60.png',
        '../assets/img/7_statusbars/1_statusbar/3_statusbar_bottle/blue/80.png',
        '../assets/img/7_statusbars/1_statusbar/3_statusbar_bottle/blue/100.png'
    ];
    IMAGES_GREEN = [
        '../assets/img/7_statusbars/1_statusbar/3_statusbar_bottle/green/0.png',
        '../assets/img/7_statusbars/1_statusbar/3_statusbar_bottle/green/20.png',
        '../assets/img/7_statusbars/1_statusbar/3_statusbar_bottle/green/40.png',
        '../assets/img/7_statusbars/1_statusbar/3_statusbar_bottle/green/60.png',
        '../assets/img/7_statusbars/1_statusbar/3_statusbar_bottle/green/80.png',
        '../assets/img/7_statusbars/1_statusbar/3_statusbar_bottle/green/100.png'
    ];
    IMAGES_ORANGE = [
        '../assets/img/7_statusbars/1_statusbar/3_statusbar_bottle/orange/0.png',
        '../assets/img/7_statusbars/1_statusbar/3_statusbar_bottle/orange/20.png',
        '../assets/img/7_statusbars/1_statusbar/3_statusbar_bottle/orange/40.png',
        '../assets/img/7_statusbars/1_statusbar/3_statusbar_bottle/orange/60.png',
        '../assets/img/7_statusbars/1_statusbar/3_statusbar_bottle/orange/80.png',
        '../assets/img/7_statusbars/1_statusbar/3_statusbar_bottle/orange/100.png'
    ];

    constructor() {
        super().loadImages(this.IMAGES_BLUE);
        this.loadImages(this.IMAGES_GREEN);
        this.loadImages(this.IMAGES_ORANGE);
        this.y = 10;
        this.percentage = returnBottleAndCoinPercentage();
        this.setPercentage(this.percentage);
    }

    setPercentage(percentage) {
        if(percentage >= 0 && percentage <= 100) {
            this.percentage = percentage;
            let images = this["IMAGES_" + colorSetting];
            let index = this.resolveImageIndex();
            if (images) {
                this.img = this.imageCache[images[index]];
            }
        }
    }

    resolveImageIndex() {
        return Math.floor(this.percentage / 20);
    }


}