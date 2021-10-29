import Star from './star.js';
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
   */
  
   constructor(scene, x, y, player, beingControlled) 
   {
    super(scene, x, y, player);
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
    this.space = scene.input.keyboard.addKey('SPACE')
    
    this.updateScore();    
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
    
    this.space.on('down', () =>
     {     
      this.body.setVelocityX(0);
      this.body.setVelocityY(0);
      this.ChangePlayer();
    }); 
    

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
    }
  }
  
}
