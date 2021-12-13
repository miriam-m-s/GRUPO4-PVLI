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

  constructor(scene, initialPosX, initialPosY, initialName, NoSelectedName, startController) {

    super(scene, initialPosX, initialPosY, initialName);

    //Asignar Parametros

    this.scene = scene;
    this.playerPos = new Phaser.Math.Vector2(initialPosX, initialPosY); //donde comienza el jugador en la escena
    this.playerName = initialName;
    this.playerNamenoselect = NoSelectedName;
    //Ghost / Human
    this.beingControlled = startController; //comenzamos controlando al fantasma
    this.soundchange = scene.sound.add('changeplayer');

    //Litas/Objetos
    this.objectList = null;
    this.selectedObject = null;


    this.scene.add.existing(this);
    this.scene.physics.add.existing(this);

    this.body.setSize(15, 20, false);

    //FISICAS
    // this.body = this.scene.physics.add.sprite(this.playerPos.x, this.playerPos.y, this.playerName + 'SpriteSheet');
    this.body.setCollideWorldBounds();
    this.speed = 50;

    //Cursores
    this.cursors = this.scene.input.keyboard.createCursorKeys();
    this.space = scene.input.keyboard.addKey('SPACE');
    this.eKey = scene.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.E);
    this.runKey = scene.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SHIFT);
    //this.start();
    this.depth = 3;

    //DEBUG INDICATOR
    //this.debugIndicator = this.scene.physics.add.sprite(this.body.x, this.body.y, 'debugIndic'); this.debugIndicator.depth = 9999;

    //Cambiar personajes con Espacio
    this.space.on('down', () => {
      //this.body.stop();//para la animacion actual
      this.body.setVelocity(0);
      this.soundchange.play();
      if (this.selectedObject != null) {
        this.selectedObject.DeselectObject();
      }
      this.ChangePlayer();
    });

    this.eKey.on('down', () => {

      if (!this.beingControlled) return;
      //Llama al metodo Interact del objeto seleccionado si no estamos en pausa
      if (!this.scene.levelPaused() && this.selectedObject != null) {

        this.selectedObject.Interact(this.body);
      }
    });

    //Correr cuando se mantenga pulsado Shift
    this.runKey.on('down', () => {
      this.speed = 100;
    });
    this.runKey.on('up', () => {
      this.speed = 50;
    });
  }


  setBeingControlled() {

    this.beingControlled = !this.beingControlled;
  }

  ChangePlayer() {
    if (!this.scene.levelPaused()) {
      this.beingControlled = !this.beingControlled;
    }

  }

  preUpdate(t, dt) {
    if (!this.beingControlled) {
      this.play('_idle' + this.playerNamenoselect, true);
      return;
    }

    super.preUpdate(t, dt);

    if (!this.scene.levelPaused()) {
      if (this.cursors.left.isDown) //move left
      {
        this.body.setVelocityX(-this.speed);
        //animation left
        this.play('_left' + this.playerName, true);
      } else if (this.cursors.right.isDown) //move right
      {
        this.body.setVelocityX(this.speed);
        //animation right
        this.play('_right' + this.playerName, true);
      } else if (this.cursors.up.isDown) //move up
      {
        this.body.setVelocityY(-this.speed);
        //animation up
        this.play('_up' + this.playerName, true);
      } else if (this.cursors.down.isDown) //move down
      {
        this.body.setVelocityY(this.speed);
        //animation down
        this.play('_down' + this.playerName, true);
      } else //no movement
      {
        this.body.setVelocityX(0);
        this.body.setVelocityY(0);
        //animation stop
        this.play('_idle' + this.playerName, true);
      }
    }

  }




  CheckForNearestObject(objetos) {
    this.objectList = objetos;
    var disOffset = 60;
    let initialDist = 9000;

    //Checkeo si sigo suficietemente cerca del objeto que estaba seleccionando anteriormente

    if (this.selectedObject != null) {
      let distanceBetween = Phaser.Math.Distance.Between(this.body.x, this.body.y, this.selectedObject.body.x, this.selectedObject.body.y);
      if (distanceBetween > disOffset) {
        this.selectedObject.DeselectObject();
        this.selectedObject = null;
      }
    }

    //Para cada objeto interaccionable en la escena, compruebo la distancia al jugador
    for (let i = 0; i < this.objectList.length; i++) {
      let distanceBetween = Phaser.Math.Distance.Between(this.body.x, this.body.y, this.objectList[i].body.x, this.objectList[i].body.y);

      if (distanceBetween < initialDist && distanceBetween < disOffset) //el objeto se encuentra en rango, y esta mas cerca que el anterior
      {
        this.initialDist = distanceBetween;
        //Se asigna el nuevo objeto mas cercano posible
        if (this.selectedObject != null) this.selectedObject.DeselectObject();
        this.selectedObject = this.objectList[i];

        //this.AddIndicator(this.objectList[i].body.position);
      }
    }
    //Se selecciona el objeto mas cercano, si existe
    if (this.selectedObject != null) {
      this.selectedObject.SelectObject();
    }
    //Se selecciona el objeto mas cercano, si existe
    if(this.selectedObject != null)
    {
      this.selectedObject.SelectObject();
    } 
  }

  /*AddIndicator(debugPos)
  {
    if(Phaser.Utils.Debug && this.debugIndicator == null)
    {
      console.log("ADDIND");
      this.debugIndicator = this.scene.physics.add.sprite(debugPos.x, debugPos.y, 'debugIndic');
      this.debugIndicator.depth = 900;
    }
  }*/
}