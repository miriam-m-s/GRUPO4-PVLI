/**

 
 * @extends Phaser.GameObjects.Sprite

 */

import Lights from './lights.js';
export default class Lamp extends Phaser.GameObjects.Sprite {

  /*Clase Lamp:este objeto creara un circulo de luz cuando el humano interaccione con 
  el objeto switch */
  /**
   * @param {Phaser.Scene} scene Escena a la que pertenece el lamp
   * @param {int} lampPosx posicion x del lamp
   * @param {int} lampPosY posicion y del lamp
   * @param {Lights} radius  tamaño del radio de luz
   * @param {int} light  Luz asignada a este objeto
   * @param {boolean} isOn  Devuelve 'true' si la lampara esta encendida
   */
  
  constructor(scene, lampPosX, lampPosY, radius) {
    super(scene, lampPosX, lampPosY, 'lampDefault');

    // SetUp variables
    this.scene = scene;
    this.depth = 4;
    this.lampPosX = lampPosX;
    this.lampPosY = lampPosY;
    this.radius = radius;
    this.light=null;
    this.soundlight = scene.sound.add('light');

    // Fisicas
    this.scene.add.existing(this);
    this.scene.physics.add.existing(this);


    // Todas las lamparas empiezan encendidas
    this.isOn = true;
    // Crear la luz que controlara esta lampara
    this.light = new Lights(this.scene, this.scene.humanPlayer, this.scene.ghostPlayer, this.x - this.radius, this.y - this.radius, this.radius, false, true);
    this.SetOn();
  }

  SelectObject() {
    if (this.isOn) return;
    this.setTexture('lampSelected');
  }
  DeselectObject() {
    if (this.isOn) return;
    this.setTexture('lampDefault');
    this.scale = 1;
  }

    Interact() {

    if (!this.isOn) // Si no esta encendida, encenderla
    {
      this.SetOn();
    }
    else // Si esta encendida, apagarla
    {
      this.SetOff();
    }
    this.isOn = !this.isOn;
  }

  // Encender lampara
  SetOn() {
    this.setTexture('lampSelected');
    if(this.scene.musicOn) this.soundlight.play();
    this.light.body.enable = true;
    // Avisar a la light de que el estado de la lampara ha cambiado
    this.light.LampClicked(true);
  }

  // Apagar lampara
  SetOff() {
    this.setTexture('lampDefault');
    if(this.scene.musicOn) this.soundlight.play();
    this.light.body.enable = false;
    // Avisar a la light de que el estado de la lampara ha cambiado
    this.light.LampClicked(false);
  }
}