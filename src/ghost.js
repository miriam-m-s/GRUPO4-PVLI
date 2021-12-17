import Player from './player.js';
import Furniture from './furniture.js';
/**
 * Clase que representa el jugador del juego. El jugador se mueve por el mundo usando los cursores.
 * También almacena la puntuación o número de estrellas que ha recogido hasta el momento.
 */
export default class Ghost extends Player {

  /**@param {Array<Lamp>} mueblesList la lista de lamparas
   * @param {Phaser.Scene} scene Escena a la que pertenece el jugador
   * @param {Array<Furniture>} ghostItems lista de muebles
   * @param {Object} itemPossesed objeto que se esta poseyendo
   * @param {bool} shouldMoveItem deberia de mover el objeto poseido
   */

  constructor(scene, playerPosX, playerPosY, beingControlled, ghostItems) {
    super(scene, playerPosX, playerPosY, 'Ghostsel', 'Ghost', beingControlled, ghostItems);

    this.shouldMoveItem = false;
    this.ghostItems = ghostItems;
    this.possesion = scene.sound.add('possesion');

  }

  preUpdate(t, dt) {
    super.preUpdate(t, dt);
    if (this.beingControlled) {
      this.CheckForNearestObject(this.ghostItems);
    }
    if (this.itemPossesed != null && this.shouldMoveItem) {
     
      this.itemPossesed.setPosition(this.body.x+this.body.width/2, this.body.y+this.body.height/2);
      this.setScale(0.5);
      this.setAlpha(0);
    }
    if(this.itemPossesed === null) this.setScale(1);
  }
  
  Mirrordetect() {
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
        this.possesion.play();
        this.itemPossesed = objectToPossess;

        return true;

      } else {
        this.possesion.play();
        this.setAlpha(1);
        this.itemPossesed = null;
      }
      return false;
    }

  }
}