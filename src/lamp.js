/**
<<<<<<< HEAD

 
 * @extends Phaser.GameObjects.Sprite

 */

import Lights from './lights.js';
export default class Lamp extends Phaser.GameObjects.Sprite {

  /**
=======
 
 * @extends Phaser.GameObjects.Sprite
 */
 export default class Lamp extends Phaser.GameObjects.Sprite {
  
    /**
>>>>>>> VisualsRevamp
   * Constructor de la Plataforma
   * @param {bool} isOn esta encendida? comienza apagada por defecto
   * @param {Object} lightCircle circulo de luz
   */
<<<<<<< HEAD

  constructor(scene, lampPosX, lampPosY, sprite, human, ghost, lampGroup) {
    super(scene, lampPosX, lampPosY, sprite);
    this.scene = scene;
    this.human = human;
    this.ghost = ghost;
    this.lampPosX = lampPosX;
    this.lampPosY = lampPosY;
    this.lampGroup = lampGroup;
    this.soundlight = scene.sound.add('light');
    this.scene.add.existing(this);
    this.scene.physics.add.existing(this);
    this.isOn = false;
    //this.depth = -5;
    this.light = null;
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
        this.soundlight.play();
        let radius = 30;
        this.light = new Lights(this.scene, this.scene.humanPlayer, this.scene.ghostPlayer, this.scene.lights, this.lampPosX - radius, this.lampPosY - radius, radius);

      } else {
        this.setTexture('lampSelected');
        this.soundlight.play();
        this.light.body.enable = true;
        this.light.body.gameObject.alpha = 0.3;
      }
    } else //Esta encendida
    {

      this.soundlight.play();
      this.light.body.enable = false;
      this.light.body.gameObject.alpha = 0;
      this.setTexture('lampDefault');
=======
  
    constructor(scene, player, lampGroup, lampPos) 
    {
    super(scene, player, lampGroup, lampPos);
    this.scene = scene;
    this.player = player;
    this.lampPos = lampPos;

    this.scene.add.existing(this);
    this.body = this.scene.physics.add.sprite(this.lampPos.x, this.lampPos.y, 'lampDefault');
    this.isOn = false;
    //this.depth = -5;
    this.lightCircle = null;
  }
  

  SelectObject()
  {
    if(this.isOn) return;
    //this.scale = 1.085;
    this.body.setTexture('lampSelected');
  }
  DeselectObject() 
  {
    if(this.isOn) return;
    this.body.setTexture('lampDefault');
    this.scale = 1;
  }

  Interact()
  {
    
    //this.body.setTexture('lampDefault');
    if(!this.isOn)//si no esta encendida
    {
      if(this.lightCircle == null)
      {
        this.lightCircle = this.scene.CreateLight(this.lampPos, 1.2);
      }
      else
      {
        this.lightCircle.body.alpha = 1;
        //this.lightCircle.sprite.setActive(true);
      }
    }
    else //Esta encendida
    {
      this.lightCircle.sprite = this.lightCircle.body;
      this.lightCircle.body.enable = false;
      this.lightCircle.body.alpha = 0;
>>>>>>> VisualsRevamp
      //this.body.setActive(false);
    }
    this.isOn = !this.isOn;
  }
<<<<<<< HEAD
}
=======
}  
>>>>>>> VisualsRevamp
