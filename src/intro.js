export default class Intro extends Phaser.Scene {
    constructor() {
        super({
            key: 'intros'
        });
    }


    

    create() {
        this.intro = this.add.video(500, 300, 'vid');
        this.intro.setScale(0.3);
        this.intro.play(true);
    }
    update() {
         if (this.intro.getProgress() >= 0.99) {
             this.scene.start('mainMenu');
         }
    };
}