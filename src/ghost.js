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
   * @param {Array<Furniture>} ghostItems lista de muebles
   * @param {Object} itemPossesed objeto que se esta poseyendo
   * * 
   */
  constructor(scene, x, y) {
    super(scene, x, y, 'player1',false);
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
      this.itemPossesed.body.position.x = this.body.position.x;
      this.itemPossesed.body.position.y=this.body.position.y;
      this.itemPossesed.setPosition(this.itemPossesed.body.position.x,this.itemPossesed.body.position.y);
    }
    
  }
  
  PossessObject(objectToPossess)
  {
    
    var tween = this.scene.tweens.add({
      targets: this,
      x: objectToPossess.x,
      y: objectToPossess.y,
      ease: 'Cubic',       // 'Cubic', 'Elastic', 'Bounce', 'Back'
      totalDuration: 500,
      repeat: 0,            // -1: infinity
      yoyo: false,
      onComplete: this.AssignObject(objectToPossess)
  });
  }

  AssignObject(objectToPossess)
  {
    this.itemPossesed=objectToPossess;
    console.log("FINISHED");
  }
}