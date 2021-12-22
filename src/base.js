/**
 * Clase que representa las plataformas que aparecen en el escenario de juego.
 * Cada plataforma es responsable de crear la base que aparece sobre ella y en la 
 * que, durante el juego, puede aparecer una estrella
 */
export default class Base extends Phaser.GameObjects.Sprite {

  /**
   * @param {Phaser.Scene} scene escena a la que pertenece la base
   * @param {Player} player jugador asociado a la base
   * @param {string} texture nombre del sprite de la base
   * @param {number} x Coordenada x 
   * @param {number} y Coordenada y
   */

  constructor(scene, player, texture, x, y) {
    super(scene, x, y, texture);

    // Fisicas
    this.scene.physics.add.overlap(this, player);
    this.scene.add.existing(this);
    this.scene.physics.add.existing(this);

    this.player = player; //jugador
    this.depth = 4;
    this.inbase = false; // Inicializacion del boolenao a false
  }

  // Acceder a la variable "this.inbase"
  isInbase() {
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