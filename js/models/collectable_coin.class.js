class CollectableCoin extends CollectableObject {
    IMAGES_COINS = [
        '../assets/img/8_coin/coin_1.png',
        '../assets/img/8_coin/coin_2.png'
    ];
    static spawnedPositions = [];

    constructor(edgeX, segmentWidth) {
        super();
        this.x = this.getRandomX(edgeX, segmentWidth);
        this.y = 340;
        this.height = 120;
        this.width = 120;
    }

    getRandomX(edgeX, segmentWidth) {
        let minX = Math.max(800, edgeX); 
        let maxX = edgeX + segmentWidth;
        let distance = Math.floor(Math.random() * 101) + 300;
        let newX;
        let attempts = 0;
        do {
            newX = Math.floor(Math.random() * (maxX - minX) + minX);
            if (newX - minX < distance) {
                newX = minX + distance;
            }
            attempts++;
            if (attempts > 50) return null;
    
        } while (
            CollectableCoin.spawnedPositions.some(pos => Math.abs(pos - newX) < distance)
        );
        CollectableCoin.spawnedPositions.push(newX);
        return newX;
    }
}