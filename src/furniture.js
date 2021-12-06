export default class Furniture extends Phaser.GameObjects.Sprite {
  
    /**
   * Constructor de la Plataforma
   * @param {Phaser.Scene} scene Escena a la que pertenece la plataforma
   * @param {Phaser.GameObjects.Group} furnitureGroup Grupo en el que se incluirán los muebles
   */
  constructor(scene, ghostPlayer, furnitureGroup , initialPos) 
  {
    super(scene, ghostPlayer, furnitureGroup, initialPos);
    
    this.scene = scene;
    this.player = ghostPlayer;
    this.furniturePos = initialPos;
    this.possesion= scene.sound.add('possesion');
    this.scene.add.existing(this);
    this.body = this.scene.physics.add.sprite(this.furniturePos.x, this.furniturePos.y, 'furniture');
    this.isPossesed = false;

    //this.debugIndicator = this.scene.physics.add.sprite(this.body.x, this.body.y, 'debugIndic');
  }
  

  SelectObject()
  {
    if(this.isPossesed) return;
    this.scale = 1.05;
    this.body.setTexture('furnitureSelected');
  }

  DeselectObject() 
  {
    if(this.isPossesed) return;
    this.scale = 1;
    this.body.setTexture('furniture');
  }

  Interact()
  {
    this.possesion.play();
    this.isPossesed = !this.isPossesed;
    this.body.setTexture('furniturePossesed');
    this.body.depth = 3;
    
    this.scene.ghostPlayer.PossessObject(this);
  }
}