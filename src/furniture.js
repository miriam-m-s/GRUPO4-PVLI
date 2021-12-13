export default class Furniture extends Phaser.GameObjects.Sprite {
<<<<<<< HEAD

  /**
=======
  
    /**
>>>>>>> VisualsRevamp
   * Constructor de la Plataforma
   * @param {Phaser.Scene} scene Escena a la que pertenece la plataforma
   * @param {Phaser.GameObjects.Group} furnitureGroup Grupo en el que se incluirán los muebles
   */
<<<<<<< HEAD
  constructor(scene, ghostPlayer, furnitureGroup, x, y, sprite) {
    super(scene, x, y, sprite);

    this.scene = scene;
    this.player = ghostPlayer;


    this.scene.add.existing(this);
    this.scene.physics.add.existing(this);

=======
  constructor(scene, ghostPlayer, furnitureGroup , initialPos) 
  {
    super(scene, ghostPlayer, furnitureGroup, initialPos);
    
    this.scene = scene;
    this.player = ghostPlayer;
    this.furniturePos = initialPos;

    this.scene.add.existing(this);
    this.body = this.scene.physics.add.sprite(this.furniturePos.x, this.furniturePos.y, 'furniture');
>>>>>>> VisualsRevamp
    this.isPossesed = false;

    //this.debugIndicator = this.scene.physics.add.sprite(this.body.x, this.body.y, 'debugIndic');
  }
<<<<<<< HEAD
  Mirrordetect() {
    console.log("soy furniture");
  }

  SelectObject() {
    if (this.isPossesed) return;
    this.scale = 1.05;
    this.setTexture('furnitureSelected');
  }

  DeselectObject() {
    if (this.isPossesed) return;
    this.scale = 1;
    this.setTexture('furniture');
  }

  Interact() {

    this.isPossesed = !this.isPossesed;
    this.setTexture('furniturePossesed');
    this.body.depth = 3;

=======
  

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
    this.isPossesed = !this.isPossesed;
    this.body.setTexture('furniturePossesed');
    this.body.depth = 3;
    
>>>>>>> VisualsRevamp
    this.scene.ghostPlayer.PossessObject(this);
  }
}