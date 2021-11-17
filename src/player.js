//import Star from './star.js';
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
   * 
   * @param {boolean} onLight Indica si el personaje esta en la luz o no
   */

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
    //this.label = this.scene.add.text(10, 10, "");
    this.cursors = this.scene.input.keyboard.createCursorKeys();
    this.space = scene.input.keyboard.addKey('SPACE');
  
   // this.updateCoord();


    this.saveX = x;
    this.saveY = y;

    //this.start(this.positionX ,this.positionY);

    this.space.on('down', () =>
     {     
      this.body.setVelocityX(0);
      this.body.setVelocityY(0);
      this.ChangePlayer();
    });


    // this.startTime = this.getTime();
  }


//   getTime() {
//     //make a new date object
//     let d = new Date();

//     //return the number of milliseconds since 1 January 1970 00:00:00.
//     return d.getTime();
// }



  // saveposition(posX, posY)
  // {
  //  console.log("saveposition");
 
  //  this.saveX = posX;
  //  this.saveY = posY;
 
  //   console.log("saveX = " + this.saveX);
  //   console.log("saveY = " +this.saveY);
  // }

  // updateCounter() {

  // }
//  start(){
   
//  this.scene.time.addEvent( {
//   delay: 1000, 
//   callback: this.saveposition,
//   args: [this.body.x],
//   callbackScope: false,
//   loop: true
//   });
//   //let timedEvent = this.time.delayedCall(3000, onEvent, [], this);
//  // scene.time.events.add(Phaser.Timer.SECOND * 4, this.onEvent, scene);
//  }
 
  setBeingControlled() {
    this.beingControlled = !this.beingControlled;
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

  /**
   * Métodos preUpdate de Phaser. En este caso solo se encarga del movimiento del jugador.
   * Como se puede ver, no se tratan las colisiones con las estrellas, ya que estas colisiones 
   * ya son gestionadas por la estrella (no gestionar las colisiones dos veces)
   * @override
   */
  preUpdate(t,dt)
  {
    super.preUpdate(t,dt);
    
   // this.updateCoordEmpty();
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

      // this.updateCoord();
      
      // if (this.playerName == 'player1' && this.body.x >=440 && this.body.x <= 501 && this.body.y >= 398 && this.body.y <= 438) {
      //   this.setPlayerState(true);
      // }
      // else if(this.playerName == 'player2' && this.body.x >= 57 && this.body.x <= 127 && this.body.y >= 104 && this.body.y <= 114){
      //   this.setPlayerState(true);
      // }
      // else{
      //   this.setPlayerState(false);
      // }


      // this.scene.checkEnd();
    }
  }
}