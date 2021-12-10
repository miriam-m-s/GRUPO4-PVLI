export default class Mirror extends Phaser.GameObjects.Sprite {

    /**
   * Constructor de la Plataforma
   * @param {Phaser.Scene} scene Escena a la que pertenece la plataforma
   * @param {Phaser.GameObjects.Group} furnitureGroup Grupo en el que se incluirán los muebles
   * @param {number} x Coordenada x
   * @param {number} y Coordenada y
   */
  constructor(scene, ghostPlayer,furnitureGroup , x, y, dir, mirrorDetector) 
  {
    super(scene, x, y, 'mirrorDefault');

 

    this.scene.add.existing(this);
    this.scene.physics.add.existing(this);
    this.scene.physics.add.collider(this, ghostPlayer);
    //this.canBePossessed=true; OBJETO INTELIGENTE
    furnitureGroup.add(this);

    this.mirrorDetector = mirrorDetector;

    this.scene.physics.add.overlap(this, this.mirrorDetector);


    this.xOffset = 0;
    this.yOffset = 0;

    if (dir == 0) this.xOffset = 50;

    if (dir === 90) {
        dir = 4.71;
        this.yOffset = -50;
    }

    else if (dir === 180) {
        dir = Math.PI;
        this.xOffset = -50;
    }

    else if (dir === 270) {
        dir = 1.57;
        this.yOffset = 50;
    }

    this.dir = dir;
  }


  preUpdate(t,dt) 
  {
    super.preUpdate(t,dt);

    if (this.scene.physics.overlap(this, this.mirrorDetector)) {

        //this.scene.DoRaycast(this.x + this.xOffset, this.y + this.yOffset, this.dir, this.mirrorDetector);

        //this.scene.DoRaycast(100, 100, 90, this.mirrorDetector);

        console.log(this.x + " " + this.y);

        this.scene.DoRaycast(this.x, this.y + 100, 45, this.mirrorDetector);
    }
  }
}