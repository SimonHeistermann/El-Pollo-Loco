class CollectableBottle extends CollectableObject {
    IMAGES_BOTTLE_ON_GROUND = [
        '../assets/img/6_salsa_bottle/1_salsa_bottle_on_ground.png',
        '../assets/img/6_salsa_bottle/2_salsa_bottle_on_ground.png'
    ];
    static spawnedPositions = [];
    offset = {
        top: 20,
        left: 30,
        right: 30,
        bottom: 10
    }

    constructor(edgeX, segmentWidth) {
        super().loadImage(this.getRandomImage(this.IMAGES_BOTTLE_ON_GROUND));
        this.x = this.getRandomX(edgeX, segmentWidth);
        this.y = 340;
        this.height = 120;
        this.width = 120;
    }

    getRandomX(edgeX, segmentWidth) {
        let minX = Math.max(400, edgeX); 
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
            CollectableBottle.spawnedPositions.some(pos => Math.abs(pos - newX) < distance)
        );
        CollectableBottle.spawnedPositions.push(newX);
        return newX;
    }
}