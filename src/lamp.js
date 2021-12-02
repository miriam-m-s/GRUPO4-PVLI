/**
 
 * @extends Phaser.GameObjects.Sprite
 */
 export default class Lamp extends Phaser.GameObjects.Sprite {
  
    /**
   * Constructor de la Plataforma
   * @param {bool} isOn esta encendida? comienza apagada por defecto
   * @param {Object} lightCircle circulo de luz
   */
  
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
      //this.body.setActive(false);
    }
    this.isOn = !this.isOn;
  }
}  