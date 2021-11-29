/**
 
 * @extends Phaser.GameObjects.Sprite
 */
 export default class Mirror extends Phaser.GameObjects.Sprite {
  
    /**
   * Constructor de la Plataforma
   * @param {Penis} penis penis
   */
  
    constructor(scene, player, lampGroup, lampPos) 
    {
    super(scene, player, lampGroup, lampPos);
    this.scene = scene;
    this.player = player;
    this.lampPos = lampPos;

    this.scene.add.existing(this);
    this.body = this.scene.physics.add.sprite(this.lampPos.x, this.lampPos.y, 'mirrorDefault');
    this.isOn = false;
    this.depth = -5;
  }
  

  SelectObject()
  {
    if(this.isOn) return;
    //this.scale = 1.085;
    this.body.setTexture('mirrorSelected');
  }
  DeselectObject() 
  {
    if(this.isOn) return;
    this.body.setTexture('mirrorDefault');
    this.scale = 1;
  }

  Interact()
  {
    this.body.setTexture('mirrorDefault');
    this.body.rotation += 45;
  }
}  