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
    this.body = this.scene.physics.add.sprite(this.lampPos.x, this.lampPos.y, 'lamp01');
    this.isOn = false;
    this.depth = -5;
  }
  

  SelectObject()
  {
    if(this.isOn) return;
    //this.scale = 1.085;
    this.body.setTexture('lamp02');
  }
  DeselectObject() 
  {
    if(this.isOn) return;
    this.body.setTexture('lamp01');
    this.scale = 1;
  }

  Interact()
  {
    
    this.body.setTexture('lamp01');
    if(!this.isOn)//si no esta encendida
    {
      if(this.lightCircle == null)
      {
        this.lightCircle = this.scene.physics.add.sprite(this.lampPos.x, this.lampPos.y, 'lightCircleBig');
        this.lightCircle.setCircle(this.lightCircle.width/2);//collider ajustado al sprite
        this.lightCircle.depth = 2;
      }
      else
      {
        //this.lightCircle.sprite.setActive(true);
      }
    }
    else //Esta encendida
    {
      //this.lightCircle.sprite.setActive(false);
    }
    this.isOn = !this.isOn;
  }
}  