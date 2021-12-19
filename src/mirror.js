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
    this.body.setSize(18, 25, false);
    furnitureGroup.add(this);

    this.scene = scene;
    this.x = x;
    this.y = y;

    this.mirrorDetectors = null;

    this.inLight = false;
    this.graphic1 = this.scene.add.graphics();
    this.xOffset = 0;
    this.yOffset = 0;

    this.degreeDir = dir;

    if (dir == 0) this.xOffset =( this.width / 2)-6;
    else if (dir === 90) {
      dir = 4.71;
      this.yOffset = (-this.height / 2)+3;
    } else if (dir === 180) {
      dir = Math.PI;
      this.xOffset = (-this.width / 2)+6;
    } else if (dir === 270) {
      dir = 1.57;
      this.yOffset = (this.height / 2)-3;
    }
    this.x = x;
    this.y = y;
    this.dir = dir;


    this.setTexture('mirror_Unsel_' + this.degreeDir);
  }
  
  SelectObject() {
    if (this.isPossesed) return;
    this.scale = 1.05;
    this.setTexture('mirror_Sel_' + this.degreeDir);
  }
  Mirrordetect() {
    // if (this.mirrorDetectors == null)
    //   this.mirrorDetectors = new MirrorDetector(this.scene, this.x, this.y);
     this.inLight = true;
  }
  DeselectObject() {
    if (this.isPossesed) return;
    this.scale = 1;
    this.setTexture('mirror_Unsel_' + this.degreeDir);
  }

  Interact() {
    this.isPossesed = !this.isPossesed;
    this.setTexture('mirror_Pos_' + this.degreeDir);
    this.body.depth = 3;

    this.scene.ghostPlayer.PossessObject(this);
  }
  createRay(angles,posx,posy){

    let ray = this.scene.raycaster.createRay({
      origin: {
        x: posx,
        y: posy,
      },
      angle: angles,
      detectionRange: 100
    });

    return ray
  }
  drawRay(ray, intersection){

    this.graphic1.clear();
    this.graphic1.lineStyle(1, 0xffffb2, 2);
    let line = new Phaser.Geom.Line(ray.origin.x, ray.origin.y, intersection.x, intersection.y);
    this.graphic1.strokeLineShape(line);
  }
  preUpdate(t, dt) {
    super.preUpdate(t, dt);
  
    if(this.inLight){
    
      this.ray=this.createRay(this.dir,this.x+this.xOffset,this.y+ this.yOffset);
      let intersection = this.ray.cast();
      this.drawRay(this.ray,intersection);
      if(intersection.object!=null){
        intersection.object.Mirrordetect();
      }
    }
    else{
      this.graphic1.clear();
    }
    this.inLight = false;
  }
}