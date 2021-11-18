/**
 
 * @extends Phaser.GameObjects.Sprite
 */
 export default class Lamp extends Phaser.GameObjects.Sprite {
  
    /**
   * Constructor de la Plataforma
   * @param {Phaser.Scene} scene Escena a la que pertenece la plataforma
   * @param {Player} player Jugador del juego
   * @param {Phaser.GameObjects.Group} lampGroup Grupo en el que se incluirá la base creada por la plataforma
   * @param {number} x Coordenada x
   * @param {number} y Coordenada y
   */
  constructor(scene, player, lampGroup, x, y) {
    super(scene, x, y, 'lampDesact');
    this.scene.add.existing(this);
    this.scene.physics.add.existing(this, true);
    this.scene.physics.add.collider(this, player);
    //SelectLamp();
  }
  

  SelectObject()
  {
    if(encend) return;
    this.scale = 1.05;
    //this.setTexture('lampAct');
  }
  DeselectObject() 
  {
    if(encend) return;
    this.setTexture('lampDesact');
    this.scale = 1;
  }

  Interact()
  {
    encend = !encend;
    this.setTexture('lampEnc');
    if(encend) console.log("Activo");
    else console.log("Inactivo");
  }
}
let encend = false;
  