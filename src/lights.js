//import Base from "./base";

export default class Lights extends Phaser.GameObjects.Sprite {
  
  /**
   * Constructor de la Plataforma
   * @param {Phaser.Scene} scene Escena a la que pertenece la plataforma
   * @param {Phaser.Math.Vector2} lightPos Posicion de la luz
   * @param {number} radius Coordenada y
   */

  constructor(scene, lightPos, radius) 
  {
    super(scene, lightPos, radius);

    this.scene = scene;
    this.lightPos = lightPos;
    this.radius = radius;
    this.ghostPlayer = scene.ghostPlayer;
    this.humanPlayer = scene.humanPlayer;

    this.body = this.scene.physics.add.sprite(this.lightPos.x, this.lightPos.y, 'lightCircleBig');
    
    this.scale *= this.radius;
    this.body.setCircle(this.body.width/2);//collider ajustado al sprite
    this.depth = 2;
    this.scene.add.existing(this);

    this.scene.physics.add.collider(this.ghostPlayer, this.body);
    //this.scene.physics.add.overlap(this.body, this.humanPlayer.body);
    this.body.immovable = true;
  }

   preUpdate() 
   {
    if (this.scene.physics.overlap(this.humanPlayer.body, this.body)) 
    {
      console.log("OVERLAP");
      //this.humanPlayer.onLightFunction(this.body.x + this.radius, this.body.y + this.radius);
    }
    else console.log("NOT OVERLAP");
  }
}
