export default class Window extends Phaser.GameObjects.Sprite {
  
    /**
   * Constructor de la Plataforma
   * @param {Phaser.Scene} scene Escena a la que pertenece la plataforma
   * @param {Phaser.GameObjects.Group} furnitureGroup Grupo en el que se incluirán los muebles
   * @param {number} x Coordenada x
   * @param {number} y Coordenada y
   */
  constructor(scene ,graphics, x, y, raycaster, rayAngle, mirrorDetector) 
  {
    super(scene, x, y, 'window');
    this.setScale(0.19);
    this.scene.add.existing(this);
    this.scene.physics.add.existing(this, true);
    //this.scene.physics.add.collider(this, ghostPlayer);
    //this.canBePossessed=true; OBJETO INTELIGENTE
    //furnitureGroup.add(this);

   // this.rayLight = new Line(scene, 0, 100, 0, 100);


   this.graphics = graphics;

   this.mirrorDetector = mirrorDetector;


   this.pivot = new Phaser.Geom.Point(this.body.x + this.width/2,
        this.body.y + this.height);


    //this.debugGraphics = this.add.graphics();


    this.raycaster = raycaster;
    
  
    this.scene.data
        .set('startX', 500)
        .set('startY', 225)


        this.x = x; this.y = y;
       
      if (rayAngle === 90) rayAngle = 4.71;

       else if (rayAngle === 180) rayAngle = Math.PI;

         else if (rayAngle === 270) rayAngle = 1.57;


        this.rayAngle = rayAngle;

        this.scene = scene;
        this.graphic = this.scene.add.graphics();
       //this.scene.createLightRay(180, 100, 100);


     //scene.createRayLight(this.pivot.x, this.pivot.y);
  }

  preUpdate(t,dt) 
  {
    super.preUpdate(t,dt);

    this.scene.DoRaycast(this.x, this.y, this.rayAngle, this.mirrorDetector,this.graphic);
  }
}