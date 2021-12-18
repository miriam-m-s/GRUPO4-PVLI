export default class Music extends Phaser.GameObjects.Container {

    /** 
     * Constructor del musica
     * @param {Phaser.Scene} scene Nivel en el que se crea el sonido
     * @param {int} x posicion x del menu
     * @param {int} y posicion y del menu
     */

    constructor(scene, x, y) {
       super(scene, x, y);
       this.scene = scene
    }

    clickMusic() {
        if(!this.scene.isPaused){
          this.scene.musicOn = !this.scene.musicOn;
          if (this.scene.musicOn) 
            this.scene.music.play();
          else 
            this.scene.music.stop();
        } 
      }

 }