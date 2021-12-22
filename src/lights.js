/**
 * @extends Phaser.GameObjects.Sprite
 */
export default class Lights extends Phaser.GameObjects.Sprite {

  /**
   * Constructor de Light: crea una luz en la cual el fantasma no puede entrar y de la que el humano no 
   * puede salir.
   * @param {Phaser.Scene} scene Escena a la que pertenece la plataforma
   * @param {Player} humanPlayer Jugador humano
   * @param {Player} ghostPlayer Jugador ghost
   * @param {number} x Coordenada x
   * @param {number} y Coordenada y
   * @param {number} radius Coordenada y
   * @param {bool} isCandleLight boleano que dice si es la luz de una vela
   * @param {bool} isLampLight boleano que dice si es la luz de una lampara
   */
  constructor(scene, humanPlayer, ghostPlayer, x, y, radius, isCandleLight, isLampLight) {
    super(scene, x, y, 'light', radius);

    this.posX = x;
    this.posY = y;

    this.setAlpha(.2);
    this.depth = 1;

    this.setOrigin(0);
    this.scene.add.existing(this);
    this.scene.physics.add.existing(this, true);

    this.radius = radius;
    this.human = humanPlayer;

    this.scene.physics.add.collider(this, this.scene.ghostPlayer);
    this.scene.physics.add.overlap(this, this.scene.humanPlayer);

    this.isCandleLight = isCandleLight;
    this.isLampLight = isLampLight;

    this.isLampOn = false;

    // Si es una luz creada por una vela, encenderse lentamente
    if (isCandleLight || isLampLight) {
      this.body.setCircle(1);
      this.scale = 0;
      this.body.scale = 0;

      // Para que crezca desde el centro
      this.setOrigin(.5);
      this.x += this.radius; // Posicionar el sprite del circulo en mitad de la vela
      this.y += this.radius;
      } 
      else {
      this.body.setCircle(radius);
      this.scale = ((radius - 1) / 1000);
      this.body.scale *= 0.5;
    }
    this.lightScale = 1;
  }

  LampClicked(newState) {
    this.isLampOn = newState;
  }

  /**
   * Redefinición del preUpdate de Phaser
   * @override
   */
  preUpdate(t, dt) {
    super.preUpdate(t, dt);
    if (this.scene.physics.overlap(this.scene.humanPlayer, this)) {
      this.scene.humanPlayer.onLightFunction(this.body.x + this.radius,
        this.body.y + this.radius);
    }

    if (this.isCandleLight) {
      if (this.lightScale < this.radius) {
        // Increase collider
        this.lightScale += .07 * dt;
        this.scale = ((this.lightScale - 1) / 1000);

        this.lightVariable = this.lightScale / 100;
        
        this.body.x = -this.lightScale + this.posX + this.radius;
        this.body.y = -this.lightScale + this.posY + this.radius;
      }
      this.body.setCircle(this.lightScale);

    } else if (this.isLampLight) {

      if (this.isLampOn && this.lightScale < this.radius) {
        // Increase collider
        this.lightScale += .07 *dt;
        this.scale = ((this.lightScale - 1) / 1000); 

        this.lightVariable = this.lightScale / 100;
        
        this.body.x = -this.lightScale + this.posX + this.radius;
        this.body.y = -this.lightScale + this.posY + this.radius;
      } else if (!this.isLampOn && this.lightScale >= 0) {
        this.lightScale -= .07 * dt;
        if (this.lightScale < 0) this.lightScale
        this.scale = ((this.lightScale - 1) / 1000);

        this.lightVariable = this.lightScale / 100;
        
        this.body.x = -this.lightScale + this.posX + this.radius;
        this.body.y = -this.lightScale + this.posY + this.radius;
      }
      this.body.setCircle(this.lightScale);
    }
  }
}