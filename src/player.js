/**
 * @extends Phaser.GameObjects.Sprite
 */
export default class Player extends Phaser.GameObjects.Sprite {

  /** 
   * Player es la clase de la que heredan ghost y human. Reune aquellas caracteristicas que tienen ambos en comun como 
   * el movimiento con cursores, el cambio de personajes con la tecla espacio, el aumento de velocidad con la tecla 
   * shift asi como la deteccion de objetos cercanos.
   * 
   * @param {Phaser.Scene} scene escena a la que pertenece el jugador
   * @param {int} initialPosX coordenada x de la posicion inicial del jugador
   * @param {int} initialPosY coordenada y de la posicion inicial del jugador
   * @param {string} playerName nombre del jugador
   * @param {bool} startController booleano que indica si el jugador comienza estando activo o no
   */

  constructor(scene, initialPosX, initialPosY, playerName, startController) {

    super(scene, initialPosX, initialPosY, playerName);

    //Asignar Parametros
    this.scene = scene;
    this.playerPos = new Phaser.Math.Vector2(initialPosX, initialPosY); //donde comienza el jugador en la escena
    this.playerName = playerName;
    this.beingControlled = startController; //comenzamos controlando al humano

    //Sonido en el cambio de jugador
    this.soundchange = scene.sound.add('changeplayer');

    //Litas/Objetos
    this.objectList = null;
    this.selectedObject = null;

    this.scene.add.existing(this);
    this.scene.physics.add.existing(this);

    this.body.setSize(15, 20, false);

    //Fisicas
    this.body.setCollideWorldBounds();
    this.speed = 50;

    //Cursores
    this.cursors = this.scene.input.keyboard.createCursorKeys();
    this.space = scene.input.keyboard.addKey('SPACE');
    this.eKey = scene.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.E);
    this.runKey = scene.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SHIFT);
    this.depth = 6;

    //Cambiar personajes con Espacio
    this.space.on('down', () => {

      this.body.setVelocity(0);
      if (this.scene.musicOn) this.soundchange.play();
      if (this.selectedObject != null) {
        this.selectedObject.DeselectObject();
      }
      this.ChangePlayer();
    });

    //Activar/Poseer objetos
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

  //Cambio de jugador
  ChangePlayer() {
    if (!this.scene.levelPaused()) {
      this.beingControlled = !this.beingControlled;
    }
  }

  preUpdate(t, dt) {

    super.preUpdate(t, dt);

    // Comprobar si se esta controlando este personaje
    if (!this.beingControlled) {
      this.play('_idle' + this.playerName, true);
      return;
    }

    // En caso de que si se este controlando este personaje, mover al personaje y actualizar su animacion
    if (!this.scene.levelPaused()) {
      if (this.cursors.left.isDown) {
        this.body.setVelocityX(-this.speed);
        this.play('_left' + this.playerName, true);
      } else if (this.cursors.right.isDown) {
        this.body.setVelocityX(this.speed);

        this.play('_right' + this.playerName, true);
      } else if (this.cursors.up.isDown) {
        this.body.setVelocityY(-this.speed);

        this.play('_up' + this.playerName, true);
      } else if (this.cursors.down.isDown) {
        this.body.setVelocityY(this.speed);
        this.play('_down' + this.playerName, true);
      } else {
        this.body.setVelocityX(0);
        this.body.setVelocityY(0);

        // Asignar la animacion Idle con personaje seleccionado
        this.play('_idle' + this.playerName + "sel", true);
      }
    }
  }

  //Metodo utilizado ara la deteccion de objetos cercanos
  CheckForNearestObject(objetos) {
    this.objectList = objetos;
    var disOffset = 35;
    let initialDist = 9000;

    //Checkeo si sigo suficientemente cerca del objeto que estaba seleccionando anteriormente

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

      }
    }
    //Se selecciona el objeto mas cercano, si existe
    if (this.selectedObject != null) {
      this.selectedObject.SelectObject();
    }
  }


}