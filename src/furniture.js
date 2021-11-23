export default class Furniture extends Phaser.GameObjects.Sprite {
  
    /**
   * Constructor de la Plataforma
   * @param {Phaser.Scene} scene Escena a la que pertenece la plataforma
   * @param {Phaser.GameObjects.Group} furnitureGroup Grupo en el que se incluirán los muebles
   * @param {number} x Coordenada x
   * @param {number} y Coordenada y
   */
  constructor(scene, ghostPlayer,furnitureGroup , x, y, canBePossessed) 
  {
    super(scene, x, y, 'furniture');

    this.scene.add.existing(this);
    this.scene.physics.add.existing(this, true);
    this.scene.physics.add.collider(this, ghostPlayer);
    this.isPossesed = false;
    //this.canBePossessed=true; OBJETO INTELIGENTE
    furnitureGroup.add(this);
  }
  

  SelectObject()
  {
    if(this.isPossesed) return;
    this.scale = 1.05;
    this.setTexture('furnitureSelected');
  }

  DeselectObject()
  {
    if(this.isPossesed) return;
    this.scale = 1;
    this.setTexture('furniture');
    //this.scene.ghostPlayer.alpha = 1;
  }

  Interact(playerBody)
  {
    this.isPossesed = !this.isPossesed;
    this.setTexture('furniturePossesed');
    this.scene.ghostPlayer.PossessObject(this);
    //this.scene.ghostPlayer.alpha=0;
  }
}