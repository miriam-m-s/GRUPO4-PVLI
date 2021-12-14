import Lights from './lights.js';
import Lamp from './lamp.js';
import Mirror from './mirror.js';
import Furniture from './furniture.js';
import Human from './human.js';
import Ghost from './ghost.js'
import Base from './base.js';
import Window from './window.js'
import Pause from './pause.js';



/**
 * @extends Phaser.Scene
 */

export default class Level extends Phaser.Scene {

  static TILE_SIZE = 16; //tamano de tiles de los tilemaps
  constructor() {
    super({
      key: 'level'
    });
  }

  //Creación de los elementos de la escena principal de juego
  preload() {
    this.load.plugin('rexraycasterplugin', 'https://raw.githubusercontent.com/rexrainbow/phaser3-rex-notes/master/dist/rexraycasterplugin.min.js', true);
  }
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
    this.frontLayer = this.map.createLayer('FrontLayer', [tileset1]);
    //this.itemLayer = this.map.createLayer('ItemLayer', [tileset1]); 

    //Timer
    this.gameTime = this.add.text(205, 40, "0s", {
      font: "15px",
      fill: "#fff",
      align: "right"
    });
    this.timer = this.time.addEvent({
      delay: 999999,
      paused: false
    });

    //OBJETOS DE LA ESCENA
    this.bases = this.add.group();
    //Grupos de objetos
    this.lampGroup = this.add.group();
    this.furnitureGroup = this.add.group();


    this.mirrorGroup = this.add.group();





    //BOTON DE PAUSA Y ESC
    this.isPaused = false;
    this.escape = this.input.keyboard.addKey('ESC');
    this.escape.on('down', () => {
      this.exit.play();
      this.music.stop();
      this.isPaused = !this.isPaused;
      this.clickPause();
    });
    this.pausa = this.add.image(225, 20, 'pauseButton').setInteractive();
    this.pausa.scale = 0.05;

    this.pausa.on('pointerdown', function () {
      //this.scene.scene.pause();
      this.scene.isPaused = !this.scene.isPaused;
      this.scene.clickPause();

    });

    this.pauseMenu = null;

    //Jugadores



    let humanList; //lista de objetos humanos
    let ghostList; //lista de objetos poseibles

    //Objetos Humano(lamparas/interruptores)

    humanList = [
      new Lamp(this, 60, 80, 'lampDefault', this.humanPlayer, this.ghostPlayer, this.lampGroup),
      new Lamp(this, 190, 150, 'lampDefault', this.humanPlayer, this.ghostPlayer, this.lampGroup)
    ];
    // new Mirror(this, this.humanPlayer, this.lampGroup, new Phaser.Math.Vector2(190,70)), 
    //new Lamp(this, this.humanPlayer, this.lampGroup, new Phaser.Math.Vector2(190,150))];

    //Objetos Fantasma(muebles/espejo)
    ghostList = [
      this.furniture = new Furniture(this, this.ghostPlayer, this.furnitureGroup, 130, 135, 'furniture'),
      this.furniture2 = new Furniture(this, this.ghostPlayer, this.furnitureGroup, 170, 135, 'furniture'),
      this.mirror = new Mirror(this, this.mirrorGroup, 20, 80, 0),
      this.mirror2 = new Mirror(this, this.mirrorGroup, 120, 80, 270)

    ];
    //bases


    // if(Phaser.Utils.Debug)
    // {
    //   this.debugIndicator = this.physics.add.sprite(130, 100, 'debugIndic');
    //   this.debugIndicator.depth = 900;
    //   console.log(this.debugIndicator.body.center);
    // }
    //RAYLIGHT DETECTOR


    //CAMBIAR ESTO EN FANTASMA / HUMANO

    this.humanPlayer = new Human(this, 130, 100, true, humanList);

    this.ghostPlayer = new Ghost(this, 180, 100, false, ghostList)

    this.basepers = new Base(this, this.humanPlayer, 'basepers', 70, 110);
    this.basefant = new Base(this, this.ghostPlayer, 'basefantas', 185, 75);

    this.lights = this.add.group();
    new Lights(this, this.humanPlayer, this.ghostPlayer, this.lights, 60, 60, 50);

    //GRAFICOS
    this.graphics = this.add.graphics();




    //RAYCAST OBJECTS
    this.staticObstacles = [];


    // this.dynamicObstacles = [
    //   this.humanPlayer,
    //   this.ghostPlayer, this.mirror, this.furniture2, this.furniture,this.mirror2
    // ];



    // this.raycaster = this.plugins.get('rexraycasterplugin').add()
    //   .addObstacle(this.staticObstacles)
    //   .addObstacle(this.dynamicObstacles)


    // this.window = new Window(this, this.graphics, 20, 200, this.raycaster, 90);
  }

  // DoRaycast(x, y, angle, mirrorDetector, graphic) {

  //   RunRaycaster(this.raycaster,
  //     x, y, angle,
  //     graphic,
  //     mirrorDetector
  //   );
  // }

  ResetLevel() {
    console.log("RESET LEVEL");
    this.scene.start('end');
  }
  //Check the final de nivel para ambos jugadores
  update() {
    this.updateTimer();

    if (this.basefant.ininbase() && this.basepers.ininbase()) {
      console.log("NEXT LEVEL");
      this.scene.start('end');
    }
   // this.raycaster.updateObstacle(this.dynamicObstacles);
  }

  updateTimer() {
    let totalSeconds = this.timer.getElapsedSeconds().toFixed(0);
    this.gameTime.setText(totalSeconds);
    let minutes = Math.floor(totalSeconds / 60);
    let seconds = totalSeconds - 60 * minutes;
    if (totalSeconds < 60) {
      this.gameTime.setText(seconds + "s");
    } else {
      this.gameTime.setText(minutes + "m" + seconds + "s");
    }
  }

  clickPause() {
    if (this.isPaused) //Crea el menu con los botones
    {
      if (this.pauseMenu === null) {
        this.pauseMenu = new Pause(this, 120, 130);
      }
      this.pauseMenu.active = true;
      this.pauseMenu.alpha = 1;
      this.anims.pauseAll(); //Pausa todas las animaciones de la escena
    } else //Lo destruye
    {
      this.pauseMenu.active = false;
      this.pauseMenu.alpha = 0;
      this.music.play();
      this.anims.resumeAll(); //Reanuda las animaciones que habia activas al pausar la escena
    }
    this.timer.paused = !this.timer.paused;
  }

  levelPaused() {
    return this.isPaused;
  }
}
//raycaster calculate positions of rays
// let RunRaycaster = function (raycaster, x, y, angle, debugGraphics, mirrorDetector) {
//   debugGraphics
//     .clear()
//     .fillStyle(0xC4C400)


//   const MaxReflectionCount = 1000;
//   for (let i = 0; i < MaxReflectionCount; i++) {
//     let result = raycaster.rayToward(x, y, angle);
//     debugGraphics
//       .lineStyle(2, 0xFFFFF)
//       .strokeLineShape(raycaster.ray);


//     mirrorDetector.setPosition(result.x, result.y);


//     break;

//   }
// }