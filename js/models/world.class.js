/**
 * Represents the game world including all game elements, such as the canvas, level, and various game objects.
 * Handles the game loop, animations, sound, and interactions between objects.
 */
class World {
    canvas;
    ctx;
    keyboard;
    camera_x = 0;
    level = null;
    bottleBar = new BottleBar();
    healthBar = new HealthBar();
    coinBar = new CoinBar();
    throwableObjects = [];
    endbossBar;
    startScreen = new StartScreen();
    lostScreen = new LostScreen();
    wonScreen = new WonScreen();
    backgroundScreen = new BackgroundScreen();
    animationIdStartScreen = null;
    animationIdLostScreen = null;
    animationIdWonScreen = null;
    drawAnimationID;

    /**
     * Creates a new instance of the World class.
     * @param {HTMLCanvasElement} canvas - The canvas element where the game will be drawn.
     * @param {Keyboard} keyboard - The keyboard object for handling player inputs.
     */
    constructor(canvas, keyboard) {
        this.canvas = canvas;
        this.keyboard = keyboard;
        this.ctx = canvas.getContext('2d');
        this.character = new Character(this);
        this.startAnimationDrawStartScreen();
    }

    /**
     * Starts the animation for drawing the start screen at a defined frame rate.
     */
    startAnimationDrawStartScreen() {
        this.animationIdStartScreen = setInterval(() => this.drawStartScreen(), 1000 / currentHz);
    }

    /**
     * Initializes a new game level, plays background music, and sets up the necessary intervals for the game loop.
     * @param {Object} level - The level to initialize.
     */
    initLevel(level) {
        this.level = level;
        this.playBackroundMusic();
        this.draw();
        this.runFast();
        this.runSlow();
    }

    /**
     * Plays the background music and other sounds for the game.
     */
    playBackroundMusic() {
        sounds.backgroundMusic.volume = 0.1;
        sounds.backgroundMusic.loop = true;
        playSound(sounds.backgroundMusic);
        sounds.chickenAndPoults.volume = 0.2;
        sounds.chickenAndPoults.loop = true;
        playSound(sounds.chickenAndPoults);
        sounds.bottleBreaks.volume = 0.2;
        sounds.bottleBreaks.loop = false;
    }

    /**
     * Runs a fast interval that constantly checks for collisions and game states.
     * This includes checking collisions, collectables, coins, and game win/loss conditions.
     */
    runFast() {
        setStoppableInterval(() => {
            this.checkCollisions();
            this.checkCollisionsForCollectables();
            this.checkCoinBar();
            this.checkCollisionsForThrownBottles();
            this.checkEndBossAnimation();
            this.checkIfGameIsLost();
            this.checkIfGameIsWon();
        }, 50);
    }
    
    /**
     * Runs a slower interval for checking throw objects every 200ms.
     */
    runSlow() {
        setStoppableInterval(() => {
            this.checkThrowObjects();
        }, 200);
    }

    /**
    * Checks for collisions between the character and enemies.
    * If an enemy is jumped on, it handles the enemy defeat.
    */
    checkCollisions() {
        let enemyHit = this.getJumpedOnEnemy();
        this.level.enemies.forEach(enemy => this.handleEnemyCollision(enemy));
        if (enemyHit) this.handleEnemyDefeat(enemyHit);
    }

    /**
     * Finds the first enemy the character is jumping on.
    * @returns {Object|null} The enemy that is being jumped on, or null if none.
    */
    getJumpedOnEnemy() {
        return this.level.enemies.find(enemy => this.character.isColliding(enemy) && this.character.isJumpingOn(enemy)) || null;
    }

    /**
    * Handles the collision between the character and an enemy.
    * If the character is colliding but not jumping on the enemy, it reduces the character's health.
    * If the enemy is an Endboss, the character is knocked back.
    * @param {Object} enemy - The enemy the character is colliding with.
    */
    handleEnemyCollision(enemy) {
        if (!this.character.isColliding(enemy) || this.character.isJumpingOn(enemy)) return;
        this.character.hit();
        this.healthBar.setPercentage(this.character.energy);
        if (enemy instanceof Endboss) this.character.knockbackFromEndboss(20);
    }

    /**
     * Handles the defeat of an enemy when the character is jumping on it.
     * Plays a sound and makes the enemy die.
     * @param {Object} enemy - The enemy that is defeated.
     */
    handleEnemyDefeat(enemy) {
        this.character.jumpAttackSound.play();
        enemy.die();
        this.character.bounce();
    }

    /**
    * Checks if the player is throwing a bottle and if they have enough bottles to throw.
    * If so, it creates a new throwable object and adds it to the list of throwable objects.
    */
    checkThrowObjects() {
        if(this.keyboard.THROW && this.bottleBar.percentage > 0 && !this.character.isDead()) {
            let bottle = new ThrowableObject(this.character.x + 100, this.character.y + 100, this);
            if(bottle) this.throwableObjects.push(bottle);
        }
    }

    /**
     * Checks if any thrown bottles have collided with an enemy or hit the ground.
     * If a collision with an enemy occurs, it handles the enemy being hit.
    * If the bottle hits the ground, it handles the ground hit.
    */
    checkCollisionsForThrownBottles() {
        this.throwableObjects.forEach(bottle => {
            let enemyHit = this.getHitEnemy(bottle);
            if (bottle.bottleHasHitGround()) this.handleGroundHit(bottle);
            if (enemyHit) this.handleEnemyHit(bottle, enemyHit);
        });
    }

    /**
    * Finds the first enemy that a thrown bottle has collided with.
    * @param {Object} bottle - The thrown bottle to check for collisions.
    * @returns {Object|null} The enemy the bottle collided with, or null if none.
    */
    getHitEnemy(bottle) {
        return this.level.enemies.find(enemy => bottle.isColliding(enemy)) || null;
    }

    /**
     * Handles a thrown bottle hitting the ground.
    * Stops the bottle's movement, plays a break sound, and schedules its removal.
    * @param {Object} bottle - The thrown bottle that hit the ground.
    */
    handleGroundHit(bottle) {
        bottle.stopThrowing();
        bottle.bottleHit();
        playSound(sounds.bottleBreaks);
            this.removeBottleAfterDelay(bottle);
}

    /**
     * Handles a thrown bottle hitting an enemy.
    * Stops the bottle's movement, plays a break sound, and makes the enemy take damage or die.
    * If the enemy is an Endboss, it takes damage; otherwise, the enemy dies.
    * @param {Object} bottle - The thrown bottle that hit the enemy.
    * @param {Object} enemy - The enemy that was hit by the bottle.
    */
    handleEnemyHit(bottle, enemy) {
        bottle.stopThrowing();
        bottle.bottleHit();
        playSound(sounds.bottleBreaks);
        if (enemy instanceof Endboss) enemy.hit();
        else enemy.die();
        this.removeBottleAfterDelay(bottle);
    }

    /**
     * Removes a bottle object after a delay to allow for the "hit" effect to play.
    * @param {Object} bottle - The bottle to remove.
    */
    removeBottleAfterDelay(bottle) {
        setTimeout(() => bottle.removeObject(), 500);
    }

     /**
     * Checks for collisions between the character and collectables.
     * When a collision occurs, the character collects the collectable and removes it from the level.
     */
    checkCollisionsForCollectables() {
        for (let i = this.level.collectables.length - 1; i >= 0; i--) {
            let collectable = this.level.collectables[i];
            if (this.character.isColliding(collectable)) {
                this.character.collect(collectable);
                this.level.collectables.splice(i, 1);
            }
        }
    }

    /**
    * Checks if the coin bar is full (100%). If it is, it resets the coin bar to 0
    * and sets the health bar to 100%, as well as the character's energy to 100.
     */
    checkCoinBar() {
        if (this.coinBar.percentage >= 100) {
            this.coinBar.setPercentage(0);
            this.healthBar.setPercentage(100);
            this.character.energy = 100;
        }
    }

    /**
     * Checks if the character is within a buffer zone of the Endboss.
     * If so, prepares the Endboss for the encounter and starts its background music.
     */
    checkEndBossAnimation() {
        const bufferZone = 800;
        const endBoss = this.level.enemies.find(enemy => enemy instanceof Endboss);
        if (endBoss && this.character.x >= endBoss.x - bufferZone) {
            endBossReady = true;
            this.playEndBossBackgroundMusic();
            this.checkForEndBossbar();
        } else {
            endBossReady = false;
        }
    }

    /**
     * Plays the background music for the Endboss encounter.
     */
    playEndBossBackgroundMusic() {
        sounds.backgroundMusic.pause();
        sounds.backgroundMusicEndboss.volume = 0.2;
        sounds.backgroundMusicEndboss.loop = true;
        playSound(sounds.backgroundMusicEndboss);
    }

    /**
     * Initializes the Endboss bar if it doesn't exist.
     */
    checkForEndBossbar() {
        if (!this.endbossBar) {
            this.endbossBar = new EndbossBar();
        }
    }

    /**
     * Checks if the character is dead. If so, ends the game and sets the game state to "lost".
     */
    checkIfGameIsLost() {
        if(this.character.isDead()) {
            setTimeout(() => this.endGame('lost'), 1000);
        }
    }

    /**
     * Checks if the Endboss is dead. If so, ends the game and sets the game state to "won".
     */
    checkIfGameIsWon() {
        const endBoss = this.level.enemies.find(enemy => enemy instanceof Endboss);
        if(endBoss.isDead()) {
            setTimeout(() => this.endGame('won'), 1000);
        }
    }

    /**
     * Draws all the elements of the game on the canvas.
     * Clears the canvas, translates the camera, and draws all game objects.
     */
    draw() {
        this.clearCanvas();
        this.ctx.translate(this.camera_x, 0);
        this.addObjectsToMap(this.level.backgroundObjects);
        this.addObjectsToMap(this.level.clouds);
        if (this.character) this.addToMap(this.character);
        if (this.level.enemies) this.addObjectsToMap(this.level.enemies);
        if (this.level.collectables) this.addObjectsToMap(this.level.collectables);
        if (this.throwableObjects) this.addObjectsToMap(this.throwableObjects);
        this.addFixedObjects();
        this.ctx.translate(-this.camera_x, 0);
        this.checkForNewSegments();
        this.checkForNewClouds();
        this.drawAnimationID = requestAnimationFrame(() => this.draw());
    }

    /**
     * Clears the canvas to prepare for a new frame.
     */
    clearCanvas() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    }

    /**
     * Draws the start screen, clearing the canvas and adding the start screen elements.
     */
    drawStartScreen() {
        this.clearCanvas();
        this.ctx.translate(this.camera_x, 0);
        this.addStartScreen();
        this.ctx.translate(-this.camera_x, 0);
    }

    /**
     * Draws the start screen by translating the canvas and adding the start screen to the map.
     */
    addStartScreen() {
        this.ctx.translate(-this.camera_x, 0);
        if(this.startScreen) this.addToMap(this.startScreen);
        this.ctx.translate(this.camera_x, 0);
    }

    /**
     * Adds multiple objects to the map by iterating over the array of objects.
     * @param {Array} objects - The array of objects to be added to the map.
     */
    addObjectsToMap(objects) {
        objects.forEach(o => {
            this.addToMap(o);
        });
    }

    /**
     * Adds a single object to the map and handles its drawing.
     * If the object has a different direction, it flips the image.
     * @param {Object} mo - The object to be added to the map.
     */
    addToMap(mo) {
        this.ctx.save(); 
        if (mo.otherDirection) {
            this.flipImage(mo);
        } 
        mo.draw(this.ctx);
        // mo.drawFrame(this.ctx);
        this.ctx.restore();
    }

    /**
     * Flips the image of an object by translating and scaling the context.
     * @param {Object} mo - The object whose image needs to be flipped.
     */
    flipImage(mo) {
        this.ctx.translate(mo.x + mo.width, mo.y); 
        this.ctx.scale(-1, 1);
    }

    /**
     * Adds fixed objects such as the bottle bar, health bar, coin bar, and Endboss bar to the map.
     */
    addFixedObjects() {
        this.ctx.translate(-this.camera_x, 0);
        this.addToMap(this.bottleBar);
        this.addToMap(this.healthBar);
        this.addToMap(this.coinBar);
        if(this.endbossBar) this.addToMap(this.endbossBar);
        this.ctx.translate(this.camera_x, 0);
    }

    /**
     * Checks if the character is near the last segment of the level and generates new background segments if needed.
     */
    checkForNewSegments() {
        const bufferZone = 1500;
        if (this.character.x + bufferZone > this.level.lastSegmentX) {
            let startIndex = Math.floor(this.level.lastSegmentX / this.level.segmentWidth);
            setTimeout(() => {
                this.level.generateBackground(startIndex, 4);
            }, 50);
        }
    }

    /**
     * Checks if the character is near the last cloud and generates new clouds if needed.
     */
    checkForNewClouds() {
        const bufferZone = 2000;
        let lastCloudX = this.getLastCloudX();
        if (this.character.x + bufferZone > lastCloudX) {
            let startIndex = Math.floor(lastCloudX / this.level.segmentWidth);
            this.level.generateClouds(startIndex, 4);
        }
    }

    /**
     * Returns the X position of the last cloud.
     * @returns {number} - The X position of the last cloud.
     */
    getLastCloudX() {
        return this.level.clouds.length > 0 
            ? Math.max(...this.level.clouds.map(c => c.x)) 
            : 0;
    }

    /**
     * Removes the start screen animation and clears the start screen object.
     */
    removeStartScreen() {
        if (this.animationIdStartScreen) {
            clearInterval(this.animationIdStartScreen);
            this.animationIdStartScreen = null;
        }
        this.startScreen = null;
    }

    /**
     * Starts the animation for drawing the lost screen at a specified frame rate.
     */
    startAnimationDrawLostScreen() {
        this.animationIdLostScreen = setInterval(() => this.drawLostScreen(), 1000 / currentHz);
    }

    /**
     * Draws the lost screen by translating the canvas and adding the lost screen to the map.
     */
    drawLostScreen() {
        this.clearCanvas();
        this.ctx.translate(this.camera_x, 0);
        this.addLostScreen();
        this.ctx.translate(-this.camera_x, 0);
    }

    /**
     * Adds the lost screen elements, including the background and the lost screen, to the map.
     */
    addLostScreen() {
        this.ctx.translate(-this.camera_x, 0);
        if (this.backgroundScreen) this.addToMap(this.backgroundScreen);
        if (this.lostScreen) this.addToMap(this.lostScreen);
        this.ctx.translate(this.camera_x, 0);
    }

    /**
     * Starts the animation for drawing the won screen at a specified frame rate.
     */
    startAnimationDrawWonScreen() {
        this.animationIdWonScreen = setInterval(() => this.drawWonScreen(), 1000 / currentHz);
    }

    /**
     * Draws the won screen by translating the canvas and adding the won screen to the map.
     */
    drawWonScreen() {
        this.clearCanvas();
        this.ctx.translate(this.camera_x, 0);
        this.addWonScreen();
        this.ctx.translate(-this.camera_x, 0);
    }

    /**
     * Adds the won screen elements, including the background and the won screen, to the map.
     */
    addWonScreen() {
        this.ctx.translate(-this.camera_x, 0);
        if (this.backgroundScreen) this.addToMap(this.backgroundScreen);
        if(this.wonScreen) this.addToMap(this.wonScreen);
        this.ctx.translate(this.camera_x, 0);
    }

    /**
     * Ends the game by stopping music, sounds, intervals, and removing all objects.
     * If the game is won or lost, it triggers the respective outcome.
     * @param {string} type - The type of the endgame ('won' or 'lost').
     */
    endGame(type) {
        this.stopAllMusicAndSounds();
        this.stopAllIntervals();
        this.removeAllObjects();
        if (type == 'won') {
            this.gameWon();
            return;
        } else if (type == 'lost') {
            this.gameLost();
        }
        // removeLandscapeLockStyles();
    }

    /**
     * Pauses all background music and sounds.
     */
    stopAllMusicAndSounds() {
        sounds.backgroundMusic.pause();
        sounds.chickenAndPoults.pause();
        sounds.backgroundMusicEndboss.pause();
    }

    /**
     * Handles the scenario where the game is won, starting the won screen animation and playing the "game won" sound.
     */
    gameWon() {
        this.startAnimationDrawWonScreen();
        showRestartButton();
        playSound(sounds.gameWon);
    }

    /**
     * Handles the scenario where the game is lost, starting the lost screen animation and playing the "game lost" sound.
     */
    gameLost() {
        this.startAnimationDrawLostScreen();
        showRestartButton();
        playSound(sounds.gameLost);
    }

    /**
     * Stops all active intervals and animations, including the drawing of the game.
     */
    stopAllIntervals() {
        clearAllIntervals();
        clearAllIntervalsSafetyVersion();
        cancelAnimationFrame(this.drawAnimationID);
    }

    /**
     * Removes all game objects and resets their references to null.
     */
    removeAllObjects() {
        this.level.backgroundObjects = null;
        this.level.clouds = null;
        this.character = null;
        this.level.enemies = null;
        this.level.collectables = null;
        this.throwableObjects = null;
    }

    /**
     * Removes the end screen and stops the respective animations.
     */
    removeEndScreen() {
        ['Won', 'Lost'].forEach(type => {
            const idKey = `animationId${type}Screen`;
            if (this[idKey]) {
                clearInterval(this[idKey]);
                this[idKey] = null;
            }
            this[`${type.toLowerCase()}Screen`] = null;
            this.backgroundScreen = null;
        });
    }
}