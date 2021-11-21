import Lamp from './lamp.js';
/**
 * Clase que representa el jugador del juego. El jugador se mueve por el mundo usando los cursores.
 * También almacena la puntuación o número de estrellas que ha recogido hasta el momento.
 */

export default class Player extends Phaser.GameObjects.Sprite {
  
  /** 
   * Constructor del jugador
   * 
   * @param {GameObject} selectedObject el objeto mas cercano seleccionable
   * @param {Array<GameObject>} objectList lista de objetos interactuables
   * @param {Phaser.Scene} scene Escena a la que pertenece el jugador
   * @param {Phaser.Math.Vector2} playerPos vector posicion del jugador
    * @param {string} playerName nombre del jugador Humano/Ghost
    * @param {boolean} beingControlled esta siendo controlado?
    * @param {number} secCounter
   */
  
   constructor(scene, x, y, beingControlled) 
   {
    super(scene, x, y);
    
    //Parametros
    this.playerPos = new Phaser.Math.Vector2(x,y);
    this.beingControlled = beingControlled; //comienza el humano
    this.objectList = null;
    this.selectedObject = null;
    //this.coord = this.scene.add.text(200, 10, "")
    
    this.score = 0;

    this.scene.add.existing(this);
    this.scene.physics.add.existing(this);
    //this.body.setBodySize(16, 16, true);

    // Queremos que el jugador no se salga de los límites del mundo
    this.body.setCollideWorldBounds();
    this.speed = 50;
    // Esta label es la UI en la que pondremos la puntuación del jugador
    //this.label = this.scene.add.text(10, 10, "");

    //Cursores
    this.cursorsPlayer = this.scene.input.keyboard.createCursorKeys();
    this.space = scene.input.keyboard.addKey('SPACE');
    this.eKey = scene.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.E);
    this.runKey = scene.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SHIFT);
    this.start();
    //this.updateScore();
    //this.updateCoord();     

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
      //Llama al metodo Interact del objeto seleccionado
       if(this.selectedObject != null)
       {
        this.selectedObject.Interact(this.body);
       }
    }); 
    //Correr cuando se mantenga pulsado Shift
    this.runKey.on('down', () =>
     {     
      this.speed = 100;
    }); 
    this.runKey.on('up', () =>
     {     
      this.speed = 50;
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

  /*updateCoord() {
    this.coord.text = 'Player at base: ' + this.playerState;
  }*/

  /*updateCoordEmpty(){
    this.coord.text = 'Player at base:                                                 ';
  }*/

  ChangePlayer()
  {
    this.beingControlled = !this.beingControlled;
  }

  /*updateScore() {
    this.label.text = 'Score: ' + this.score;
  }*/
  
  preUpdate(t,dt) 
  {
    if(!this.beingControlled) return;
    super.preUpdate(t,dt);
    

    //MOVEMENT
    //Calculamos la velocidad
    let [velX, velY] = this.calculateVelocity();

    //Aplicamos la velocidad al cuerpo
    this.body.setVelocity(velX, velY);

    //Reproducimos la animación que corresponda
    this.changeAnims(velX, velY);

    //RESTO
    //this.updateCoordEmpty();
    //this.updateCoord();

    if (this.playerName == 'Ghost' && this.body.x >=440 && this.body.x <= 501 && this.body.y >= 398 && this.body.y <= 438) {
        this.setPlayerState(true);
    }
    else if(this.playerName == 'Human' && this.body.x >= 57 && this.body.x <= 127 && this.body.y >= 104 && this.body.y <= 114){
        this.setPlayerState(true);
    }
    else{
        this.setPlayerState(false);
    }
    this.scene.checkEnd();
  }

  //Calculo de velocidad con respecto a input
  calculateVelocity() {
    let [velX, velY] = [0, 0];
    
    if (this.cursorsPlayer.up.isDown) { //arriba
        velY -= this.speed;
    }
    if (this.cursorsPlayer.down.isDown) { //abajo
        velY += this.speed;
    }
    if (this.cursorsPlayer.left.isDown) { //izquierda
        velX -= this.speed;
    }
    if (this.cursorsPlayer.right.isDown) { //derecha
        velX += this.speed;
    }

    //Normalizamos el vector
    if (velX != 0 && velY != 0) {
        velX /= Math.sqrt(2);
        velY /= Math.sqrt(2)
    }
    
    //devolvemos velocidad
    return [velX, velY];
}

//cambio de animacion con respecto a la velocidad
changeAnims(velX, velY) 
{
 if (velX === 0) 
 {
     if (velY === 0) //quieto
         this.anims.play('_idle' + this.playerName, true);
     else if (velY < 0) //arriba
         this.anims.play('_up' + this.playerName, true);
     else //abajo
         this.anims.play('_down' + this.playerName , true);
 }
 else if (velX < 0) //izquierda
     this.anims.play('_left' + this.playerName, true);
 else //derecha
     this.anims.play('_right' + this.playerName, true);
}

   CheckForNearestObject(objetos)
   { 
     this.objectList = objetos;
     var disOffset = 60;
    
     //Checkeo si sigo suficietemente cerca del objeto que estaba seleccionando anteriormente
     if(this.selectedObject != null)
     {
       let distanceBetween = Phaser.Math.Distance.Between(this.body.x,this.body.y, this.selectedObject.body.x, this.selectedObject.body.y);
       if(distanceBetween > disOffset)
       {
         this.selectedObject.DeselectObject();
         this.selectedObject = null;
       }
     }
  
     //Para cada objeto interaccionable en la escena, compruebo la distancia al jugador
     for(let i = 0; i < this.objectList.length; i++)
     {
       let distanceBetween = Phaser.Math.Distance.Between(this.body.x,this.body.y, this.objectList[i].body.x, this.objectList[i].body.y);
       if(distanceBetween < disOffset) //el objeto se encuentra en rango
       {
         //Se deselecciona el objeto anterior
         if(this.selectedObject != null) this.selectedObject.DeselectObject();
         //Se asigna el nuevo objeto mas cercano posible
         this.selectedObject = this.objectList[i];
       }
     }
     //Se selecciona el objeto mas cercano, si existe
    if(this.selectedObject != null) this.selectedObject.SelectObject();
   }
}
