class CollectableCoin extends CollectableObject {
    IMAGES_COINS = [
        './assets/img/8_coin/coin_1.png',
        './assets/img/8_coin/coin_2.png'
    ];
    offset = {
        top: 80,
        left: 80,
        right: 80,
        bottom: 80
    }

    constructor(x, y) {
        super().loadImage(this.getRandomImage(this.IMAGES_COINS));
        this.x = x;
        this.y = y;
        this.height = 200;
        this.width = 200;
    }
}
