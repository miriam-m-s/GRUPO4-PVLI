import Player from './player.js';
import Furniture from './furniture.js';
/**
 * Clase que representa el jugador del juego. El jugador se mueve por el mundo usando los cursores.
 * También almacena la puntuación o número de estrellas que ha recogido hasta el momento.
 */
export default class Ghost extends Player {
  
  /**@param {Array<Lamp>} mueblesList la lista de lamparas
   * @param {Phaser.Scene} scene Escena a la que pertenece el jugador
   * @param {Array<Furniture>} ghostItems lista de muebles
   * @param {Object} itemPossesed objeto que se esta poseyendo
   * @param {bool} shouldMoveItem deberia de mover el objeto poseido
   * * 
   */
  
  constructor(scene, playerPos, playerName, beingControlled, ghostItems) 
  {
    super(scene, playerPos, playerName, beingControlled, ghostItems);

    this.shouldMoveItem = false;
    this.ghostItems = ghostItems;
    this.anims.play('_idle' + this.playerName, true);
  }

  preUpdate(t,dt)
  {
    super.preUpdate(t,dt);

    if(this.beingControlled)
    {
      this.CheckForNearestObject(this.ghostItems);
    }
    if(this.itemPossesed != null && this.shouldMoveItem)
    {
      this.itemPossesed.body.setPosition(this.body.x, this.body.y);
      //this.itemPossesed.setPosition(this.body.position);
      //this.itemPossesed.body.setPosition(this.body.position.x, this.body.position.y);
    }
  }
  
  PossessObject(objectToPossess)
  {
    if(this.AssignObject(objectToPossess))
    {
      var tween = this.scene.tweens.add({
        targets: this.body,
        x:  this.itemPossesed.body.x,
        y:  this.itemPossesed.body.y,
        ease: 'Cubic', 
        duration: 500,
        yoyo: false,
        onComplete: this.AllowMovement()
    });
    }
  }

  AllowMovement()
  {
    this.shouldMoveItem = true;
    console.log(this.shouldMoveItem);
  }

  AssignObject(objectToPossess)
  {
    if(this.itemPossesed == null)
    {
      this.itemPossesed = objectToPossess; return true;
    }
    else this.itemPossesed = null;
    return false;
  }
}