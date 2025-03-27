class Level {
    enemies;
    clouds = [];
    backgroundObjects = [];
    layers = [
        ['../assets/img/5_background/layers/air.png', '../assets/img/5_background/layers/air.png'],
        ['../assets/img/5_background/layers/3_third_layer/1.png', '../assets/img/5_background/layers/3_third_layer/2.png'],
        ['../assets/img/5_background/layers/2_second_layer/1.png', '../assets/img/5_background/layers/2_second_layer/2.png'],
        ['../assets/img/5_background/layers/1_first_layer/1.png', '../assets/img/5_background/layers/1_first_layer/2.png']
    ];
    segmentWidth = 853;
    lastSegmentX;
    lastCloudX;
    level_end_x;
    collectableBottles = [];

    constructor(enemies, level_end_x) {
        this.enemies = enemies;
        this.level_end_x = level_end_x;
        this.generateBackground(0, 2, 1);
        this.generateBackground(-2, 2, -1);
        this.generateClouds(0, 2, 1);
        this.generateClouds(-2, 2, -1);
        this.lastSegmentX = this.segmentWidth * 2;
    }

    generateBackground(startIndex, repeatCount, direction) {
        if (direction === -1 && this.backgroundObjects.some(obj => obj.x < 0)) return;
        let edgeX = this.backgroundObjects.length 
            ? Math[direction === 1 ? 'max' : 'min'](...this.backgroundObjects.map(obj => obj.x)) + direction * this.segmentWidth 
            : startIndex * this.segmentWidth;
        let newSegments = false;
        for (let i = 0; i < repeatCount; i++) {
            this.layers.forEach(layer => 
                this.backgroundObjects.push(new BackgroundObject(layer[(Math.abs(startIndex + i) + (direction === -1 ? 1 : 0)) % 2], edgeX + i * direction * this.segmentWidth - (direction === -1 ? 1 : 0)))
            );
            newSegments = true;
        }
        this.lastSegmentX = Math.max(...this.backgroundObjects.map(obj => obj.x));
        if(newSegments && direction === 1) {
            this.addCollectableBottleToSegment(edgeX);
            
        } 
    }

    addCollectableBottleToSegment(edgeX) {
        let bottleCount; 
        if(edgeX == 0) bottleCount = 1;
        else bottleCount = Math.floor(Math.random() * 3) + 2;
        for (let i = 0; i < bottleCount; i++) {
            this.collectableBottles.push(new CollectableBottle(edgeX, this.segmentWidth));
        }
    }

    generateClouds(startIndex, repeatCount, direction = 1) {
        if (direction === -1 && this.clouds.some(c => c.x < 0)) return;
        let edgeX = this.clouds.length 
            ? Math[direction === 1 ? 'max' : 'min'](...this.clouds.map(c => c.x)) + direction * 853 
            : startIndex * 853;
        for (let i = 0; i < repeatCount; i++) 
            this.clouds.push(new Cloud((Math.abs(startIndex + i) % 2) + 1, edgeX + i * direction * 853));
        this.lastCloudX = Math.max(...this.clouds.map(c => c.x));
    }

}