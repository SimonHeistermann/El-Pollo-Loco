class CollectableObject extends MovableObject {

    constructor() {
        super();
    }

    getRandomImage(images) {
        const randomIndex = Math.floor(Math.random() * images.length);
        return images[randomIndex];
    }
    
}



