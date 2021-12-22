import Player from './player.js';
import Lamp from './lamp.js';
/**
 * @extends Player
 */
export default class Human extends Player {
  /**
   * Clase que representa el jugador humano. Tiene la capacidad de interactuar con objetos 
   * y asi generar luces en el  escenario. No puede abandonar las zonas iluminadas.
   */
  /**
   * @param {Phaser.Scene} scene Escena a la que pertenece el jugador
   * @param {int} x posicion x del ghost
   * @param {int} y posicion y del ghost
   * @param {bool} beingControlled booleano que dice si un jugador se mueve o no
   * @param {Array<Furniture>} humanItems lista de muebles
   */

  constructor(scene, x, y, beingControlled, humanItems) {
    super(scene, x, y, 'Human', beingControlled, humanItems);


    this.humanItems = humanItems;
    this.anims.play('_up' + this.playerName, false);

    this.onLight = true;

    this.saveX = 0;
    this.saveY = 0;
  }

  RayDetect() {
    //cuando un rayo detecta al humano no hace nada, el humano interrumpe su paso
  }

  // La luz en la que este el Human en este momento llama a esta funcion para actualizar 
  // las variables saveX y saveY

  onLightFunction(x, y) {
    this.onLight = true;
    this.saveX = x;
    this.saveY = y;
  }

  preUpdate(t, dt) {
    super.preUpdate(t, dt);

    // En el caso en el que el human se salga de la luz
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