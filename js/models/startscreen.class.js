class StartScreen extends DrawableObject {
    height = 480;
    width = 854;
    y = 0;
    x = 0;
    IMAGES_STARTSCREEN = [
        './assets/img/9_intro_outro_screens/start/startscreen_1.png',
        './assets/img/9_intro_outro_screens/start/startscreen_2.png'
    ];

    constructor() {
        super().loadImage(this.getRandomImage(this.IMAGES_STARTSCREEN));
    }

}