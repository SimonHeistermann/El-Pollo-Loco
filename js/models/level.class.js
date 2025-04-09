/**
 * Represents a level in the game, containing background segments, clouds, collectables, and enemies.
 * Handles the creation and management of these elements, including their position and generation logic.
 */
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

    /**
     * Constructor for the Level class.
     * Initializes the level with enemies and the end position, and generates the background and clouds.
     * 
     * @param {Array} enemies - The list of enemies in the level.
     * @param {number} level_end_x - The x-coordinate where the level ends.
     */
    constructor(enemies, level_end_x) {
        this.enemies = enemies;
        this.level_end_x = level_end_x;
        this.generateBackground(0, 2);
        this.generateClouds(0, 2);
        this.lastSegmentX = this.segmentWidth * 2;
    }

    /**
     * Generates the background for the level.
     * 
     * @param {number} startIndex - The starting index for the background layers.
     * @param {number} repeatCount - The number of times to repeat the background layers.
     */
    generateBackground(startIndex, repeatCount) {
        if (this.shouldStopGenerating()) return;
        let edgeX = this.calculateEdgeX(startIndex);
        let newSegments = this.createBackgroundSegments(startIndex, repeatCount, edgeX);
        if (newSegments) {
            this.addCollectables(edgeX);
        }
    }

    /**
     * Checks if background generation should stop based on the position of existing objects.
     * 
     * @returns {boolean} - True if background generation should stop, otherwise false.
     */
    shouldStopGenerating() {
        return this.backgroundObjects.some(obj => obj.x < 0);
    }

    /**
     * Calculates the x-coordinate where the next background segment should start.
     * 
     * @param {number} startIndex - The starting index for the background layer.
     * @returns {number} - The calculated x-coordinate.
     */
    calculateEdgeX(startIndex) {
        if (this.backgroundObjects.length === 0) return startIndex * this.segmentWidth;
        return Math.max(...this.backgroundObjects.map(obj => obj.x)) + this.segmentWidth;
    }

    /**
     * Creates and adds background segments to the level.
     * 
     * @param {number} startIndex - The starting index for the background layer.
     * @param {number} repeatCount - The number of times to repeat the background layer.
     * @param {number} edgeX - The x-coordinate where the next segment will start.
     * @returns {boolean} - True if new segments were added, otherwise false.
     */
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

    /**
     * Returns the index of the image to use from the given layer.
     * 
     * @param {Array} layer - The layer containing image paths.
     * @param {number} startIndex - The starting index for the image.
     * @param {number} i - The current iteration index for repeating layers.
     * @returns {number} - The adjusted index for the image.
     */
    getLayerImageIndex(layer, startIndex, i) {
        return layer.length > 1 ? (Math.abs(startIndex + i) % layer.length) : 0;
    }

    /**
     * Calculates the x-coordinate for the background segment.
     * 
     * @param {number} edgeX - The starting edge position.
     * @param {number} i - The current iteration index.
     * @returns {number} - The calculated x-coordinate for the segment.
     */
    calculateSegmentX(edgeX, i) {
        return edgeX + i * this.segmentWidth;
    }

    /**
     * Updates the position of the last background segment.
     */
    updateLastSegmentX() {
        this.lastSegmentX = Math.max(...this.backgroundObjects.map(obj => obj.x));
    }

    /**
     * Adds collectables (bottles and coins) to the level at the specified edgeX position.
     * 
     * @param {number} edgeX - The x-coordinate where collectables will be added.
     */
    addCollectables(edgeX) {
        this.addCollectableBottleToSegment(edgeX);
        this.addCollectableCoinsToSegment(edgeX);
    }

    /**
     * Adds collectable bottles to the current background segment.
     * 
     * @param {number} edgeX - The x-coordinate where bottles will be placed.
     */
    addCollectableBottleToSegment(edgeX) {
        let bottleCount = edgeX == 0 ? 1 : Math.floor(Math.random() * 5) + 2;
        for (let i = 0; i < bottleCount; i++) {
            if (edgeX < 400) return;
            this.collectables.push(new CollectableBottle(edgeX, this.segmentWidth));
        }
    }

    /**
     * Adds collectable coins to the current background segment.
     * 
     * @param {number} edgeX - The x-coordinate where coins will be placed.
     */
    addCollectableCoinsToSegment(edgeX) {
        if (edgeX < 400) return;
        let spawnThree = Math.random() < 0.6;
        let spawnTwo = Math.random() < 0.85;
        let usedPatterns = new Set();
        let patternsToGenerate = spawnThree ? 3 : (spawnTwo ? 2 : 1);
        for (let i = 0; i < patternsToGenerate; i++) {
            let pattern = this.getRandomPattern(usedPatterns);
            let startX = this.getStartX(edgeX, i);
            this.generateCoins(pattern, startX);
        }
    }

    /**
     * Returns a random pattern for placing coins, ensuring no repeated patterns.
     * 
     * @param {Set} usedPatterns - A set of already used patterns.
     * @returns {number} - A random pattern index.
     */
    getRandomPattern(usedPatterns) {
        let pattern;
        do {
            pattern = Math.floor(Math.random() * 4);
        } while (usedPatterns.has(pattern));
        usedPatterns.add(pattern);
        return pattern;
    }

    /**
     * Calculates the starting x-coordinate for coin patterns.
     * 
     * @param {number} edgeX - The x-coordinate where the segment starts.
     * @param {number} index - The current index in the pattern generation.
     * @returns {number} - The calculated starting x-coordinate.
     */
    getStartX(edgeX, index) {
        const baseDistance = 400;
        const increasedDistance = 700;
        return edgeX + Math.random() * baseDistance + (index * increasedDistance);
    }

    /**
     * Generates coins for a specific pattern.
     * 
     * @param {number} pattern - The pattern type for coin placement.
     * @param {number} startX - The starting x-coordinate for coin generation.
     */
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

    /**
     * Creates a row of coins at the specified start position.
     * 
     * @param {number} startX - The starting x-coordinate for the row of coins.
     */
    createRowOfCoins(startX) {
        for (let j = 0; j < 4; j++) {
            this.collectables.push(new CollectableCoin(startX + j * 80, 280));
        }
    }

    /**
     * Creates a coin arc pattern at the specified start position.
     * 
     * @param {number} startX - The starting x-coordinate for the coin arc.
     */
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

    /**
     * Creates a group of coins at the specified start position.
     * 
     * @param {number} startX - The starting x-coordinate for the coin group.
     */
    createCoinGroup(startX) {
        let baseY = 290;
        let positions = [
            { x: startX, y: baseY }, 
            { x: startX + 60, y: baseY - 40 }, 
            { x: startX + 120, y: baseY }
        ];
        positions.forEach(pos => this.collectables.push(new CollectableCoin(pos.x, pos.y)));
    }

    /**
     * Creates a pair of single coins at random positions near the specified start position.
     * 
     * @param {number} startX - The starting x-coordinate for the single coins.
     */
    createSingleCoins(startX) {
        let singleX1 = startX;
        let singleX2 = singleX1 + Math.random() * 150 + 80;
        let singleY1 = 200 + Math.random() * 100;
        let singleY2 = 200 + Math.random() * 100;
        this.collectables.push(new CollectableCoin(singleX1, singleY1));
        this.collectables.push(new CollectableCoin(singleX2, singleY2));
    }

    /**
     * Generates clouds for the level.
     * 
     * @param {number} startIndex - The starting index for the cloud layers.
     * @param {number} repeatCount - The number of cloud layers to generate.
     */
    generateClouds(startIndex, repeatCount) {
        let edgeX = this.calculateCloudEdgeX(startIndex);
        this.createCloudSegments(startIndex, repeatCount, edgeX);
    }

    /**
     * Calculates the starting x-coordinate for the cloud generation.
     * 
     * @param {number} startIndex - The starting index for cloud layers.
     * @returns {number} - The calculated x-coordinate for the cloud generation.
     */
    calculateCloudEdgeX(startIndex) {
        return this.clouds.length 
            ? Math.max(...this.clouds.map(c => c.x)) + 853
            : startIndex * 853;
   
    }
    
    /**
    * Creates cloud segments for the level.
    * This method generates clouds at specific intervals and adds them to the `clouds` array.
    * 
    * @param {number} startIndex - The starting index for determining cloud types.
    * @param {number} repeatCount - The number of cloud segments to generate.
    * @param {number} edgeX - The x-coordinate where the cloud segments will begin.
    */
    createCloudSegments(startIndex, repeatCount, edgeX) {
        for (let i = 0; i < repeatCount; i++) {
            let cloudType = (startIndex + i) % 2 + 1;
            let xPosition = edgeX + i * 853; // Calculate the x-coordinate for each cloud segment.
            this.clouds.push(new Cloud(cloudType, xPosition)); // Add the cloud to the clouds array.
        }
        this.updateLastCloudX(); // Update the position of the last cloud after adding new segments.
    }

    /**
    * Updates the `lastCloudX` value to reflect the x-coordinate of the rightmost cloud.
    * This method helps in determining when to add more clouds or background elements.
    */
    updateLastCloudX() {
        this.lastCloudX = Math.max(...this.clouds.map(c => c.x));
    }
}