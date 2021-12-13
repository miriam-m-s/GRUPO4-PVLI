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

  constructor(scene, playerPosX, playerPosY, beingControlled, humanItems) {
    super(scene, playerPosX, playerPosY, 'Humansel', 'Human', beingControlled, humanItems);
    this.humanItems = humanItems;
    this.anims.play('_up' + this.playerName, false);

    this.onLight = true;

    this.saveX = 0;
    this.saveY = 0;
  }
  Mirrordetect() {
    console.log("soy human");
  }

  onLightFunction(x, y) {

    this.onLight = true;
    this.saveX = x;
    this.saveY = y;
  }

  preUpdate(t, dt) {

    super.preUpdate(t, dt);

    // Check Lights
    if (!this.onLight) {
      // this.body.setPosition(this.saveX, this.saveY);

      // tween animation
      var tween = this.scene.tweens.add({
        targets: this,
        x: this.saveX,
        y: this.saveY,
        ease: 'Cubic',
        duration: 1000,
        yoyo: false,
        //onComplete: this.AllowMovement()
      });
    }

    this.onLight = false;

    if (this.beingControlled) {
      this.CheckForNearestObject(this.humanItems);
    }

  }
}