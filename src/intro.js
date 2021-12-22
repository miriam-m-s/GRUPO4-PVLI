export default class Intro extends Phaser.Scene {
    constructor() {
        super({
            key: 'intros'
        });
    }

    create() 
    {
        //texto "click para empezar" 
        this.gameTime = this.add.text(this.game.config.width/3, this.game.config.height/2, "CLICK TO START", {
            fontFamily: '"Press Start 2P"',
            font: "40px",
            fill: "#fff",
            align: "left",
            fontStyle: "strong"
          });
          this.gameTime.depth = 80;
        
        //poner un video en la intro
        const video = this.add.video(this.game.config.width/2-40,this.game.config.height/2,'vid');
        video.play(false);  //No loop
        //cuando termina el video, pasamos al menu principal
        video.on('complete', (video)=>{
            video.destroy();
            this.scene.start('mainMenu');
        });
        //cuando empiece el video, se quita el texto de click
        video.on('play', (video)=>{
            this.gameTime.depth = -1;
        });
    }
  
}