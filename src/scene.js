
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
  preload(){
    this.load.plugin('rexraycasterplugin', 'https://raw.githubusercontent.com/rexrainbow/phaser3-rex-notes/master/dist/rexraycasterplugin.min.js', true);  
  }
  create() 
  {
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
      this.music =this.sound.add("bckMusic", config);
      this.exit =this.sound.add('exit')
  
      this.music.play();
      const tileset1 = this.map.addTilesetImage('mansionNes', 'mapSpriteSheet');

      this.backgroundLayer = this.map.createLayer('BackLayer', [tileset1]);
      this.lightLayer  = this.map.createLayer('LightLayer', [tileset1]);
      this.frontLayer = this.map.createLayer('FrontLayer', [tileset1]);
      //this.itemLayer = this.map.createLayer('ItemLayer', [tileset1]); 

    //Timer
      this.gameTime = this.add.text(205,40, "0s", {
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
      this.furnitureGroup=this.add.group();

      
      this.mirrorGroup=this.add.group();

      



      //BOTON DE PAUSA Y ESC
      this.isPaused=false;
      this.escape = this.input.keyboard.addKey('ESC');
      this.escape.on('down', ()=> {
        this.exit.play();
        this.music.stop();
      this.isPaused=!this.isPaused;
        this.clickPause();
      });
      this.pausa=this.add.image(225,20,'pauseButton').setInteractive();
      this.pausa.scale=0.05;

       this.pausa.on('pointerdown',function(){
        //this.scene.scene.pause();
        this.scene.isPaused=!this.scene.isPaused;
        this.scene.clickPause();
        
       });

      //Jugadores

      
    
      let humanList; //lista de objetos humanos
      let ghostList; //lista de objetos poseibles

      //Objetos Humano(lamparas/interruptores)
      this.lampCreated01 = 
      humanList = [
        new Lamp(this, this.humanPlayer, this.lampGroup, new Phaser.Math.Vector2(60,80)), 
       // new Mirror(this, this.humanPlayer, this.lampGroup, new Phaser.Math.Vector2(190,70)), 
        new Lamp(this, this.humanPlayer, this.lampGroup, new Phaser.Math.Vector2(190,150))];
      
      //Objetos Fantasma(muebles/espejo)
      ghostList = [new Furniture(this, this.ghostPlayer, this.furnitureGroup, new Phaser.Math.Vector2(130,135)), 
        new Furniture(this, this.ghostPlayer,  this.furnitureGroup, new Phaser.Math.Vector2(170,135))];
        //bases
       
      
      if(Phaser.Utils.Debug)
      {
        this.debugIndicator = this.physics.add.sprite(130, 100, 'debugIndic');
        this.debugIndicator.depth = 900;
        console.log(this.debugIndicator.body.center);
      }
      //RAYLIGHT DETECTOR
      this.rayLightDetector = this.add.rectangle(0, 100, 600, 30, 0x848484).setOrigin(0, 1);
      this.physics.add.existing(this.rayLightDetector);
     
    //CAMBIAR ESTO EN FANTASMA / HUMANO
    this.humanPlayer = new Human(this, new Phaser.Math.Vector2(130, 100), "Human", true, humanList);
    this.ghostPlayer = new Ghost(this, new Phaser.Math.Vector2(180, 100),"Ghost", false, ghostList,  this.rayLightDetector );//comienza el fantasma

   
    this.basepers=new Base(this,this.humanPlayer,'basepers',70,110);
    this.basefant=new Base(this,this.ghostPlayer,'basefantas',150,50);

    this.lights = this.add.group();
    new Lights(this, this.humanPlayer, this.ghostPlayer, this.lights, 50, 50, 50);

    //GRAFICOS
    this.graphics = this.add.graphics();
   

    this.mirror = new Mirror(this, this.ghostPlayer, this.mirrorGroup, 20, 80, 180, this.rayLightDetector);

    //RAYCAST OBJECTS
    this.staticObstacles = [
     
      ];
  

      this.dynamicObstacles = [
         this.humanPlayer,
          this.ghostPlayer
        
      ];



      this.raycaster = this.plugins.get('rexraycasterplugin').add()
      .addObstacle(this.staticObstacles)
      .addObstacle(this.dynamicObstacles)
    
    
   this.window = new Window(this, this.graphics, 80, 200, this.raycaster, 0, this.rayLightDetector);
  }
  
  DoRaycast(x, y, angle, mirrorDetector) {

    RunRaycaster(this.raycaster,
        x, y, angle,
        this.graphics, 
        mirrorDetector
    );
}

ResetLevel() {
  console.log("RESET LEVEL");
 // this.scene.start('end');
}
  //Check de final de nivel para ambos jugadores
  update() {   
    this.updateTimer();
  //  console.log(this.basefant.ininbase()+" "+this.basepers.ininbase()) 
       if(this.basefant.ininbase()&&this.basepers.ininbase()){
         console.log("NEXT LEVEL");
          this.scene.start('end');
      }
      this.raycaster.updateObstacle(this.dynamicObstacles);
  } 

  updateTimer(){
    let totalSeconds = this.timer.getElapsedSeconds().toFixed(0);
    this.gameTime.setText(totalSeconds);
    let minutes = Math.floor(totalSeconds/60);
    let seconds = totalSeconds - 60 * minutes;
    if(totalSeconds < 60){
      this.gameTime.setText(seconds+"s");
    }
    else{
      this.gameTime.setText(minutes + "m"+ seconds+"s");
    }
  }

  clickPause()
  {
    if(this.isPaused) //Crea el menu con los botones
    {
      this.timer.paused = !this.timer.paused;
      this.anims.pauseAll(); //Pausa todas las animaciones de la escena
      this.pauseMenu=new Pause(this,120,130);
    }
    else //Lo destruye
    {
      this.timer.paused = !this.timer.paused;
      this.music.play();
      this.pauseMenu.destroy();
      this.anims.resumeAll(); //Reanuda las animaciones que habia activas al pausar la escena

    }
  }
  levelPaused()
  {
    return this.isPaused;

  }
}
let RunRaycaster = function (raycaster, x, y, angle, debugGraphics, mirrorDetector) {
  debugGraphics
      .clear()
      .fillStyle(0xC4C400)
      .fillCircle(x, y, 10);

  const MaxReflectionCount = 1000;
  for (let i = 0; i < MaxReflectionCount; i++) {
      let result = raycaster.rayToward(x, y, angle);
      debugGraphics
          .lineStyle(1, 0x176711)
          .strokeLineShape(raycaster.ray);

      
      mirrorDetector.setPosition(result.x, result.y);
      console.log(angle);
   
 break;
      if (result) {

// //add overlap collider (require passing ray.processOverlap as process callback)
// this.physics.add.overlap(this.ray, targets, function(rayFoVCircle, target){
//     /*
//     * What to do with game objects in line of sight.
//     */
//   }, this.ray.processOverlap.bind(this.ray));

          debugGraphics
              .fillStyle(0xff0000)
              .fillPoint(result.x, result.y, 4)

          x = result.x;
          y = result.y;
          angle = result.reflectAngle;
          console.log(angle);
         
      } else {
          break;
      }
    }
  }


  


