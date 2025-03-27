class World {
    canvas;
    ctx;
    keyboard;
    camera_x = 0;
    level = level1;
    bottleBar = new BottleBar();
    healthBar = new HealthBar();
    coinBar = new CoinBar();
    throwableObjects = [];

    constructor(canvas, keyboard) {
        this.canvas = canvas;
        this.keyboard = keyboard;
        this.ctx = canvas.getContext('2d');
        this.character = new Character(this);
        this.draw();
        this.run()
    }

    run() {
        setInterval(() => {
            this.checkCollisions();
            this.checkThrowObjects();
        }, 200)
    }

    checkCollisions() {
        this.level.enemies.forEach((enemy) => {
            if (this.character.isColliding(enemy)) {
                this.character.hit();
                this.healthBar.setPercentage(this.character.energy);
            }
        });
    }

    checkThrowObjects() {
        if(this.keyboard.THROW) {
            let bottle = new ThrowableObject(this.character.x + 100, this.character.y + 100);
            if(bottle) this.throwableObjects.push(bottle);
        }
    }
    
    draw() {
        this.clearCanvas();
        this.ctx.translate(this.camera_x, 0);
        this.addObjectsToMap(this.level.backgroundObjects);
        this.addObjectsToMap(this.level.clouds);
        this.addToMap(this.character);
        this.addObjectsToMap(this.level.enemies);
        this.addObjectsToMap(this.level.collectableBottles);
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
        this.ctx.translate(this.camera_x, 0);
    }

    checkForNewSegments() {
        const bufferZone = 1500;
        if (this.character.x + bufferZone > this.level.lastSegmentX) {
            let startIndex = Math.floor(this.level.lastSegmentX / this.level.segmentWidth);
            setTimeout(() => {
                this.level.generateBackground(startIndex, 4, 1);
            }, 50);
        } 
        if (this.character.x - bufferZone < Math.min(...this.level.backgroundObjects.map(obj => obj.x))) {
            let startIndex = Math.floor(Math.min(...this.level.backgroundObjects.map(obj => obj.x)) / this.level.segmentWidth);
            setTimeout(() => {
                this.level.generateBackground(startIndex, 4, -1);
            }, 50);
        }
    }

    checkForNewClouds() {
        const bufferZone = 2000;
        let lastCloudX = this.level.clouds.length > 0 ? Math.max(...this.level.clouds.map(c => c.x)) : 0;
        let firstCloudX = this.level.clouds.length > 0 ? Math.min(...this.level.clouds.map(c => c.x)) : 0;
        if (this.character.x + bufferZone > lastCloudX) {
            let startIndex = Math.floor(lastCloudX / this.level.segmentWidth);
            this.level.generateClouds(startIndex, 4, 1);
        }
        if (this.character.x - bufferZone < firstCloudX) {
            let startIndex = Math.floor(firstCloudX / this.level.segmentWidth);
            this.level.generateClouds(startIndex, 4, -1);
        }
    }
}