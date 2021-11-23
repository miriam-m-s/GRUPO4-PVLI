/**
 
 * @extends Phaser.GameObjects.Sprite
 */
 import Light from './lights.js';
 export default class Lamp extends Phaser.GameObjects.Sprite {
  
    /**
   * Constructor de la Plataforma
   * @param {Phaser.Scene} scene Escena a la que pertenece la plataforma
   * @param {Player} player Jugador del juego
   * @param {Phaser.GameObjects.Group} lampGroup Grupo en el que se incluirá la base creada por la plataforma
   * @param {number} x Coordenada x
   * @param {number} y Coordenada y
   */
  constructor(scene, player, lampGroup, x, y, canBePossesed) {
    super(scene, x, y, 'lampDesact');
    this.scene.add.existing(this);
    this.scene.physics.add.existing(this, true);
    this.scene.physics.add.collider(this, player);
    this.isOn = false;
    this.canBePossesed=false;
    lampGroup.add(this);
    let createLight=false;
    let destroyLight=false;
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
    this.destroyLight=true;
  }

  Interact()
  {
    this.isOn = true;
    this.scale = 1;
    this.setTexture('lampEnc');
    this.createLight=true;
    this.lightUp();

  }
  lightUp()
  {
    if(this.newLight == null)
    {
      this.newLight = this.scene.physics.add.sprite(this.x, this.y, 'player2');
      this.newLight.body.setCircle(50);
    }
    else
    {
      //SETACTIVAR Y TAL
    }
  }
}  