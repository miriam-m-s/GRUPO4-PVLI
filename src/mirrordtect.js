export default class MirrorDetector extends Phaser.GameObjects.Sprite {

  /**
   * Constructor de la Plataforma
   * @param {Phaser.Scene} scene Escena a la que pertenece la plataform
   * @param {number} x Coordenada x
   * @param {number} y Coordenada y
   */
  constructor(scene, x, y) {
    super(scene, x, y, 'mirrordetector');
    this.setScale(2);
    this.scene.add.existing(this);
    this.scene.physics.add.existing(this);
    this.dynamicobjects = this.scene.dynamicObstacles;
    for (let i = 0; i < this.dynamicobjects.length; i++) {
      this.scene.physics.add.overlap(this, this.dynamicobjects[i]);
    }
  }
  preUpdate() {
    super.preUpdate();
    for (let i = 0; i < this.dynamicobjects.length; i++) {
      if (this.scene.physics.overlap(this, this.dynamicobjects[i])) {

        this.dynamicobjects[i].Mirrordetect();
      }
    }

  }
}