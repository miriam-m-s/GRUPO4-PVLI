export default class Furniture extends Phaser.GameObjects.Sprite {

  /**
   * Constructor de la Plataforma
   * @param {Phaser.Scene} scene Escena a la que pertenece la plataformas
   */
  constructor(scene, ghostPlayer, x, y) {
    super(scene, x, y, 'furniture');

    // SetUp variables
    this.scene = scene;
    this.player = ghostPlayer;
    this.depth = 4;

    // Fisicas
    this.scene.add.existing(this);
    this.scene.physics.add.existing(this);

    // variables de furniture
    this.isPossesed = false;
  }

  RayDetect() {
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
    this.scene.ghostPlayer.PossessObject(this);
  }
}