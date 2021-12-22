/**
 * @extends Phaser.GameObjects.Sprite
 */
export default class Base extends Phaser.GameObjects.Sprite {

  /** Base es la clase asociada a las bases finales de los jugadores. Se encarga de detectar si el jugador
   * esta posicionados en esta. 
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

  // Acceder a la variable "this.inbase" que indica si el jgador esta en su base.
  isInbase() {
    return this.inbase;
  }

  preUpdate() {
    super.preUpdate();
    this.inbase = false;

    //Comprueba si hay solapamiento entre el jugador y la base
    if (this.scene.physics.overlap(this.player, this)) {
      this.inbase = true;
    }
  }
}