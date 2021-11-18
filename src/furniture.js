export default class Furniture extends Phaser.GameObjects.Sprite {
  
    /**
   * Constructor de la Plataforma
   * @param {Phaser.Scene} scene Escena a la que pertenece la plataforma
   * @param {Player} player Jugador del juego
   * @param {Phaser.GameObjects.Group} furnitureGroup Grupo en el que se incluirán los muebles
   * @param {number} x Coordenada x
   * @param {number} y Coordenada y
   */
  constructor(scene, player,furnitureGroup , x, y) {
    super(scene, x, y, 'furniture');
    this.scene.add.existing(this);
    this.scene.physics.add.existing(this, true);
    this.scene.physics.add.collider(this, player);
    //SelectLamp();
  }
  

  SelectObject()
  {
    if(active) return;
    this.scale = 1.05;
    //this.setTexture('lampAct');
  }
  DeselectObject() 
  {
    if(active) return;
    this.scale = 1;
  }

  Interact()
  {
    active = !active;
    if(active) console.log("Activo");
    else console.log("Inactivo");
  }
}
let active = false;