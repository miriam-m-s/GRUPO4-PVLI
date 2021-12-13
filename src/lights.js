//import Base from "./base";

export default class Lights extends Phaser.GameObjects.Sprite {

  /**
   * Constructor de la Plataforma
   * @param {Phaser.Scene} scene Escena a la que pertenece la plataforma
   * @param {Player} player Jugador del juego
   * @param {Player} player2 Jugador del juego
   * @param {Phaser.GameObjects.Group} baseGroup Grupo en el que se incluirá la base creada por la plataforma
   * @param {number} x Coordenada x
   * @param {number} y Coordenada y
   * @param {number} radius Coordenada y
   */
  constructor(scene, humanPlayer, ghostPlayer, baseGroup, x, y, radius) {
    super(scene, x, y, 'light', radius);
    this.depth = 0;
    this.setAlpha(.2);

    this.setOrigin(0);
    this.scene.add.existing(this);
    this.scene.physics.add.existing(this, true);

    this.radius = radius;
    this.human = humanPlayer;
    this.body.setCircle(radius);

    this.scale = ((radius - 3) / 1000);

    this.scene.physics.add.collider(this, ghostPlayer);
    this.scene.physics.add.overlap(this, this.human);

    this.body.scale *= 0.5;
  }


  /**
   * Redefinición del preUpdate de Phaser
   * @override
   */
  preUpdate() {
    super.preUpdate();
    if (this.scene.physics.overlap(this.human, this)) {
      this.human.onLightFunction(this.body.x + this.radius,
        this.body.y + this.radius);
    }
  }
}