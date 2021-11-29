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
  
  constructor(scene, playerPos, playerName, beingControlled,humanItems) 
  {
    super(scene, playerPos, playerName, beingControlled, humanItems);
    this.humanItems = humanItems;
    //this.position = playerPos;

    this.onLight = true;
  
    this.saveX = 0;
    this.saveY = 0;
  }


  onLightFunction(x, y) {

    this.onLight = true;
    this.saveX = x;
    this.saveY = y;
  }

  preUpdate(t,dt)
  {
    super.preUpdate(t,dt);

    console.log("this.onLight = " + this.onLight);

    // Check Lights
    if (!this.onLight) 
    {
      console.log("GO TO LIGHT");
      this.body.setPosition(this.saveX, this.saveY);
    }
    this.onLight = false;
    if(this.beingControlled)
    {
        this.CheckForNearestObject(this.humanItems);
    }
    
    if(this.beingControlled)
    {
      this.CheckForNearestObject(this.humanItems);
    }  
  }
}