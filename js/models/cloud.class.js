class Cloud extends MovableObject {
    y = 0;
    width = 854;
    height = 480;
    cloudSpeed = 0.0625;

    constructor(cloudType, x) {
        super().loadImage(`../assets/img/5_background/layers/4_clouds/${cloudType}.png`);
        this.x = x;
        this.animate();

    }

    animate() {
        this.moveLeft(this.cloudSpeed);
    }
}