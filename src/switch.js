/**

 
 * @extends Phaser.GameObjects.Sprite

 */

import Lamp from './lamp.js';
export default class Switch extends Phaser.GameObjects.Sprite {

  /**
   * Constructor de la Plataforma
   * @param {bool} isOn esta encendida? comienza apagada por defecto
   * @param {Object} asignedLamp circulo de luz
   */

  constructor(scene, switchPosX, switchPosY, sprite, human, ghost, lampGroup, lampAsigned) {
    super(scene, switchPosX, switchPosY, sprite, lampAsigned);

    this.scene = scene;
    this.human = human;
    this.ghost = ghost;
    this.switchPosX = switchPosX;
    this.switchPosY = switchPosY;
    this.lampGroup = lampGroup;
    this.soundlight = scene.sound.add('light');
    this.scene.add.existing(this);
    this.scene.physics.add.existing(this);
    this.isOn = false;
    this.lampAsigned = lampAsigned;
    this.depth = 5;
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
    this.lampAsigned.Interact();
  }
}