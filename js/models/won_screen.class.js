class WonScreen extends DrawableObject {
    height = 480;
    width = 854;
    y = 0;
    x = 0;
    IMAGES_LOSTSCREEN = [
        './assets/img/You won, you lost/You Win A.png',
        './assets/img/You won, you lost/You win B.png',
        './assets/img/You won, you lost/You won A.png',
        './assets/img/You won, you lost/You Won B.png'
    ];

    constructor() {
        super().loadImage(this.getRandomImage(this.IMAGES_LOSTSCREEN));
    }

}