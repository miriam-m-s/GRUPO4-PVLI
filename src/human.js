import Player from './player.js';
import Lamp from './lamp.js';
/**
 * Clase que representa el jugador del juego. El jugador se mueve por el mundo usando los cursores.
 * También almacena la puntuación o número de estrellas que ha recogido hasta el momento.
 */
export default class Human extends Player {
  
  /**
   * Constructor del jugador
   * @param {Phaser.Scene} scene Escena a la que pertenece el jugador
   * @param {Array<Lamp>} humanItems la lista de lamparas
   */
  
  constructor(scene, playerPos, playerName, beingControlled) 
  {
    super(scene, playerPos, playerName, beingControlled);
    //this.position = playerPos;
  }

  preUpdate(t,dt)
  {
    super.preUpdate(t,dt);
    /*if (!this.onLight) 
    {
      this.setPosition(this.saveX, this.saveY);
   
    }
    this.onLight = false;
    */
  }
}