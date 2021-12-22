/**
 * @extends Phaser.GameObjects.Sprite
 */

import Lamp from './lamp.js';
export default class Switch extends Phaser.GameObjects.Sprite {

  /**Clase Switch:interruptor que lo hace interaccionar el humano,este al ser pulsado
   llama a la lamapara del nivel y la enciende
  * @param {Phaser.Scene} scene Escena a la que pertenece el jugador
  * @param {int} x posicion x del ghost
  * @param {int} y posicion y del ghost
  * @param {boolean} isOn  Devuelve 'true' si la candle esta encendida
  */
  constructor(scene, x, y) {
    super(scene, x, y, 'switchDefault');

    // SetUp variables
    this.scene = scene;
    this.soundlight = scene.sound.add('light');
    this.depth = 5;

    // Fisicas
    this.scene.add.existing(this);
    this.scene.physics.add.existing(this);

    // Variables de Switch
    this.isOn = false;
  }

  SelectObject() {
    if (this.isOn) return;
    this.setTexture('switchSelected');
  }

  DeselectObject() {
    if (this.isOn) return;
    this.setTexture('switchDefault');
  }

  // Este metodo se llama cuando el Human interactua con este Switch
  Interact() {
    // El switch le 
    this.scene.lamp.Interact();
  }
}