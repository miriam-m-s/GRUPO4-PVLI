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
  

  SelectFurniture()
  {
    if(active) return;
    this.scale = 1.05;
    //this.setTexture('lampAct');
  }
  DeselectFurniture() 
  {
    if(active) return;
    this.scale = 1;
  }

  UseLamp()
  {
    active = !active;
    console.log("Move");
  }
}
let active = false;