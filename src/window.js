
export default class Window extends Phaser.GameObjects.Sprite {

  /**
   * Constructor de la Plataforma
   * @param {Phaser.Scene} scene Escena a la que pertenece la plataforma
   * @param {number} x Coordenada x
   * @param {number} y Coordenada y
   * @param {number} rayAngle direccion del rayo
   */
  constructor(scene, x, y, rayAngle) {
    super(scene, x, y, 'window');
    this.setScale(0.19);
    this.scene.add.existing(this);
    this.scene.physics.add.existing(this);
    this.graphic = this.scene.add.graphics();

    if (rayAngle === 90) rayAngle = 4.71;
    else if (rayAngle === 180) rayAngle = Math.PI;
    else if (rayAngle === 270) rayAngle = 1.57;
    this.rayAngle = rayAngle;
    this.scene = scene;
   
  }
  createRay(angles){

    let ray = this.scene.raycaster.createRay({
      origin: {
        x: this.x,
        y: this.y
      },
      angle: angles,
      detectionRange: 100
    });

    return ray
  }
  drawRay(ray, intersection){
    //dibujar un rayo
    this.graphic.clear();
    this.graphic.lineStyle(2, 0xFF7E00, 2);
    let line = new Phaser.Geom.Line(ray.origin.x, ray.origin.y, intersection.x, intersection.y);
    this.graphic.depth = 5;
    this.graphic.alpha = 0.2;
    this.graphic.strokeLineShape(line);
  }

  preUpdate(t, dt) {
    super.preUpdate(t, dt);
    this.ray=this.createRay(this.rayAngle);
    let intersection = this.ray.cast();
    this.drawRay(this.ray,intersection);
    if(intersection.object!=null){
      //si un objeto se interseca con el rayo llama al MirrorDetect()del objeto 
      intersection.object.RayDetect();
    }
    
    
  }
}