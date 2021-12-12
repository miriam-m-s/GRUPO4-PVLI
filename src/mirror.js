export default class Mirror extends Phaser.GameObjects.Sprite {

    /**
   * Constructor de la Plataforma
   * @param {Phaser.Scene} scene Escena a la que pertenece la plataforma
   * @param {Phaser.GameObjects.Group} furnitureGroup Grupo en el que se incluirán los muebles
   * @param {number} x Coordenada x
   * @param {number} y Coordenada y
   */
  constructor(scene,furnitureGroup , x, y, dir, mirrorDetector,d,s) 
  {
    super(scene, x, y, 'mirrorDefault');

  this.x=x;
  this.y=y;

    this.scene.add.existing(this);
    this.scene.physics.add.existing(this);
   
    //this.canBePossessed=true; OBJETO INTELIGENTE
   // furnitureGroup.add(this);
     
    this.mirrorDetector = mirrorDetector;

    this.scene.physics.add.overlap(this, this.mirrorDetector);


    this.xOffset = 0;
    this.yOffset = 0;

    if (dir == 0) this.xOffset = this.width/2;
    else if (dir === 90) {
        dir = 4.71;
        this.yOffset = -this.height/2;
    }

    else if (dir === 180) {
        dir = Math.PI;
        this.xOffset = -this.width/2;
    }

    else if (dir === 270) {
        dir = 1.57;
        this.yOffset = this.height/2;
    }
    this.Graphics= this.scene.add.graphics();
    this.dir = dir;
    this.s=s;
    this.staticObstacles =this.s;
     this.d=d;
 this.dynamicObstacles = this.d;
 this.raycasters = this.scene.plugins.get('rexraycasterplugin').add()
     .addObstacle(this.dynamicObstacles)

  
  
  }


  preUpdate(t,dt) 
  {
   

    super.preUpdate(t,dt);
    this.raycasters.updateObstacle(this.dynamicObstacles);

    if (this.scene.physics.overlap(this.mirrorDetector, this)) { 
        let angle = this.dir;
        RunRaycaster(this.raycasters,
            this.x+this.xOffset, this.y+this.yOffset, angle,
            this.Graphics,this.mirrorDetector
        );   
   }
   else{
    let angle = this.dir;
    RunRaycaster(this.raycasters,
        1000, 1000, angle,
        this.Graphics,this.mirrorDetector
    );
   }
    
   }
  
}
let RunRaycaster = function (raycaster, x, y, angle, debugGraphics,mirrorDetector) {
    debugGraphics
    .clear()
    .fillStyle(0xC4C400)
    .fillCircle(x, y, 10);

    const MaxReflectionCount = 1000;
    for (let i = 0; i < MaxReflectionCount; i++) {
        let results = raycaster.rayToward(x, y, angle);
        debugGraphics
        
            .lineStyle(2, 0x840000)
            .strokeLineShape(raycaster.ray);
           mirrorDetector.setPosition(results.x, results.y);
            break;

       
    }
}