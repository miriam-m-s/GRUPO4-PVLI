import Player from './player.js';
import Furniture from './furniture.js';
/**
 * Clase que representa el jugador del juego. El jugador se mueve por el mundo usando los cursores.
 * También almacena la puntuación o número de estrellas que ha recogido hasta el momento.
 */
export default class Ghost extends Player {
  
  /**@param {Array<Lamp>} mueblesList la lista de lamparas
   * Constructor del jugador
   * @param {Phaser.Scene} scene Escena a la que pertenece el jugador
   * @param {number} x Coordenada X
   * @param {number} y Coordenada Y
   * * @param {number} speed Coordenada Y
   * @param {Array<Furniture>} ghostItems lista de muebles
   * @param {Object} itemPossesed objeto que se esta poseyendo
   * * 
   */
  
  constructor(scene, x, y) 
  {
    super(scene, x, y, 'player1',false);
    this.anims.play("ghostUp");
    this.speed = 50;

    //Keyboard Input
    this.cursors = this.scene.input.keyboard.createCursorKeys();

    this.leftKey = this.scene.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.LEFT);
    this.rightKey = this.scene.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.RIGHT);
    this.upKey = this.scene.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.UP);
    this.downKey = this.scene.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.DOWN);
  }

  preUpdate(t,dt)
  {
    super.preUpdate(t,dt);

    if(this.beingControlled)
    {
      this.CheckForNearestObject(this.ghostItems);

      if (this.cursors.left.isDown)
      {
      	this.body.setVelocity(-this.speed, 0)
      	//this.play('left-walk', true)
      }
      else if (this.cursors.right.isDown)
      {
      	this.body.setVelocity(this.speed, 0)
      	//this.player.play('right-walk', true)
      }
      else if (this.cursors.up.isDown)
      {
      	this.body.setVelocity(0, -this.speed)
      	//this.player.play('up-walk', true)
      }
      else if (this.cursors.down.isDown)
      {
      	this.body.setVelocity(0, this.speed)
      	//this.player.play('down-walk', true)
      }
    }
    if(this.itemPossesed != null)
    {
      this.itemPossesed.body.position = this.body.position;
      this.itemPossesed.setPosition(this.body.position);
    }
  }
  
  PossessObject(objectToPossess)
  {
    var tween = this.scene.tweens.add({
      targets: this,
      x: objectToPossess.x,
      y: objectToPossess.y,
      ease: 'Cubic', 
      totalDuration: 500,
      repeat: 0,            // -1: infinity
      yoyo: false,
      onComplete: this.AssignObject(objectToPossess)
  });
  }

  AssignObject(objectToPossess)
  {
    console.log("FINISHED");
  }
}