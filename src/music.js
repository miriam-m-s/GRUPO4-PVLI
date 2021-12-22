/**
 * @extends Phaser.GameObjects.Container
 */
export default class Music extends Phaser.GameObjects.Container {

    /** 
     * Constructor del boton de musica. Detiene y reanuda la musica del juego
     * @param {Phaser.Scene} scene Nivel en el que se crea el sonido
     * @param {int} x posicion x del music button
     * @param {int} y posicion y del menu button
     */

    constructor(scene) {
       super(scene);
       this.scene = scene
    }

    
    clickMusic() {
        if(!this.scene.isPaused){
          this.scene.musica.alpha = 1 - this.scene.musica.alpha;
          this.scene.stoppedMusic.alpha = 1 - this.scene.stoppedMusic.alpha;
          this.scene.musicOn = !this.scene.musicOn;
          if (this.scene.musicOn) 
            this.scene.music.play();
          else 
            this.scene.music.stop();
        } 
    }
    
 }