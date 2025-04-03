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
    animationIdStartScreen = null;

    constructor(canvas, keyboard) {
        this.canvas = canvas;
        this.keyboard = keyboard;
        this.ctx = canvas.getContext('2d');
        this.character = new Character(this);
        this.startAnimationDrawStartScreen();
    }

    startAnimationDrawStartScreen() {
        this.animationIdStartScreen = setInterval(() => this.drawStartScreen(), 1000 / currentHz);
    }

    initLevel(level) {
        this.level = level;
        this.draw();
        this.runFast();
        this.runSlow();
    }

    runFast() {
        setInterval(() => {
            this.checkCollisions();
            this.checkCollisionsForCollectables();
            this.checkCoinBar();
            this.checkCollisionsForThrownBottles();
            this.checkEndBossAnimation();
        }, 50)
    }

    runSlow() {
        setInterval(() => {
            this.checkThrowObjects();
        }, 200)
    }

    checkCollisions() {
        let enemyHit = this.getJumpedOnEnemy();
        this.level.enemies.forEach(enemy => this.handleEnemyCollision(enemy));
        if (enemyHit) this.handleEnemyDefeat(enemyHit);
    }
    
    getJumpedOnEnemy() {
        return this.level.enemies.find(enemy => this.character.isColliding(enemy) && this.character.isJumpingOn(enemy)) || null;
    }
    
    handleEnemyCollision(enemy) {
        if (!this.character.isColliding(enemy) || this.character.isJumpingOn(enemy)) return;
        this.character.hit();
        this.healthBar.setPercentage(this.character.energy);
        if (enemy instanceof Endboss) this.character.knockbackFromEndboss(20);
    }
    
    handleEnemyDefeat(enemy) {
        enemy.die();
        this.character.bounce();
    }    

    checkThrowObjects() {
        if(this.keyboard.THROW && this.bottleBar.percentage > 0) {
            let bottle = new ThrowableObject(this.character.x + 100, this.character.y + 100, this);
            if(bottle) this.throwableObjects.push(bottle);
        }
    }

    checkCollisionsForThrownBottles() {
        this.throwableObjects.forEach(bottle => {
            let enemyHit = this.getHitEnemy(bottle);
            if (bottle.bottleHasHitGround()) this.handleGroundHit(bottle);
            if (enemyHit) this.handleEnemyHit(bottle, enemyHit);
        });
    }
    
    getHitEnemy(bottle) {
        return this.level.enemies.find(enemy => bottle.isColliding(enemy)) || null;
    }
    
    handleGroundHit(bottle) {
        bottle.stopThrowing();
        bottle.bottleHit();
        this.removeBottleAfterDelay(bottle);
    }
    
    handleEnemyHit(bottle, enemy) {
        bottle.stopThrowing();
        bottle.bottleHit();
        if (enemy instanceof Endboss) enemy.hit();
        else enemy.die();
        this.removeBottleAfterDelay(bottle);
    }
    
    removeBottleAfterDelay(bottle) {
        setTimeout(() => bottle.removeObject(), 500);
    }
    

    checkCollisionsForCollectables() {
        for (let i = this.level.collectables.length - 1; i >= 0; i--) {
            let collectable = this.level.collectables[i];
            if (this.character.isColliding(collectable)) {
                this.character.collect(collectable);
                this.level.collectables.splice(i, 1);
            }
        }
    }

    checkCoinBar() {
        if (this.coinBar.percentage >= 100) {
            this.coinBar.setPercentage(0);
            this.healthBar.setPercentage(100);
        }
    }

    checkEndBossAnimation() {
        const bufferZone = 800;
        const endBoss = this.level.enemies.find(enemy => enemy instanceof Endboss);
        if (endBoss && this.character.x >= endBoss.x - bufferZone) {
            endBossReady = true;
            this.checkForEndBossbar();
        } else {
            endBossReady = false;
        }
    }
    
    checkForEndBossbar() {
        if (!this.endbossBar) {
            this.endbossBar = new EndbossBar();
        }
    }
    
    draw() {
        this.clearCanvas();
        this.ctx.translate(this.camera_x, 0);
        this.addObjectsToMap(this.level.backgroundObjects);
        this.addObjectsToMap(this.level.clouds);
        this.addToMap(this.character);
        this.addObjectsToMap(this.level.enemies);
        this.addObjectsToMap(this.level.collectables);
        this.addObjectsToMap(this.throwableObjects);
        this.addFixedObjects();
        this.ctx.translate(-this.camera_x, 0);
        this.checkForNewSegments();
        this.checkForNewClouds();
        requestAnimationFrame(() => this.draw());
    }

    clearCanvas() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    }

    drawStartScreen() {
        this.clearCanvas();
        this.ctx.translate(this.camera_x, 0);
        this.addStartScreen();
        this.ctx.translate(-this.camera_x, 0);
    }

    addStartScreen() {
        this.ctx.translate(-this.camera_x, 0);
        if(this.startScreen) this.addToMap(this.startScreen);
        this.ctx.translate(this.camera_x, 0);
    }

    addObjectsToMap(objects) {
        objects.forEach(o => {
            this.addToMap(o);
        });
    }

    addToMap(mo) {
        this.ctx.save(); 
        if (mo.otherDirection) {
            this.flipImage(mo);
        } 
        mo.draw(this.ctx);
        mo.drawFrame(this.ctx);
        this.ctx.restore();
    }

    flipImage(mo) {
        this.ctx.translate(mo.x + mo.width, mo.y); 
        this.ctx.scale(-1, 1);
    }

    addFixedObjects() {
        this.ctx.translate(-this.camera_x, 0);
        this.addToMap(this.bottleBar);
        this.addToMap(this.healthBar);
        this.addToMap(this.coinBar);
        if(this.endbossBar) this.addToMap(this.endbossBar);
        this.ctx.translate(this.camera_x, 0);
    }

    checkForNewSegments() {
        const bufferZone = 1500;
        if (this.character.x + bufferZone > this.level.lastSegmentX) {
            let startIndex = Math.floor(this.level.lastSegmentX / this.level.segmentWidth);
            setTimeout(() => {
                this.level.generateBackground(startIndex, 4);
            }, 50);
        }
    }

    checkForNewClouds() {
        const bufferZone = 2000;
        let lastCloudX = this.getLastCloudX();
        if (this.character.x + bufferZone > lastCloudX) {
            let startIndex = Math.floor(lastCloudX / this.level.segmentWidth);
            this.level.generateClouds(startIndex, 4);
        }
    }
    
    getLastCloudX() {
        return this.level.clouds.length > 0 
            ? Math.max(...this.level.clouds.map(c => c.x)) 
            : 0;
    }

    removeStartScreen() {
        if (this.animationIdStartScreen) {
            clearInterval(this.animationIdStartScreen);
            this.animationIdStartScreen = null;
        }
        this.startScreen = null;
    }
}