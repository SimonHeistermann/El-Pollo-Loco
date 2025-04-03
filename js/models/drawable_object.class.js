class DrawableObject {
    x = 0;
    y = 80;
    height = 150;
    width = 100;
    img;
    imageCache = {};
    currentImage = 0;

    constructor() {
        
    }

    loadImage(path) {
        this.img = new Image();
        this.img.src = path;
    }

    loadImages(arrayOfImagePaths) {
        arrayOfImagePaths.forEach((path) => {
            let img = new Image();
            img.src = path;
            this.imageCache[path] = img;
        });
    }

    getRandomImage(images) {
        const randomIndex = Math.floor(Math.random() * images.length);
        return images[randomIndex];
    }
    
    draw(ctx) {
        if(this.otherDirection) {
            ctx.drawImage(this.img, 0, 0, this.width, this.height);
        } else {
            ctx.drawImage(this.img, this.x, this.y, this.width, this.height);
        }
    }

    drawFrame(ctx) {
        if (this instanceof Character || this instanceof Chicken || this instanceof Endboss || this instanceof CollectableObject || this instanceof Poults || this instanceof ThrowableObject) {
            ctx.beginPath();
            ctx.lineWidth = '5';
            ctx.strokeStyle = 'blue';
            if(this.otherDirection) {
                ctx.rect(0, 0, this.width, this.height);
            } else {
                ctx.rect(this.x, this.y, this.width, this.height);
            }
            ctx.stroke();
        }
    }
}