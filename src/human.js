import Player from './player.js';
import Lamp from './lamp.js';
/**
 * Clase que representa el jugador del juego. El jugador se mueve por el mundo usando los cursores.
 * También almacena la puntuación o número de estrellas que ha recogido hasta el momento.
 */
export default class Human extends Player {

    /**
   * @param {Phaser.Scene} scene Escena a la que pertenece el jugador
   * @param {int} playerPosx posicion x del ghost
   * @param {int}playerPosY posicion y del ghost
   * @param {bool} beingControlled booleano que dice si un jugador se mueve o no
   * @param {Array<Furniture>} humanItems lista de muebles
   */

  constructor(scene, playerPosX, playerPosY, beingControlled, humanItems) {
    super(scene, playerPosX, playerPosY, 'Human', beingControlled, humanItems);
    this.humanItems = humanItems;
    this.anims.play('_up' + this.playerName, false);

    this.onLight = true;

    this.saveX = 0;
    this.saveY = 0;
  }
  RayDetect() {
  }

  onLightFunction(x, y) {

    this.onLight = true;
    this.saveX = x;
    this.saveY = y;
  }

  preUpdate(t, dt) {

    super.preUpdate(t, dt);

    // Check Lights
    if (!this.onLight) {
      // tween animation
      var tween = this.scene.tweens.add({
        targets: this,
        x: this.saveX,
        y: this.saveY,
        ease: 'Cubic',
        duration: 1000,
        yoyo: false,
      });
    }

    this.onLight = false;

    if (this.beingControlled) {
      //busca el objeto mas cercano que este su array de human list
      this.CheckForNearestObject(this.humanItems);
    }

  }
}