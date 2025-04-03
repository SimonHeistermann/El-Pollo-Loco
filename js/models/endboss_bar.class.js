class EndbossBar extends StatusBars {
    IMAGE_BLUE = [
        './assets/img/7_statusbars/2_statusbar_endboss/blue.png'
    ];
    IMAGE_GREEN = [
        './assets/img/7_statusbars/2_statusbar_endboss/green.png'
    ];
    IMAGE_ORANGE = [
        './assets/img/7_statusbars/2_statusbar_endboss/orange.png'
    ];

    constructor() {
        super().loadImages(this.IMAGE_BLUE);
        this.loadImages(this.IMAGE_GREEN);
        this.loadImages(this.IMAGE_ORANGE);
        this.y = 10;
        this.x = 844 - this.width;
        this.setImage();
    }

    setImage() {
        let image = this["IMAGE_" + colorSetting];
        if (image) {
            this.img = this.imageCache[image];
        }
    }
}