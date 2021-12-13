
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
  
    constructor(scene, lampPosX, lampPosY, sprite, human,ghost, lampGroup) 
    {
    super(scene, lampPosX, lampPosY, sprite );
    this.scene = scene;
    this.human = human;
    this.ghost=ghost;
    this.lampPosX = lampPosX;
    this.lampPosY=lampPosY;
    this.lampGroup=lampGroup;
    this.soundlight= scene.sound.add('light');
    this.scene.add.existing(this);
    this.scene.physics.add.existing(this);
    this.isOn = false;
    //this.depth = -5;
    this.light=null;
  }
  

  SelectObject()
  {
    if(this.isOn) return;
    this.setTexture('lampSelected');
  }
  DeselectObject() 
  {
    if(this.isOn) return;
    this.setTexture('lampDefault');
    this.scale = 1;
  }

  Interact()
  {
    
    if(!this.isOn)//si no esta encendida
    {
      if(this.light == null)
      {
        this.soundlight.play();
        let radius=30;
        this.light = new Lights(this.scene, this.scene.humanPlayer, this.scene.ghostPlayer, this.scene.lights, this.lampPosX-radius, this.lampPosY-radius, radius);
        
      }
      else
      {
        this.soundlight.play();
        this.light.setActive(false);
      }
    }
    else //Esta encendida
    {
      this.soundlight.play();
      this.light.setActive(true);
      //this.body.setActive(false);
    }
    this.isOn = !this.isOn;
  }
}  