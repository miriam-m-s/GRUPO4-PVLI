import Player from './player.js';
import Furniture from './furniture.js';
/**
 * Clase que representa el jugador del juego. El jugador se mueve por el mundo usando los cursores.
 * También almacena la puntuación o número de estrellas que ha recogido hasta el momento.
 */
export default class Ghost extends Player {

  /**
   * @param {Phaser.Scene} scene Escena a la que pertenece el jugador
   * @param {int} playerPosx posicion x del ghost
   * @param {int}playerPosY posicion y del ghost
   * @param {bool} beingControlled booleano que dice si un jugador se mueve o no
   * @param {Array<Furniture>} ghostItems lista de muebles
  
   */

  constructor(scene, playerPosX, playerPosY, beingControlled, ghostItems) {
    super(scene, playerPosX, playerPosY, 'Ghost', beingControlled, ghostItems);

    this.shouldMoveItem = false;
    this.ghostItems = ghostItems;
    this.possesion = scene.sound.add('possesion');
  }

  preUpdate(t, dt) {
    super.preUpdate(t, dt);
    if (this.beingControlled) {
      //elige el objeto que este más cerca de él
      this.CheckForNearestObject(this.ghostItems);
    }
    if (this.itemPossesed != null && this.shouldMoveItem) {
       //si poseé un objeto le pasa su posicion para que se mueve con él
      this.itemPossesed.setPosition(this.body.x+this.body.width/2, this.body.y+this.body.height/2);
      this.setScale(0.5);
      this.setAlpha(0);
      this.depth = 5;
    }
    if(this.itemPossesed === null) this.setScale(1);
  }
  
  RayDetect() {
    //si un rayo detecta un fantasma el nivel vuelve a empezar
    console.log("soy fantasma");
    this.scene.ResetLevel();
  }
 
  PossessObject(objectToPossess) {
    if (this.AssignObject(objectToPossess)) {
      var tween = this.scene.tweens.add({
        targets: this.body,
        x: this.itemPossesed.body.x,
        y: this.itemPossesed.body.y,
        ease: 'Cubic',
        duration: 500,
        yoyo: false,
        onComplete: this.AllowMovement()
      });
    }
  }

  AllowMovement() {
    this.shouldMoveItem = true;
  }

  AssignObject(objectToPossess) {
    if (!this.scene.levelPaused()) {
      if (this.itemPossesed == null) {
        if(this.scene.musicOn)
          this.possesion.play();
        this.itemPossesed = objectToPossess;

        return true;

      } else {
        if(this.scene.musicOn)
          this.possesion.play();
        this.setAlpha(1);
        this.itemPossesed = null;
      }
      return false;
    }

  }
}