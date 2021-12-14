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
  constructor(scene, humanPlayer, ghostPlayer, baseGroup, x, y, radius, isCandleLight) {
    super(scene, x, y, 'light', radius);

    this.posX = x;
    this.posY = y;

    this.setAlpha(.2);


    this.setOrigin(0);
    this.scene.add.existing(this);
    this.scene.physics.add.existing(this, true);

    this.radius = radius;
    this.human = humanPlayer;

    this.scene.physics.add.collider(this, ghostPlayer);
    this.scene.physics.add.overlap(this, this.human);

    this.scene.physics.add.overlap(this, ghostPlayer);

    this.isCandleLight = isCandleLight;

    // Si es una luz creada por una vela, encenderse lentamente
    if (isCandleLight) {
      this.body.setCircle(1);
      this.scale = 0;
      this.body.scale = 0;

      // Para que crezca desde el centro
      this.setOrigin(.5);
      this.x += this.radius; // Posicionar el sprite del circulo en mitad de la vela
      this.y += this.radius;
    } else {
      this.body.setCircle(radius);
      this.scale = ((radius - 3) / 1000); 
      this.body.scale *= 0.5;
    }
    this.lightScale = 1;

    // Si cuando se crea la luz el fantasma esta cerca, reiniciar el fantasma
    if (this.scene.physics.overlap(ghostPlayer, this)) {
      this.scene.ResetLevel();
    }
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

    // if (this.isCandleLight) {
    //   this.scene.tweens.add({
    //     targets     : [ this ],
    //     scaleX: this.radius/ 100,
    //     scaleY: this.radius / 100,
    //     ease        : 'Linear',
    //     duration    : 100000,
    //     yoyo        : false,
    //     repeat      : 0,
    //     callbackScope   : this
    //   });
    // }
    

    if (this.isCandleLight) {
      if (this.lightScale < this.radius) {
        // Increase collider
        this.lightScale += .03;
        this.scale = ((this.lightScale - 3) / 1000); 

        this.lightVariable = this.lightScale / 100;
        
        this.body.x = -this.lightScale + this.posX + this.radius;
        this.body.y = -this.lightScale + this.posY + this.radius;
      }
      this.body.setCircle(this.lightScale);
    }
  }
}