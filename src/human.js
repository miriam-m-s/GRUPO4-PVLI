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
  }

  preUpdate(t,dt)
  {
    super.preUpdate(t,dt);
<<<<<<< Updated upstream
    if(this.beingControlled)
    {
      this.CheckForNearestObject(this.humanItems);
    }   
=======

    // Check Lights
    //console.log(this.onLight);
    if (!this.onLight) 
    {
     // this.body.setPosition(this.saveX, this.saveY);

      // tween animation
      var tween = this.scene.tweens.add({
        targets: this.body,
        x:  this.saveX,
        y:  this.saveY,
        ease: 'Cubic', 
        duration: 1000,
        yoyo: false,
        //onComplete: this.AllowMovement()
    });
    }

    if(this.beingControlled)
    this.CheckForNearestObject(this.humanItems);
>>>>>>> Stashed changes
  }
}