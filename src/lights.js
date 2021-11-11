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
  constructor(scene, player, player2, baseGroup, x, y, radius) {
    super(scene, x, y, 'light', radius);
    this.depth = -1;
    this.setAlpha(.5);
    
    this.scale = radius;
    this.scene.add.existing(this);
    this.scene.physics.add.existing(this, true);

    this.scene.physics.add.overlap(this, player);
    this.scene.physics.add.overlap(this, player2);
  }


  /**
   * Redefinición del preUpdate de Phaser
   * @override
   */
  preUpdate() {
    // IMPORTANTE: Si no ponemos esta instrucción y el sprite está animado
    // no se podrá ejecutar la animación del sprite. 
    super.preUpdate();

    //Array<Phaser.Physics.Arcade.Body> aray = overlapCirc(x, y, true, false);

    // overlapCirc(x, y, true, false);

    if (this.scene.physics.overlap(this.scene.player, this)) {
      // Delegamos en la escena para decidir qué hacer al 
      // haber cogido una estrella
      //console.log("human touxing");

     
      this.scene.player.onLightFunction();
    }

    if (this.scene.physics.overlap(this.scene.player2, this)) {
        // Delegamos en la escena para decidir qué hacer al 
        // haber cogido una estrella
        //console.log("human touxing");
        this.scene.player2.onLightFunction();
    }
    let bodies = this.scene.physics.overlapCirc(this.x, this.y, this.radius, true,false);
    var out = Phaser.Utils.Array.Range(bodies);
    out.forEach(function (e) {
      console.log(e.bodies);
  });
  }
}
