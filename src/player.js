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
  
   constructor(scene, initialPos, initialName, startController) 
   {
    
    super(scene, initialPos, initialName, startController);
    
    //Asignar Parametros
    this.scene = scene;
    this.playerPos = initialPos; //donde comienza el jugador en la escena
    this.playerName = initialName; //Ghost / Human
    this.beingControlled = startController; //comenzamos controlando al fantasma
 
    //Litas/Objetos
    this.objectList = null;
    this.selectedObject = null;
    
    
    this.scene.add.existing(this);
    //FISICAS
    this.body = this.scene.physics.add.sprite(this.playerPos.x, this.playerPos.y, this.playerName + 'SpriteSheet');
    this.body.setCollideWorldBounds();
    this.speed = 50;

    //Cursores
    this.cursorsPlayer = this.scene.input.keyboard.createCursorKeys();
    this.space = scene.input.keyboard.addKey('SPACE');
    this.eKey = scene.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.E);
    this.runKey = scene.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SHIFT);
    this.start();
    this.depth = 3;

  //Cambiar personajes con Espacio
    this.space.on('down', () =>
     {     
        this.body.stop();//para la animacion actual
        this.body.setVelocity(0);
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


  start()
  {
    this.scene.time.addEvent( {
    delay: 3000, 
    callback: this.saveposition,
    callbackScope: false,
    loop: true
    });
  }

  setBeingControlled() {
    
    this.beingControlled = !this.beingControlled;
  }

  ChangePlayer()
  {
    this.beingControlled = !this.beingControlled;
  }
  
  preUpdate(t,dt) 
  {
    if(!this.beingControlled) return;

    super.preUpdate(t,dt);

    //Calculamos la velocidad
    let [velX, velY] = this.calculateVelocity();

    //Movimiento del personaje
    this.body.setVelocity(velX, velY);

    //Animacion de spritesheet para cada personaje
    this.changeAnims(velX, velY);

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

//Animacion dependiendo del movimiento/input usuaro
changeAnims(velX, velY) 
{
 if (velX === 0) 
 {
     if (velY === 0) //quieto
         this.body.play('_idle' + this.playerName, true);
     else if (velY < 0) //arriba
         this.body.play('_up' + this.playerName, true);
     else //abajo
         this.body.play('_down' + this.playerName , true);
 }
 else if (velX < 0) //izquierda
     this.body.play('_left' + this.playerName, true);
 else //derecha
     this.body.play('_right' + this.playerName, true);
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
