/**
 * @extends Phaser.GameObjects.Scene
 */
export default class IntroClip extends Phaser.Scene {
    constructor() {
        super({
            key: 'introClip'
        });
    }

    create() {
        //Camara
        this.camera = this.cameras.main;
        this.camera.zoom = 0.4;

        //cinematica de inicio, cuando termina pasamos al primer nivel
        const video = this.add.video(this.game.config.width / 2, this.game.config.height / 1.5, 'introClipVideo');
        video.play(false); //No loop
        video.on('complete', (video) => {
            video.destroy();
            this.scene.start('level1');
        });
    }

}