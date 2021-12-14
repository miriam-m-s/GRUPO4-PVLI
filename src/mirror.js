import MirrorDetector from "./mirrordtect.js";
export default class Mirror extends Phaser.GameObjects.Sprite {

  /**
   * Constructor de la Plataforma
   * @param {Phaser.Scene} scene Escena a la que pertenece la plataforma
   * @param {Phaser.GameObjects.Group} furnitureGroup Grupo en el que se incluirán los muebles
   * @param {number} x Coordenada x
   * @param {number} y Coordenada y
   */
  constructor(scene, furnitureGroup, x, y, dir) {
    super(scene, x, y, 'mirrorDefault');



    this.scene.add.existing(this);
    this.scene.physics.add.existing(this);

    furnitureGroup.add(this);

    this.scene = scene;
    this.x = x;
    this.y = y;

    this.mirrorDetectors = null;

    this.inLight = false;
    this.graphic1 = this.scene.add.graphics();
    this.xOffset = 0;
    this.yOffset = 0;

    if (dir == 0) this.xOffset = this.width / 2;
    else if (dir === 90) {
      dir = 4.71;
      this.yOffset = -this.height / 2;
    } else if (dir === 180) {
      dir = Math.PI;
      this.xOffset = -this.width / 2;
    } else if (dir === 270) {
      dir = 1.57;
      this.yOffset = this.height / 2;
    }
    this.x = x;
    this.y = y;
    this.dir = dir;
  }
  SelectObject() {
    if (this.isPossesed) return;
    this.scale = 1.05;
    this.setTexture('mirrorSelected');
  }
  Mirrordetect() {
    console.log("soy espejo");
    // if (this.mirrorDetectors == null)
    //   this.mirrorDetectors = new MirrorDetector(this.scene, this.x, this.y);
     this.inLight = true;
  }
  DeselectObject() {
    if (this.isPossesed) return;
    this.scale = 1;
    this.setTexture('mirrorDefault');
  }

  Interact() {
    this.isPossesed = !this.isPossesed;
    this.setTexture('mirrorPossessed');
    this.body.depth = 3;

    this.scene.ghostPlayer.PossessObject(this);
  }
  createRay(angles){

    let ray = this.scene.raycaster.createRay({
      origin: {
        x: this.x+ this.xOffset+1,
        y: this.y+this.yOffset+1
      },
      angle: angles,
      detectionRange: 1000
    });

    return ray
  }
  drawRay(ray, intersection){

    this.graphic1.clear();
    this.graphic1.lineStyle(1, 0xfffff, 2);
    let line = new Phaser.Geom.Line(ray.origin.x, ray.origin.y, intersection.x, intersection.y);
    this.graphic1.fillPoint(ray.origin.x, ray.origin.y, 3)
    this.graphic1.strokeLineShape(line);
  }
  preUpdate(t, dt) {
    super.preUpdate(t, dt);
  
    if(this.inLight){
    
      this.ray=this.createRay(this.dir);
      let intersection = this.ray.cast();
      this.drawRay(this.ray,intersection);
      if(intersection.object!=null){
        intersection.object.Mirrordetect();
      }
    }
    this.inLight = false;
  }
}