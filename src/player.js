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
   * @param {Array<GameObject>} objectList lista de objetos
   * @param {Phaser.Scene} scene Escena a la que pertenece el jugador
   * @param {Phaser.Math.Vector2} playerPos
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
    this.playerPos = new Phaser.Math.Vector2(x,y);
    this.objectList= null;
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
    // Esta label es la UI en la que pondremos la puntuación del jugador
    this.label = this.scene.add.text(10, 10, "");
    this.cursors = this.scene.input.keyboard.createCursorKeys();

    //Cursores
    this.cursors = this.scene.input.keyboard.createCursorKeys();
    this.space = scene.input.keyboard.addKey('SPACE');
    this.eKey = scene.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.A);
    this.start();
    this.updateScore();  

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
    
    if(!this.beingControlled) return;
    let playerPos = new Phaser.Math.Vector2(this.body.position.x, this.body.position.y);
    
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
  }

   CheckForNearestObject(objetos)
   { 
     this.objectList = objetos;
     var disOffset = 100;
    
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
     for(let i = 0; i < this.objectList.children.entries.length; i++)
     {
       let distanceBetween = Phaser.Math.Distance.Between(this.body.x,this.body.y, this.objectList.children.entries[i].body.x, this.objectList.children.entries[i].body.y);
       if(distanceBetween < disOffset) //el objeto se encuentra en rango
       {
         //Se deselecciona el objeto anterior
         if(this.selectedObject != null) this.selectedObject.DeselectObject();
         //Se asigna el nuevo objeto mas cercano posible
         this.selectedObject = this.objectList.children.entries[i];
       }
     }
     //Se selecciona el objeto mas cercano, si existe
    if(this.selectedObject != null) this.selectedObject.SelectObject();
   }
}
