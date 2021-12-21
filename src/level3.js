import Lights from './lights.js';
import Lamp from './lamp.js';
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

export default class Level3 extends Phaser.Scene {

  let baseFant=[65,170];
  let basePers=[310, 170];
  let posIniFant=[65,140];
  let posIniPers=[60,70];
  let tilemap='tilemap03';
  
  let mirrorPos=[250,120,0];
  let candlePos=[300,120,50]; 

  let posBaseGhost=[80, 150];
  let posBaseHuman=[280, 150];
  let lightsInfo=[[125,0,60],[10,0,60],[230,0,60]];
  super(tilemap, lightsInfo,posIniFant,posIniPers,posBaseGhost,posBaseHuman,mirrorPos,candlePos,'level3','level4');
  }

  create() {
    //MAPA TILESET
    //creacion del tilemap
    this.map = this.make.tilemap({
      key: 'tilemap03',
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
    this.backgroundLayer.depth = 1;
    //this.lightLayer = this.map.createLayer('LightLayer', [tileset1]);

    this.colLayer = this.map.createLayer('ColLayer', [tileset1]);
    this.colLayer.depth = 3;
    this.extraLayer = this.map.createLayer('ExtraLayer', [tileset1]);
    this.extraLayer.depth = 4;

    //OBJETOS DE LA ESCENA
    this.bases = this.add.group();
    //Grupos de objetos

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
    this.pauseMenu = new Pause(this, this.camera.centerX / this.camera.zoom, this.camera.centerY / this.camera.zoom, 0, 'level3');
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
    this.pausa.depth =10;
    this.playButton.depth = 10;
    this.musica.depth =10;
    this.stoppedMusic.depth =10;
    this.musica.on('pointerdown', function () {
      this.scene.sceneSound.clickMusic();
    });
    this.stoppedMusic.on('pointerdown', function () {
      this.scene.sceneSound.clickMusic();
    });

    //Jugadores
    let humanList; //lista de objetos humanos
    let ghostList; //lista de objetos poseibles

    let lampList;
    lampList = [
      this.newLamp = new Lamp(this, 180, 180, 'lampDefault', this.humanPlayer, this.ghostPlayer, this.lampGroup, 50)
    ];

    humanList = [
      new Switch(this, 110, 180, 'switchDefault', this.humanPlayer, this.ghostPlayer, this.lampGroup, this.newLamp)
    ];

    //Objetos Fantasma(muebles/espejo)
    ghostList = [
      //this.candle = new Candle(this, this.ghostPlayer, this.furnitureGroup, 300, 120, 50, 'UnselectedCandle'),
     // this.mirror = new Mirror(this, this.mirrorGroup, 250, 120, 0),
    ];

    //CAMBIAR ESTO EN FANTASMA / HUMANO

    this.humanPlayer = new Human(this, 50, 185, true, humanList);

    this.ghostPlayer = new Ghost(this, 175, 250, false, ghostList);

    this.basepers = new Base(this, this.humanPlayer, 'basepers', 300, 185);
    this.basefant = new Base(this, this.ghostPlayer, 'basefantas', 180, 80);

    this.lights = this.add.group();
    new Lights(this, this.humanPlayer, this.ghostPlayer, this.lights, 10, 130, 60);
    new Lights(this, this.humanPlayer, this.ghostPlayer, this.lights, 230, 130, 60);

    this.colLayer.setCollisionByProperty({ colisiona: true });
    this.physics.add.collider(this.ghostPlayer, this.colLayer);
    this.physics.add.collider(this.ghostPlayer, this.extraLayer);

    this.extraLayer.setCollisionByProperty({ colisiona: true });
    this.physics.add.collider(this.humanPlayer, this.colLayer);
    this.physics.add.collider(this.humanPlayer, this.extraLayer);

    //CREACIÓN DEL RAYCAST
    this.raycaster = this.raycasterPlugin.createRaycaster();
    //objetos que reaccionan al raycast
    this.dynamicObstacles = [
      this.humanPlayer,
      this.ghostPlayer
    ];
    this.raycaster.mapGameObjects(this.dynamicObstacles, true);

    //this.window = new Window(this, 193, 35, 270);
  }

  ResetLevel() {
    this.scene.start('level3');
  }
  //Check the final de nivel para ambos jugadores
  update() {
    this.timer.updateTimer();

    if (this.basefant.isInbase() && this.basepers.isInbase()) {
      this.scene.start('congrats');
    }
    // this.raycaster.updateObstacle(this.dynamicObstacles);
  }

  levelPaused() {
    return this.isPaused;
  }
}