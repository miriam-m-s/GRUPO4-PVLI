/**
 * @extends Phaser.GameObjects.Sprite
 */
export default class Furniture extends Phaser.GameObjects.Sprite {


  /**Furniture es la clase con la que se crean los muebles de la escena. Solo el fantasma 
   * puede interactuar con estos objetos y al hacerlo los puede controlar cambiando asi su
   * posicion al moverse por el nivel. 
  
   * @param {Phaser.Scene} scene Escena 
   * @param {int} x coordenada inicial x del mueble
   * @param {int} y coordenada incial y del mueble
   */
  constructor(scene, x, y) {
    super(scene, x, y, 'furniture');

    //Asignacion de la escena
    this.scene = scene;

    //Asignacion de profundidad
    this.depth = 4;

    // Fisicas
    this.scene.add.existing(this);
    this.scene.physics.add.existing(this);

    // variable que indica si el mueble esta siendo poseido 
    this.isPossesed = false;
  }

  //Metodo de deteccion de rayo explicado en el script window.js
  RayDetect() {
    //cuando un rayo detecta al furniture no hace nada, el mueble interrumpe su paso
  }

  //Se selecciona el objeto y se cambia su sprite
  SelectObject() {
    if (this.isPossesed) return;
    this.scale = 1.05;
    this.setTexture('furnitureSelected');
  }

  //Metodo analogo al de la seleccion del objeto
  DeselectObject() {
    if (this.isPossesed) return;
    this.scale = 1;
    this.setTexture('furniture');
  }

  //Al interactuar (una vez pulsada la tecla 'E') se ejecuta el metodo de posesion del objeto
  Interact() {
    this.isPossesed = !this.isPossesed;
    this.setTexture('furniturePossesed');
    this.scene.ghostPlayer.PossessObject(this);
  }
}