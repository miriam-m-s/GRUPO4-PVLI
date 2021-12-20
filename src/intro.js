export default class Intro extends Phaser.Scene {
    constructor() {
        super({
            key: 'intros'
        });
    }


    

    create() 
    {
        const video = this.add.video(this.game.config.width/2-40,this.game.config.height/2,'vid');
        video.play(false);  //No loop
        video.on('complete', (video)=>{
            video.destroy();
            this.scene.start('mainMenu');
        });
    }
  
}