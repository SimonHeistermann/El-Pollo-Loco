class Level {
    enemies;
    clouds = [];
    backgroundObjects = [];
    layers = [
        ['./assets/img/5_background/layers/air.png'],
        ['./assets/img/5_background/layers/3_third_layer/1.png', './assets/img/5_background/layers/3_third_layer/2.png'],
        ['./assets/img/5_background/layers/2_second_layer/1.png', './assets/img/5_background/layers/2_second_layer/2.png'],
        ['./assets/img/5_background/layers/1_first_layer/1.png', './assets/img/5_background/layers/1_first_layer/2.png']
    ];
    segmentWidth = 853;
    lastSegmentX;
    lastCloudX;
    level_end_x;
    collectables = [];

    constructor(enemies, level_end_x) {
        this.enemies = enemies;
        this.level_end_x = level_end_x;
        this.generateBackground(0, 2);
        this.generateClouds(0, 2);
        this.lastSegmentX = this.segmentWidth * 2;
    }

    generateBackground(startIndex, repeatCount) {
        if (this.shouldStopGenerating()) return;
        let edgeX = this.calculateEdgeX(startIndex);
        let newSegments = this.createBackgroundSegments(startIndex, repeatCount, edgeX);
        if (newSegments) {
            this.addCollectables(edgeX);
        }
    }
    
    shouldStopGenerating() {
        return this.backgroundObjects.some(obj => obj.x < 0);
    }
    
    calculateEdgeX(startIndex) {
        if (this.backgroundObjects.length === 0) return startIndex * this.segmentWidth;
        return Math.max(...this.backgroundObjects.map(obj => obj.x)) + this.segmentWidth;
    }
    
    createBackgroundSegments(startIndex, repeatCount, edgeX) {
        let newSegments = false;
        for (let i = 0; i < repeatCount; i++) {
            this.layers.forEach(layer => {
                let adjustedIndex = this.getLayerImageIndex(layer, startIndex, i);
                let xPosition = this.calculateSegmentX(edgeX, i);
                this.backgroundObjects.push(new BackgroundObject(layer[adjustedIndex], xPosition));
            });
            newSegments = true;
        }
        this.updateLastSegmentX();
        return newSegments;
    }
    
    getLayerImageIndex(layer, startIndex, i) {
        return layer.length > 1 ? (Math.abs(startIndex + i) % layer.length) : 0;
    }
    
    calculateSegmentX(edgeX, i) {
        return edgeX + i * this.segmentWidth;
    }
    
    updateLastSegmentX() {
        this.lastSegmentX = Math.max(...this.backgroundObjects.map(obj => obj.x));
    }
    
    addCollectables(edgeX) {
        this.addCollectableBottleToSegment(edgeX);
        this.addCollectableCoinsToSegment(edgeX);
    }
    

    addCollectableBottleToSegment(edgeX) {
        let bottleCount; 
        if(edgeX == 0) bottleCount = 1;
        else bottleCount = Math.floor(Math.random() * 3) + 2;
        for (let i = 0; i < bottleCount; i++) {
            if (edgeX < 400) return;
            this.collectables.push(new CollectableBottle(edgeX, this.segmentWidth));
        }
    }

    addCollectableCoinsToSegment(edgeX) {
        if (edgeX < 400) return;
        let spawnThree = Math.random() < 0.5;
        let spawnTwo = Math.random() < 0.75;
        let usedPatterns = new Set();
        let patternsToGenerate = spawnThree ? 3 : (spawnTwo ? 2 : 1);
        for (let i = 0; i < patternsToGenerate; i++) {
            let pattern = this.getRandomPattern(usedPatterns);
            let startX = this.getStartX(edgeX, i);
            this.generateCoins(pattern, startX);
        }
    }
    
    getRandomPattern(usedPatterns) {
        let pattern;
        do {
            pattern = Math.floor(Math.random() * 4);
        } while (usedPatterns.has(pattern));
        usedPatterns.add(pattern);
        return pattern;
    }
    
    getStartX(edgeX, index) {
        const baseDistance = 400; 
        const increasedDistance = 700;
        return edgeX + Math.random() * baseDistance + (index * increasedDistance);
    }
    
    generateCoins(pattern, startX) {
        if (pattern === 0) {
            this.createRowOfCoins(startX);
        } else if (pattern === 1) {
            this.createCoinArc(startX);
        } else if (pattern === 2) {
            this.createCoinGroup(startX);
        } else {
            this.createSingleCoins(startX);
        }
    }
    
    createRowOfCoins(startX) {
        for (let j = 0; j < 4; j++) {
            this.collectables.push(new CollectableCoin(startX + j * 80, 280)); 
        }
    }
    
    createCoinArc(startX) {
        let spacing = 80;
        let positions = [
            { x: startX, y: 300 },
            { x: startX + spacing, y: 260 },
            { x: startX + 2 * spacing, y: 200 },
            { x: startX + 3 * spacing, y: 260 },
            { x: startX + 4 * spacing, y: 300 }
        ];
        positions.forEach(pos => this.collectables.push(new CollectableCoin(pos.x, pos.y)));
    }
    
    createCoinGroup(startX) {
        let baseY = 290;
        let positions = [
            { x: startX, y: baseY }, 
            { x: startX + 60, y: baseY - 40 }, 
            { x: startX + 120, y: baseY } 
        ];
        positions.forEach(pos => this.collectables.push(new CollectableCoin(pos.x, pos.y)));
    }
    
    createSingleCoins(startX) {
        let singleX1 = startX;
        let singleX2 = singleX1 + Math.random() * 150 + 80; 
        let singleY1 = 200 + Math.random() * 100; 
        let singleY2 = 200 + Math.random() * 100; 
        this.collectables.push(new CollectableCoin(singleX1, singleY1));
        this.collectables.push(new CollectableCoin(singleX2, singleY2));
    }

    generateClouds(startIndex, repeatCount) {
        let edgeX = this.calculateCloudEdgeX(startIndex);
        this.createCloudSegments(startIndex, repeatCount, edgeX);
    }
    
    calculateCloudEdgeX(startIndex) {
        return this.clouds.length 
            ? Math.max(...this.clouds.map(c => c.x)) + 853
            : startIndex * 853;
    }
    
    createCloudSegments(startIndex, repeatCount, edgeX) {
        for (let i = 0; i < repeatCount; i++) {
            let cloudType = (startIndex + i) % 2 + 1;
            let xPosition = edgeX + i * 853;
            this.clouds.push(new Cloud(cloudType, xPosition));
        }
        this.updateLastCloudX();
    }
    
    updateLastCloudX() {
        this.lastCloudX = Math.max(...this.clouds.map(c => c.x));
    }
    
    

}