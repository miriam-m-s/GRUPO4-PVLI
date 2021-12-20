 export default class Pause extends Phaser.GameObjects.Container {

    /** 
     * Constructor del menu de pausa
     * @param {Phaser.Scene} scene Nivel en el que se crea elmenu de pausa
     * @param {int} x posicion x del menu
     * @param {int} y posicion y del menu
     */

    constructor(scene, x, y, alpha, levelName) {

       super(scene, x, y);
       this.alpha = alpha;
       this.scene = scene;
       this.setDepth(10);
       this.fondo = this.scene.add.image(0,0 , 'pauseMenu');
       this.fondo.scale = 0.3;
       let textConfig = {
          fontSize: '20px',
          color: '#ffffff',
          fontFamily: 'Arial'
       };
       
       this.pauseText = this.scene.add.text(-35, -62, "Paused", textConfig);
       this.resumeText = this.scene.add.text(-25, -7, "Resume", textConfig).setInteractive();
       this.resumeText.scale = 0.6;
       this.resumeText.on('pointerdown', function () {
          this.scene.pauseMenu.clickPause();
       });

       this.restartText = this.scene.add.text(-25, 8, "Restart", textConfig).setInteractive();
       this.restartText.scale = 0.6;
       this.restartText.on('pointerdown', function () {
          this.scene.scene.start(levelName);
       });

       this.quitText = this.scene.add.text(-25, 23, "Quit", textConfig).setInteractive();
       this.quitText.scale = 0.6;
       this.quitText.on('pointerdown', function () {
          this.scene.scene.start('mainMenu');
       });

       this.add([this.fondo, this.pauseText, this.resumeText, this.restartText, this.quitText]);
       this.scene.add.existing(this);
    }

    clickPause() {
      this.scene.pausa.alpha = !this.scene.pausa.alpha;
      this.scene.playButton.alpha = !this.scene.playButton.alpha;
      this.scene.isPaused = !this.scene.isPaused;
      if (this.scene.isPaused) //Crea el menu con los botones
      {
        this.scene.anims.pauseAll(); //Pausa todas las animaciones de la escena
        this.active = true;
        this.alpha = 1;
  
        //Sonido
        this.scene.music.stop();
        if(this.scene.musicOn) this.scene.exit.play();
        
      } else //Lo desactiva
      {
        //Visual
        this.active = false;
        this.alpha = 0;
        this.scene.anims.resumeAll(); //Reanuda las animaciones que habia activas al pausar la escena
        
        //Sonido
        if(this.scene.musicOn) this.scene.music.play();
      }
      this.scene.timer.change();
    }

 }