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
    this.isOn = false;
    //SelectLamp();
  }
  

  SelectObject()
  {
    if(this.isOn) return;
    //this.scale = 1.085;
    this.setTexture('lampAct');
  }
  DeselectObject() 
  {
    if(this.isOn) return;
    this.setTexture('lampDesact');
    this.scale = 1;
  }

  Interact()
  {
    this.isOn = true;
    this.scale = 1;
    this.setTexture('lampEnc');
  }
}  