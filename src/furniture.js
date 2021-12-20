export default class Furniture extends Phaser.GameObjects.Sprite {

  /**
   * Constructor de la Plataforma
   * @param {Phaser.Scene} scene Escena a la que pertenece la plataforma
   * @param {Phaser.GameObjects.Group} furnitureGroup Grupo en el que se incluirán los muebles
   */
  constructor(scene, ghostPlayer, furnitureGroup, x, y, sprite) {
    super(scene, x, y, sprite);

    this.scene = scene;
    this.player = ghostPlayer;


    this.scene.add.existing(this);
    this.scene.physics.add.existing(this);

    this.isPossesed = false;
    this.depth = 4;
    
    //this.debugIndicator = this.scene.physics.add.sprite(this.body.x, this.body.y, 'debugIndic');
  }
  Mirrordetect() {
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

    this.scene.ghostPlayer.PossessObject(this);
  }
}