import Star from './star.js';
import Platform from './platform.js';
/**
 * Clase que representa el jugador del juego. El jugador se mueve por el mundo usando los cursores.
 * También almacena la puntuación o número de estrellas que ha recogido hasta el momento.
 */

export default class Player extends Phaser.GameObjects.Sprite {
  
  /**
   * Constructor del jugador
   * @param {Phaser.Scene} scene Escena a la que pertenece el jugador
   * @param {number} x Coordenada X
   * @param {number} y Coordenada Y
    * @param {string} player
    * @param {boolean} beingControlled
    * @param {number} secCounter
    * @param {number} saveX Coordenada X
   * @param {number} saveY Coordenada Y
   * @param {Phaser.GameObjects.Group} grupo de plataformas
   * @param {number} startTime Coordenada Y
   */
  grupo=this.scene.bases;
   constructor(scene, x, y, player, beingControlled) 
   {
    super(scene, x, y, player);
    this.playerName = player;
    this.coord = this.scene.add.text(200, 10, "")

    this.beingControlled = beingControlled;
    this.score = 0;
    this.scene.add.existing(this);
    this.scene.physics.add.existing(this);
    // Queremos que el jugador no se salga de los límites del mundo
    this.body.setCollideWorldBounds();
    this.speed = 300;
    this.jumpSpeed = -400;
    // Esta label es la UI en la que pondremos la puntuación del jugador
    this.label = this.scene.add.text(10, 10, "");
    this.cursors = this.scene.input.keyboard.createCursorKeys();

    this.cursors = this.scene.input.keyboard.createCursorKeys();
    this.space = scene.input.keyboard.addKey('SPACE');
    this.start();
    this.updateScore();
    this.updateCoord();     

    this.space.on('down', () =>
     {     
      this.body.setVelocityX(0);
      this.body.setVelocityY(0);
      this.ChangePlayer();
    }); 
  }

  // updateCounter() {

  // }
 start(){
 this.scene.time.addEvent( {
  delay: 3000, 
  callback: this.saveposition,
  callbackScope: false,
  loop: true
  });
  //let timedEvent = this.time.delayedCall(3000, onEvent, [], this);
 // scene.time.events.add(Phaser.Timer.SECOND * 4, this.onEvent, scene);
 }


 saveposition()
 {
     //console.log("hey");
 }
  setBeingControlled() {
    this.beingControlled = !this.beingControlled;
  }

  /**
   * El jugador ha recogido una estrella por lo que este método añade un punto y
   * actualiza la UI con la puntuación actual.
   */
  point() {
    this.score++;
    this.updateScore();
  }

  setPlayerState(state) {
    this.playerState = state;
  }

  updateCoord() {
    this.coord.text = 'Player at base: ' + this.playerState;
  }

  updateCoordEmpty(){
    this.coord.text = 'Player at base:                                                 ';
  }

  ChangePlayer()
  {
    this.beingControlled = !this.beingControlled;
  }
  
  /**
   * Actualiza la UI con la puntuación actual
   */
  updateScore() {
    this.label.text = 'Score: ' + this.score;
  }

  SavePositiom(){
    
  }
  /**
   * Métodos preUpdate de Phaser. En este caso solo se encarga del movimiento del jugador.
   * Como se puede ver, no se tratan las colisiones con las estrellas, ya que estas colisiones 
   * ya son gestionadas por la estrella (no gestionar las colisiones dos veces)
   * @override
   */
  preUpdate(t,dt) 
  {
    super.preUpdate(t,dt);
   
    
   // this.startTime = this.getTime();
    //console.log(this.startTime);
    //this.CheckForNearestObject();
    //console.log(this.scene.abc);
    this.updateCoordEmpty();
    if (this.beingControlled) {
      if (this.cursors.left.isDown) {
        this.body.flipX=true;
        this.body.setVelocityX(-this.speed);
      }
      else if (this.cursors.right.isDown) {
        this.body.setVelocityX(this.speed);
      }
      else if(this.cursors.up.isDown){
        this.body.setVelocityY(-this.speed);
      }
      else if(this.cursors.down.isDown){
        this.body.setVelocityY(this.speed);
      }
      else {
        this.body.setVelocityX(0);
        this.body.setVelocityY(0);
      }
      this.updateCoord();
      if (this.playerName == 'player1' && this.body.x >=440 && this.body.x <= 501 && this.body.y >= 398 && this.body.y <= 438) {
        this.setPlayerState(true);
      }
      else if(this.playerName == 'player2' && this.body.x >= 57 && this.body.x <= 127 && this.body.y >= 104 && this.body.y <= 114){
        this.setPlayerState(true);
      }
      else{
        this.setPlayerState(false);
      }
      this.scene.checkEnd();
    }
  }

  // CheckForNearestObject()
  // {
  //   var playerPos = new Vector2(this.x, this.y);
  //   var minDistance = new Vector2(Mathf.Infinity);
  //   var nearestObj = null;
  //   var disOffset = 5.0;

  //   objectsInLevel = [];//Get from scene

  //   /*Compueba la distancia de cada objeto al jugador, y se queda con el mas cercano si
  //   esta dentro del offset*/
  //   foreach(item in objectsInLevel)
  //   {
  //     var distanceBetween = new Vector2(item.x, item.y) - playerPos;
  //     if(distanceBetween < minDistance && distanceBetween > disOffset)
  //     {
  //       minDistance = distanceBetween;
  //       nearestObj = item;
  //     }
  //   }
  // }
}
