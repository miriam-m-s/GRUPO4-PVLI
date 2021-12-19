export default class Intro extends Phaser.Scene {
    constructor() {
        super({
            key: 'intros'
        });
    }


    

    create() {
        const screenCenterX = this.cameras.main.worldView.x + this.cameras.main.width / 2;
        const screenCenterY = this.cameras.main.worldView.y + this.cameras.main.height / 2;
        this.intro = this.add.video( screenCenterX , screenCenterY, 'vid');
        this.intro.setScale(0.6);
        this.intro.play(true);
    }
    update() {
         if (this.intro.getProgress() >= 0.99) {
             this.scene.start('mainMenu');
         }
    };
}