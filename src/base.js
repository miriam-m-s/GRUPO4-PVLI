/**
 * Clase que representa las plataformas que aparecen en el escenario de juego.
 * Cada plataforma es responsable de crear la base que aparece sobre ella y en la 
 * que, durante el juego, puede aparecer una estrella
 */
export default class Base extends Phaser.GameObjects.Sprite {

  /**
   * Constructor de la Plataforma4
   * @param {Phaser.Scene} scene Escena a la que pertenece la plataforma
   * @param {Player} player Jugador del juego
   * @param {Phaser.GameObjects.Group} baseGroup Grupo en el que se incluirá la base creada por la plataforma
   * @param {number} x Coordenada x
   * @param {number} y Coordenada y
   */

  constructor(scene, player, texture, x, y) {
    super(scene, x, y, texture);
    this.scene.add.existing(this);
    this.scene.physics.add.existing(this);

    this.player = player;
    this.depth = 4;

    this.scene.physics.add.overlap(this, player);
    this.inbase = false;
  }
  ininbase() {
    return this.inbase;
  }
  /**
   * Redefinición del preUpdate de Phaser
   * @override
   */
  preUpdate() {
    super.preUpdate();
    this.inbase = false;
    if (this.scene.physics.overlap(this.player, this)) {
      this.inbase = true;
    }
  }
}