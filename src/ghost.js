import Player from './player.js';
import Furniture from './furniture.js';
/**
 * Clase que representa el jugador del juego. El jugador se mueve por el mundo usando los cursores.
 * También almacena la puntuación o número de estrellas que ha recogido hasta el momento.
 */
export default class Ghost extends Player {
<<<<<<< HEAD

=======
  
>>>>>>> VisualsRevamp
  /**@param {Array<Lamp>} mueblesList la lista de lamparas
   * @param {Phaser.Scene} scene Escena a la que pertenece el jugador
   * @param {Array<Furniture>} ghostItems lista de muebles
   * @param {Object} itemPossesed objeto que se esta poseyendo
   * @param {bool} shouldMoveItem deberia de mover el objeto poseido
<<<<<<< HEAD
   * * 
   */

  constructor(scene, playerPosX, playerPosY, beingControlled, ghostItems) {
    super(scene, playerPosX, playerPosY, 'Ghostsel', 'Ghost', beingControlled, ghostItems);

    this.shouldMoveItem = false;
    this.ghostItems = ghostItems;
    this.possesion = scene.sound.add('possesion');


  }

  preUpdate(t, dt) {
    super.preUpdate(t, dt);
    if (this.beingControlled) {
      this.CheckForNearestObject(this.ghostItems);
    }
    if (this.itemPossesed != null && this.shouldMoveItem) {
      //this.possesion.play();
      this.itemPossesed.setPosition(this.body.x, this.body.y);
      this.setAlpha(0);
      //this.itemPossesed.setPosition(this.body.position);
      //this.itemPossesed.body.setPosition(this.body.position.x, this.body.position.y);
    }
    // Touch rayLight

  }
  Mirrordetect() {
    console.log("soy fantasma");
  }
  PossessObject(objectToPossess) {
    if (this.AssignObject(objectToPossess)) {
      var tween = this.scene.tweens.add({
        targets: this.body,
        x: this.itemPossesed.body.x,
        y: this.itemPossesed.body.y,
        ease: 'Cubic',
        duration: 500,
        yoyo: false,
        onComplete: this.AllowMovement()
      });
    }
  }

  AllowMovement() {

    this.shouldMoveItem = true;
    //console.log(this.shouldMoveItem);
  }

  AssignObject(objectToPossess) {
    if (!this.scene.levelPaused()) {
      if (this.itemPossesed == null) {
        this.possesion.play();
        this.itemPossesed = objectToPossess;

        return true;

      } else {
        this.possesion.play();
        this.setAlpha(1);
        this.itemPossesed = null;
      }
      return false;
    }

=======
   */
  
  constructor(scene, playerPos, playerName, beingControlled, ghostItems) 
  {
    super(scene, playerPos, playerName, beingControlled, ghostItems);

    this.shouldMoveItem = false;
    this.ghostItems = ghostItems;
    this.anims.play('_idle' + this.playerName, true);
    this.numeroX = 3;
    this.body.depth = 5;
    //SHADOW BENEATH GHOST
    this.shadowBeneath = this.scene.add.sprite(this.playerPos.x, this.playerPos.y + 10, 'shadowBeneath');
    this.shadowBeneath.scale = 0.3;
    this.shadowBeneath.depth = 0;
    this.shadowOffset = 0;
    this.lastPlayerY = this.body.y;
  }

  preUpdate(t,dt)
  {
    super.preUpdate(t,dt);
    this.shadowBeneath.setPosition(this.body.x, this.body.y + 10 - this.shadowOffset);
    this.shadowOffset = (Math.sin(t / 500) * 0.1);
    if(this.shouldIdle())
    {
      this.body.y += this.shadowOffset;
    }
    
    if(this.beingControlled)
    {
      this.CheckForNearestObject(this.ghostItems);
    }
    if(this.itemPossesed != null && this.shouldMoveItem)
    {
      this.itemPossesed.body.x = this.body.x;
      this.itemPossesed.body.y = this.body.y;
    }
  }

  shouldIdle() 
  {
    //Si no se está moviendo
    if(!this.beingControlled) return true;
    if (this.cursorsPlayer.down.isDown || this.cursorsPlayer.up.isDown 
      || this.cursorsPlayer.left.isDown || this.cursorsPlayer.right.isDown) 
    { 
      return false;
    }
    else return true;
}
  
  PossessObject(objectToPossess)
  {
    if(this.AssignObject(objectToPossess))
    {
      this.itemPossesed.body.depth = 100;
      this.shouldMoveItem = true;
      //this.AllowMovement();
      /*var tween = this.scene.tweens.add({
        targets: this.itemPossesed.body,
        x:  this.body.x,
        y:  this.body.y,
        ease: 'Cubic', 
        duration: 500,
        yoyo: false,
        onComplete: this.AllowMovement
    });*/
    }
  }

  AllowMovement()
  {
    this.shouldMoveItem = true;
  }

  AssignObject(objectToPossess)
  {
    if(this.itemPossesed == null)
    {
      this.itemPossesed = objectToPossess; return true;
    }
    else this.itemPossesed = null;
    return false;
>>>>>>> VisualsRevamp
  }
}