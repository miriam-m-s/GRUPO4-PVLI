//import Base from "./base";

export default class Lights extends Phaser.GameObjects.Sprite {

  /**
   * Constructor de la Plataforma
   * @param {Phaser.Scene} scene Escena a la que pertenece la plataforma
   * @param {Phaser.Math.Vector2} lightPos Posicion de la luz
   * @param {number} radius Coordenada y
   */
<<<<<<< HEAD
  constructor(scene, humanPlayer, ghostPlayer, baseGroup, x, y, radius) {
    super(scene, x, y, 'light', radius);
    this.depth = 0;
    this.setAlpha(.2);

    this.setOrigin(0);
=======

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
>>>>>>> VisualsRevamp
    this.scene.add.existing(this);

<<<<<<< HEAD
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
=======
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
>>>>>>> VisualsRevamp
    }
    else console.log("NOT OVERLAP");
  }
}