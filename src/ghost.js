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
   * * 
   */
  
  constructor(scene, playerPos, playerName, beingControlled) 
  {
    super(scene, playerPos, playerName, beingControlled);

    this.anims.play('_idle' + this.playerName, true);
  }

  preUpdate(t,dt)
  {
    super.preUpdate(t,dt);

    if(this.beingControlled)
    {
      this.CheckForNearestObject(this.ghostItems);
    }

    if(this.itemPossesed != null)
    {
      //this.itemPossesed.body.position = this.body.position;
      //this.itemPossesed.body.setPosition(this.body.position.x, this.body.position.y);
    }
  }
  
 
  PossessObject(objectToPossess)
  {
    var tween = this.scene.tweens.add({
      targets: this.body,
      x: objectToPossess.x,
      y: objectToPossess.y,
      ease: 'Cubic', 
      duration: 500,
      yoyo: false,
      onComplete: this.AssignObject(objectToPossess)
  });
  }

  AssignObject(objectToPossess)
  {
    console.log("FINISHED");
    this.itemPossesed = objectToPossess;
  }
}