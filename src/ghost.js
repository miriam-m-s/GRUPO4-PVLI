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
  
  constructor(scene, x, y) 
  {
    super(scene, x, y, 'ghostPlayer',false);
    this.anims.play("_idleGhost");
    //Keyboard Input
    this.cursorsPlayer = this.scene.input.keyboard.createCursorKeys();
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