/**

 
 * @extends Phaser.GameObjects.Sprite

 */

import Lamp from './lamp.js';
export default class Switch extends Phaser.GameObjects.Sprite {


   /**
   * @param {Phaser.Scene} scene Escena a la que pertenece el jugador
   * @param {int} switchPosx posicion x del ghost
   * @param {int} switchPosY posicion y del ghost
   * @param {boolean} isOn  Devuelve 'true' si la candle esta encendida
   */
  constructor(scene, switchPosX, switchPosY) {
    super(scene, switchPosX, switchPosY, 'switchDefault');

    // SetUp variables
    this.scene = scene;
    this.switchPosX = switchPosX;
    this.switchPosY = switchPosY;
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
  
  Interact()
  {
    //si el switch se enciende llama a la lampara
    this.scene.lamp.Interact();
  }
}