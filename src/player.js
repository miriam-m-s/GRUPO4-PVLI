import Lamp from './lamp.js';
/**
 * Clase que representa el jugador del juego. El jugador se mueve por el mundo usando los cursores.
 * También almacena la puntuación o número de estrellas que ha recogido hasta el momento.
 */
 var objectTween;
export default class Player extends Phaser.GameObjects.Sprite {
  
  /**
   * Constructor del jugador
   * @param {Array<Lamp>} humanItems la lista de lamparas
   * * @param {Array<Furniture>} ghostItems lista de muebles
   * @param {GameObject} selectedObject el objeto mas cercano seleccionable
   * @param {GameObject} activeObject el objeto mas cercano seleccionable
   * @param {Phaser.Scene} scene Escena a la que pertenece el jugador
   * @param {number} x Coordenada X
   * @param {number} y Coordenada Y
    * @param {string} player
    * @param {boolean} beingControlled
    * @param {number} secCounter
    * @param {number} saveX Coordenada X
   * @param {number} saveY Coordenada Y
   * @param {number} startTime Coordenada Y
   
   */
  
  
   constructor(scene, x, y, player, beingControlled) 
   {
    super(scene, x, y, player);
    //Parametros

    this.selectedObject = null;
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
    this.eKey = scene.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.A);
    this.start();
    this.updateScore();
    this.updateCoord();     

      //Cambiar personajes con Espacio
    this.space.on('down', () =>
     {     
      this.body.setVelocityX(0);
      this.body.setVelocityY(0);
      this.ChangePlayer();
    }); 

    this.eKey.on('down', () =>
     {     
       if(!this.beingControlled) return;
       
       if(this.selectedObject != null)
       {
        this.activeObject = this.selectedObject;
        this.activeObject.Interact();
       }
    }); 
  }


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
    
    let playerPos = new Phaser.Math.Vector2(this.body.position.x, this.body.position.y);
   // this.startTime = this.getTime();
    this.updateCoordEmpty();
    if(!this.beingControlled) return;
    this.CheckForNearestObject();
    /*if(this.activeObject != null)
    {
      this.activeObject.body.position = this.body.position * dt;
      this.activeObject.setX(this.x) * dt;
      this.activeObject.setY(this.y) * dt;
    }*/

    if (this.cursors.left.isDown) 
    {
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

  CheckForNearestObject(objectList)
  { 
    let playerPos = new Phaser.Math.Vector2(this.body.position.x, this.body.position.y);
    var disOffset = 100;
    
    //Checkeo si sigo suficietemente cerca del objeto que estaba seleccionando anteriormente
    if(this.selectedObject !=  null)
    {
      let distanceBetween = Phaser.Math.Distance.Between(this.body.x,this.body.y, this.selectedObject.body.x, this.selectedObject.body.y);
      if(distanceBetween > disOffset)
      {
        this.selectedObject.DeselectObject();
        this.selectedObject = null;
      }
    }
    
    //Para cada objeto interaccionable en la escena, compruebo la distancia al jugador
    for(let i = 0; i < 3; i++)
    {
      let distanceBetween = Phaser.Math.Distance.Between(this.body.x,this.body.y, this.humanItems[i].body.x, this.humanItems[i].body.y);
      if(distanceBetween < disOffset) //el objeto se encuentra en rango
      {
        //Se deselecciona el objeto anterior
        if(this.selectedObject != null) this.selectedObject.DeselectObject();
        //Se asigna el nuevo objeto mas cercano posible
        //if(this.selectedObject != this.humanItems[i])
        
        this.selectedObject = this.humanItems[i];
        this.selectedObject.SelectObject();
      }
    }
  }
}
