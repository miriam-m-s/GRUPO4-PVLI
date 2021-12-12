export default class Window extends Phaser.GameObjects.Sprite {

    /**
   * Constructor de la Plataforma
   * @param {Phaser.Scene} scene Escena a la que pertenece la plataforma
   * @param {Phaser.GameObjects.Group} furnitureGroup Grupo en el que se incluirán los muebles
   * @param {number} x Coordenada x
   * @param {number} y Coordenada y
   */
  constructor(scene , x, y, rayAngle, mirrorDetector,d,s) 
  {
    super(scene, x, y, 'window');
    this.setScale(0.19);
    this.scene.add.existing(this);
    this.scene.physics.add.existing(this, true);
    //this.scene.physics.add.collider(this, ghostPlayer);
    //this.canBePossessed=true; OBJETO INTELIGENTE
    //furnitureGroup.add(this);

   // this.rayLight = new Line(scene, 0, 100, 0, 100);
 
  this.s=s;
   this.staticObstacles =this.s;
    this.d=d;
this.dynamicObstacles = this.d;
this.raycaster = this.scene.plugins.get('rexraycasterplugin').add()
    .addObstacle(this.staticObstacles)
    .addObstacle(this.dynamicObstacles)

this.debugGraphics = this.scene.add.graphics();
this.scene.data
    .set('startX', x)
    .set('startY', y)


  

   this.mirrorDetector = mirrorDetector;


   this.pivot = new Phaser.Geom.Point(this.body.x + this.width/2,
        this.body.y + this.height);


    //this.debugGraphics = this.add.graphics();


   


        this.x = x; this.y = y;

      if (rayAngle === 90) rayAngle = 4.71;

       else if (rayAngle === 180) rayAngle = Math.PI;

         else if (rayAngle === 270) rayAngle = 1.57;


        this.rayAngle = rayAngle;

        this.scene = scene;
  }

  preUpdate(t,dt) 
  {
    super.preUpdate(t,dt);
    this.raycaster.updateObstacle(this.dynamicObstacles);

    
    var x = this.scene.data.get('startX'),
        y = this.scene.data.get('startY'),
        angle = this.rayAngle;
    RunRaycaster(this.raycaster,
        x, y, angle,
        this.debugGraphics,this.mirrorDetector
    );

    //this.scene.DoRaycast(this.x, this.y, this.rayAngle, this.mirrorDetector,this.raycaster);
  }
}

var RunRaycaster = function (raycaster, x, y, angle, debugGraphics,mirrorDetector) {
  debugGraphics
      .clear()
      .fillStyle(0xC4C400)
      .fillCircle(x, y, 10);

  const MaxReflectionCount = 1000;
  for (var i = 0; i < MaxReflectionCount; i++) {
      var result = raycaster.rayToward(x, y, angle);
      debugGraphics
          .lineStyle(2, 0x840000)
          .strokeLineShape(raycaster.ray);
          mirrorDetector.setPosition(result.x, result.y);

          break; 
  }
}