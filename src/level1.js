import Lights from './lights.js';
import Lamp from './lamp.js';
import Mirror from './mirror.js';
import Furniture from './furniture.js';
import Candle from './candle.js';
import Human from './human.js';
import Ghost from './ghost.js'
import Base from './base.js';
import Switch from './switch.js'
import Window from './window.js'
import Pause from './pause.js';
import Music from './music.js';
import Timer from './timer.js'


/**
 * @extends Phaser.Scene
 */

export default class Level1 extends Phaser.Scene {

  static TILE_SIZE = 16; //tamano de tiles de los tilemaps
  constructor() {
    super({
      key: 'level1'
    });
  }

  //Creación de los elementos de la escena principal de juego
  
  create() {
    //MAPA TILESET
    //creacion del tilemap
    this.map = this.make.tilemap({
      key: 'tilemap01',
      tileWidth: 8,
      tileHeight: 8
    });

    const config = {
      mute: false,
      volume: 0.2,
      rate: 1,
      detune: 0,
      seek: 0,
      loop: true,
      delay: 0,
    }; // config es opcional
    this.music = this.sound.add("bckMusic", config);
    this.exit = this.sound.add('exit')

    this.music.play();
    const tileset1 = this.map.addTilesetImage('mansionNes', 'mapSpriteSheet');

    this.backgroundLayer = this.map.createLayer('BackLayer', [tileset1]);
    this.lightLayer = this.map.createLayer('LightLayer', [tileset1]);

    this.colLayer = this.map.createLayer('ColLayer', [tileset1]);
    this.extraLayer = this.map.createLayer('ExtraLayer', [tileset1]);

    //OBJETOS DE LA ESCENA
    this.bases = this.add.group();
    //Grupos de objetos
    this.lampGroup = this.add.group();
    this.furnitureGroup = this.add.group();


    this.mirrorGroup = this.add.group();
    //CAMERA
    this.camera = this.cameras.main;

    this.camera.setBounds(0, 0, 8, 8);
    this.camera.zoom = 2.9;

    //Timer
    this.timer = new Timer(this, this.camera.displayWidth - 50, 40);

    //BOTON DE PAUSA Y ESC
    this.isPaused = false;
    this.pauseMenu = new Pause(this, this.camera.centerX / this.camera.zoom, this.camera.centerY / this.camera.zoom, 0, 'level1');
    this.escape = this.input.keyboard.addKey('ESC');
    this.escape.on('down', () => {
      this.pauseMenu.clickPause();
    });
    this.pausa = this.add.image(this.camera.displayWidth - 15, 20, 'pauseButton').setInteractive();
    this.playButton = this.add.image(this.camera.displayWidth - 15, 20, 'playButton').setInteractive();
    this.pausa.scale = 0.05;
    this.playButton.scale = 0.05;
    this.playButton.alpha = 0;
    this.pausa.on('pointerdown', function () {
      this.scene.pauseMenu.clickPause();
    });
    this.playButton.on('pointerdown', function () {
      this.scene.pauseMenu.clickPause();
    });
    //Music
    this.musicOn = true;
    this.musica = this.add.image(this.camera.displayWidth - 40, 20, 'musicButton').setInteractive();
    this.stoppedMusic = this.add.image(this.camera.displayWidth - 40, 20, 'stoppedMusicButton').setInteractive();
    this.stoppedMusic.alpha = 0;
    this.musica.scale = 0.01;
    this.stoppedMusic.scale = 0.01;
    this.sceneSound = new Music(this, 190, 20);
    this.musica.on('pointerdown', function () {
      this.scene.sceneSound.clickMusic();
    });
    this.stoppedMusic.on('pointerdown', function () {
      this.scene.sceneSound.clickMusic();
    });
    //Jugadores
    let humanList; //lista de objetos humanos
    let ghostList; //lista de objetos poseibles
    //Objetos Humano(lamparas/interruptores)
    humanList = [
    ];

 
    ghostList = [
     
    ];

  
    //CAMBIAR ESTO EN FANTASMA / HUMANO

    this.humanPlayer = new Human(this, 50, 50, true, humanList);

    this.ghostPlayer = new Ghost(this, 180, 200, false, ghostList)

    this.basepers = new Base(this, this.humanPlayer, 'basepers', 170, 150);
    this.basefant = new Base(this, this.ghostPlayer, 'basefantas', 50, 120);

    this.lights = this.add.group();
    new Lights(this, this.humanPlayer, this.ghostPlayer, this.lights, 0, 0, 50);

    new Lights(this, this.humanPlayer, this.ghostPlayer, this.lights, 100, 0, 50);
    new Lights(this, this.humanPlayer, this.ghostPlayer, this.lights, 100, 75, 50);


    this.colLayer.setCollisionByProperty({
      colisiona: true
    });
    this.physics.add.collider(this.ghostPlayer, this.colLayer);

    this.physics.add.collider(this.ghostPlayer, this.extraLayer);
    this.extraLayer.setCollisionByProperty({
      colisiona: true
    });


   
   


  }


  ResetLevel() {
    this.scene.start('level1');
  }
  //Check the final de nivel para ambos jugadores
  update() {
    this.timer.updateTimer();

    if (this.basefant.ininbase() && this.basepers.ininbase()) {
      this.scene.start('level2');
    }
    // this.raycaster.updateObstacle(this.dynamicObstacles);
  }

  levelPaused() {
    return this.isPaused;
  }
}