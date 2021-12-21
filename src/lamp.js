/**

 
 * @extends Phaser.GameObjects.Sprite

 */

import Lights from './lights.js';
export default class Lamp extends Phaser.GameObjects.Sprite {

  /**
   * Constructor de la Plataforma
   * @param {bool} isOn esta encendida? comienza apagada por defecto
   * @param {Object} lightCircle circulo de luz
   */

  constructor(scene, lampPosX, lampPosY, radius, human, ghost) {

    super(scene, lampPosX, lampPosY, 'lampDefault');
    this.scene = scene;
    this.depth = 4;
    this.human = human;
    this.ghost = ghost;
    this.lampPosX = lampPosX;
    this.lampPosY = lampPosY;
    this.radius = radius;
    this.soundlight = scene.sound.add('light');
    this.scene.add.existing(this);
    this.scene.physics.add.existing(this);
    this.light=null;
    console.log("this.isOn = " + this.isOn);
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

    if (!this.isOn) //si no esta encendida
    {
      if (this.light == null) {
        if(this.scene.musicOn){ 
          this.soundlight.play();
        }
        // Avisar a la light de esta lampara
        this.light = new Lights(this.scene, this.scene.humanPlayer, this.scene.ghostPlayer, this.x - this.radius, this.y - this.radius, this.radius, false, true);
        this.light.LampClicked(true); 
      } 
      else {
        this.setTexture('lampSelected');
        if(this.scene.musicOn) this.soundlight.play();
        this.light.body.enable = true;
        // Avisar a la light de esta lampara
        this.light.LampClicked(true);
      }
    }
    else //Esta encendida
    {
      if(this.scene.musicOn) this.soundlight.play();
      this.light.body.enable = false;
      this.setTexture('lampDefault');
      //this.body.setActive(false);

      // Avisar a la light de esta lampara
      this.light.LampClicked(false);
    }
    this.isOn = !this.isOn;
  }
}