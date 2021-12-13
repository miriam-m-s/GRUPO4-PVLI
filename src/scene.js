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

  static TILE_SIZE = 16;//tamano de tiles de los tilemaps
  constructor() 
  {
    super({ key: 'level' });
  }

  //Creación de los elementos de la escena principal de juego
  
  create() 
  {
    //MAPA TILESET
      //creacion del tilemap
      this.map = this.make.tilemap({ 
        key: 'tilemap01', 
        tileWidth: 8, 
        tileHeight: 8 
      });

      const tileset1 = this.map.addTilesetImage('mansionNes', 'mapSpriteSheet');

      this.backgroundLayer = this.map.createLayer('BackLayer', [tileset1]);
      this.lightLayer  = this.map.createLayer('LightLayer', [tileset1]);
      this.frontLayer = this.map.createLayer('FrontLayer', [tileset1]);
      this.itemLayer = this.map.createLayer('ItemLayer', [tileset1]); 

    //OBJETOS DE LA ESCENA
      this.clock = new Phaser.Time.Clock(this);
      this.bases = this.add.group();
      //Grupos de objetos
      this.lampGroup = this.add.group();
      this.furnitureGroup=this.add.group();
      //Jugadores
      
    
      let humanList; //lista de objetos humanos
      let ghostList; //lista de objetos poseibles

      //Objetos Humano(lamparas/interruptores)
      this.lampCreated01 = 
      humanList = [
        new Lamp(this, this.humanPlayer, this.lampGroup, new Phaser.Math.Vector2(60,80)), 
        new Mirror(this, this.humanPlayer, this.lampGroup, new Phaser.Math.Vector2(190,70)), 
        new Lamp(this, this.humanPlayer, this.lampGroup, new Phaser.Math.Vector2(190,150))];
      
      //Objetos Fantasma(muebles/espejo)
      ghostList = [new Furniture(this, this.ghostPlayer, this.furnitureGroup, new Phaser.Math.Vector2(130,135)), 
        new Furniture(this, this.ghostPlayer,  this.furnitureGroup, new Phaser.Math.Vector2(170,135))];
      
      if(Phaser.Utils.Debug)
      {
        this.debugIndicator = this.physics.add.sprite(130, 100, 'debugIndic');
        this.debugIndicator.depth = 900;
        console.log(this.debugIndicator.body.center);
      }

    //CAMBIAR ESTO EN FANTASMA / HUMANO
    this.humanPlayer = new Human(this, new Phaser.Math.Vector2(130, 100), "Human", true, humanList);
    this.ghostPlayer = new Ghost(this, new Phaser.Math.Vector2(180, 100),"Ghost", false, ghostList);//comienza el fantasma

    this.dynamicObstacles = [
      this.humanPlayer,
      this.ghostPlayer, this.mirror, this.furniture2, this.furniture,this.mirror2
    ];



    this.raycaster = this.plugins.get('rexraycasterplugin').add()
      .addObstacle(this.staticObstacles)
      .addObstacle(this.dynamicObstacles)


    this.window = new Window(this, this.graphics, 20, 200, this.raycaster, 90);
  }

  DoRaycast(x, y, angle, mirrorDetector, graphic) {

    RunRaycaster(this.raycaster,
      x, y, angle,
      graphic,
      mirrorDetector
    );
  }

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
    this.raycaster.updateObstacle(this.dynamicObstacles);
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
let RunRaycaster = function (raycaster, x, y, angle, debugGraphics, mirrorDetector) {
  debugGraphics
    .clear()
    .fillStyle(0xC4C400)


  const MaxReflectionCount = 1000;
  for (let i = 0; i < MaxReflectionCount; i++) {
    let result = raycaster.rayToward(x, y, angle);
    debugGraphics
      .lineStyle(2, 0xFFFFF)
      .strokeLineShape(raycaster.ray);


    mirrorDetector.setPosition(result.x, result.y);


    break;

  }
}