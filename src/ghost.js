import Player from './player.js';
import Furniture from './furniture.js';
/**
 * @extends Player
 */
export default class Ghost extends Player {
/**
 * Clase que representa el jugador fantasma. Tiene la capacidad de poseer objetos 
 * y moverlos por el  escenario. No puede atravesar las zonas iluminadas.
 */
  /**Constructor del jugador fantasma
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
       //si posee un objeto le pasa su posicion para que se mueve con él
      this.itemPossesed.setPosition(this.body.x+this.body.width/2, this.body.y+this.body.height/2);
      this.setScale(0.5);
      this.setAlpha(0);
      this.depth = 5;
    }
    if(this.itemPossesed === null) this.setScale(1);
  }
  
  RayDetect() {
    //si un rayo detecta un fantasma el nivel vuelve a empezar
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

  //Permite el movimiento del objeto poseido
  AllowMovement() {
    this.shouldMoveItem = true;
  }

  //Asigna el objeto que debe ser poseido
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