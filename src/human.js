import Player from './player.js';
import Lamp from './lamp.js';
/**
 * Clase que representa el jugador del juego. El jugador se mueve por el mundo usando los cursores.
 * También almacena la puntuación o número de estrellas que ha recogido hasta el momento.
 */
export default class Person extends Player {
  
  /**
   * Constructor del jugador
   * @param {Phaser.Scene} scene Escena a la que pertenece el jugador
   * @param {number} x Coordenada X
   * @param {number} y Coordenada Y
   * @param {Array<Lamp>} humanItems la lista de lamparas
   *//**
   * Constructor del jugador
   */
   constructor(scene, x, y) {
    super(scene, x, y, 'player2',true);
    this.onLight = true;
  
    this.saveX = x;
    this.saveY = y;
     
  }
  
  onLightFunction(x, y) {

    console.log("BRUHH");
    this.onLight = true;
    this.saveX = x;
    this.saveY = y;
   
  }
  preUpdate(t,dt)
  {
  
    super.preUpdate(t,dt);
    if (!this.onLight) 
    {
      this.setPosition(this.saveX, this.saveY);
   
    }
    this.onLight = false;

    if(this.beingControlled)
    {
        this.CheckForNearestObject(this.humanItems);

    }
  }
}