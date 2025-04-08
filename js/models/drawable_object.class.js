/**
 * Represents a drawable object with basic properties and methods for handling images.
 * This class is intended to be inherited by other game objects that need to be rendered on the canvas.
 */
class DrawableObject {
    x = 0;
    y = 80;
    height = 150;
    width = 100;
    img;
    imageCache = {};
    currentImage = 0;
    
    constructor() {}

    /**
     * Loads an image from the specified path and assigns it to the `img` property.
     * @param {string} path - The path to the image to load.
     */
    loadImage(path) {
        this.img = new Image();
        this.img.src = path;
    }

    /**
     * Loads multiple images and stores them in the `imageCache` for later use.
     * @param {Array<string>} arrayOfImagePaths - An array of paths to the images to load.
     */
    loadImages(arrayOfImagePaths) {
        arrayOfImagePaths.forEach((path) => {
            let img = new Image();
            img.src = path;
            this.imageCache[path] = img;
        });
    }

    /**
     * Returns a random image from an array of images.
     * @param {Array<string>} images - An array of image paths.
     * @returns {string} - A randomly selected image path from the array.
     */
    getRandomImage(images) {
        const randomIndex = Math.floor(Math.random() * images.length);
        return images[randomIndex];
    }

    /**
     * Draws the object on the canvas at its current position and size.
     * If the `otherDirection` flag is set, the image will be drawn starting from the origin (0, 0).
     * @param {CanvasRenderingContext2D} ctx - The canvas context to draw on.
     */
    draw(ctx) {
        if (this.otherDirection) {
            ctx.drawImage(this.img, 0, 0, this.width, this.height);
        } else {
            ctx.drawImage(this.img, this.x, this.y, this.width, this.height);
        }
    }

    /**
     * This method is commented out, but when enabled, it would draw a frame around specific objects for debugging purposes.
     * @param {CanvasRenderingContext2D} ctx - The canvas context to draw on.
     */
    // drawFrame(ctx) {
    //     if (this instanceof Character || this instanceof Chicken || this instanceof Endboss || this instanceof CollectableObject || this instanceof Poults || this instanceof ThrowableObject) {
    //         ctx.beginPath();
    //         ctx.lineWidth = '5';
    //         ctx.strokeStyle = 'blue';
    //         if(this.otherDirection) {
    //             ctx.rect(0, 0, this.width, this.height);
    //         } else {
    //             ctx.rect(this.x, this.y, this.width, this.height);
    //         }
    //         ctx.stroke();
    //     }
    // }
}
