class CoinBar extends StatusBars {
    IMAGES_BLUE = [
        './assets/img/7_statusbars/1_statusbar/1_statusbar_coin/blue/0.png',
        './assets/img/7_statusbars/1_statusbar/1_statusbar_coin/blue/20.png',
        './assets/img/7_statusbars/1_statusbar/1_statusbar_coin/blue/40.png',
        './assets/img/7_statusbars/1_statusbar/1_statusbar_coin/blue/60.png',
        './assets/img/7_statusbars/1_statusbar/1_statusbar_coin/blue/80.png',
        './assets/img/7_statusbars/1_statusbar/1_statusbar_coin/blue/100.png'
    ];
    IMAGES_GREEN = [
        './assets/img/7_statusbars/1_statusbar/1_statusbar_coin/green/0.png',
        './assets/img/7_statusbars/1_statusbar/1_statusbar_coin/green/20.png',
        './assets/img/7_statusbars/1_statusbar/1_statusbar_coin/green/40.png',
        './assets/img/7_statusbars/1_statusbar/1_statusbar_coin/green/60.png',
        './assets/img/7_statusbars/1_statusbar/1_statusbar_coin/green/80.png',
        './assets/img/7_statusbars/1_statusbar/1_statusbar_coin/green/100.png'
    ];
    IMAGES_ORANGE = [
        './assets/img/7_statusbars/1_statusbar/1_statusbar_coin/orange/0.png',
        './assets/img/7_statusbars/1_statusbar/1_statusbar_coin/orange/20.png',
        './assets/img/7_statusbars/1_statusbar/1_statusbar_coin/orange/40.png',
        './assets/img/7_statusbars/1_statusbar/1_statusbar_coin/orange/60.png',
        './assets/img/7_statusbars/1_statusbar/1_statusbar_coin/orange/80.png',
        './assets/img/7_statusbars/1_statusbar/1_statusbar_coin/orange/100.png'
    ];

    constructor() {
        super().loadImages(this.IMAGES_BLUE);
        this.loadImages(this.IMAGES_GREEN);
        this.loadImages(this.IMAGES_ORANGE);
        this.y = (2 * this.height) - 35;
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