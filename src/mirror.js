/**
 * @extends Phaser.GameObjects.Sprite
 */

export default class Mirror extends Phaser.GameObjects.Sprite {
  /**Clase Mirror que recibe rayos de luz y los refleja dependiendo 
    de la direccion que tenga asignada
   * @param {Phaser.Scene} scene Escena a la que pertenece el espejo
   * @param {number} x Coordenada x
   * @param {number} y Coordenada y
   * @param {number} dir Direccion en la que se creara el nuevo rayo de luz
   */
  constructor(scene, x, y, dir) {
    super(scene, x, y, 'mirrorDefault');

    // SetUp variables
    this.scene = scene;
    this.x = x;
    this.y = y;
    this.depth = 5;

    // Fisicas
    this.scene.add.existing(this);
    this.scene.physics.add.existing(this);
    this.body.setSize(18, 25, false);

    // Variables de Mirror
    this.inLight = false;
    this.graphic1 = this.scene.add.graphics();
    this.xOffset = 0;
    this.yOffset = 0;
    this.degreeDir = dir;
    this.x = x;
    this.y = y;

    //Convierte de grados a radianes
    if (dir == 0) this.xOffset = (this.width / 2) - 6;
    else if (dir === 90) {
      dir = 4.71;
      this.yOffset = (-this.height / 2) + 3;
    } else if (dir === 180) {
      dir = Math.PI;
      this.xOffset = (-this.width / 2) + 6;
    } else if (dir === 270) {
      dir = 1.57;
      this.yOffset = (this.height / 2) - 3;
    }
    this.dir = dir;

    this.setTexture('mirror_Unsel_' + this.degreeDir);
  }

  SelectObject() {
    if (this.isPossesed) return;
    this.setTexture('mirror_Sel_' + this.degreeDir);
  }

  RayDetect() {
    //si el rayo toca el mirror se activa el booleano para crear otro rayo
    this.inLight = true;
  }

  DeselectObject() {
    if (this.isPossesed) return;
    this.setTexture('mirror_Unsel_' + this.degreeDir);
  }

  Interact() {
    this.isPossesed = !this.isPossesed;
    this.setTexture('mirror_Pos_' + this.degreeDir);
    this.body.depth = 5;

    this.scene.ghostPlayer.PossessObject(this);
  }

  createRay(angles, posx, posy) {
    //creacion del rayo
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

  drawRay(ray, intersection) {
    //dibuja el rayo
    this.graphic1.clear();
    this.graphic1.lineStyle(2, 0xFF7E00, 2);
    let line = new Phaser.Geom.Line(ray.origin.x, ray.origin.y, intersection.x, intersection.y);
    this.graphic1.depth = 5;
    this.graphic1.alpha = 0.2;
    this.graphic1.strokeLineShape(line);
  }

  preUpdate(t, dt) {
    super.preUpdate(t, dt);

    if (this.inLight) {
      //si un rayo le toca ,crea un rayo
      this.ray = this.createRay(this.dir, this.x + this.xOffset, this.y + this.yOffset);
      let intersection = this.ray.cast();
      this.drawRay(this.ray, intersection);
      if (intersection.object != null) {
        intersection.object.RayDetect();
      }
    } else {
      //si no toca un rayo al espejo no se crea el raycast
      this.graphic1.clear();
    }
    this.inLight = false;
  }
}