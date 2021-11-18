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
        //this.CheckForNearestObject(this.ghostItems);
    }
    
  }
}