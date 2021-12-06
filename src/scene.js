
import Lights from './lights.js';
import Lamp from './lamp.js';
import Mirror from './mirror.js';
import Furniture from './furniture.js';
import Human from './human.js';
import Ghost from './ghost.js'
import Base from './base.js';
import Window from './window.js'


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
        volume: 0.3,
        rate: 1,
        detune: 0,
        seek: 0,
        loop: true,
        delay: 0,
      }; // config es opcional
      this.music =this.sound.add("bckMusic", config);
      
  
      this.music.play();
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
      
      this.mirrorGroup=this.add.group();

      
      
    
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

    //CAMBIAR ESTO EN FANTASMA / HUMANO
    this.humanPlayer = new Human(this, new Phaser.Math.Vector2(130, 100), "Human", true, humanList);
    this.ghostPlayer = new Ghost(this, new Phaser.Math.Vector2(180, 100),"Ghost", false, ghostList,  this.rayLightDetector );//comienza el fantasma

   
    this.basepers=new Base(this,this.humanPlayer,'basepers',30,80);
    this.basefant=new Base(this,this.ghostPlayer,'basefantas',150,50);

    this.lights = this.add.group();
    new Lights(this, this.humanPlayer, this.ghostPlayer, this.lights, 50, 50, 50);

    //GRAFICOS
    this.graphics = this.add.graphics();
   

    this.mirror = new Mirror(this, this.ghostPlayer, this.mirrorGroup, 70, 80, 180, this.rayLightDetector);

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
    
      this.rayLightDetector = this.add.rectangle(0, 100, 600, 30, 0x848484).setOrigin(0, 1);
      this.physics.add.existing(this.rayLightDetector);
     
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
  //  console.log(this.basefant.ininbase()+" "+this.basepers.ininbase()) 
       if(this.basefant.ininbase()&&this.basepers.ininbase()){
         console.log("NEXT LEVEL");
          this.scene.start('end');
      }
      this.raycaster.updateObstacle(this.dynamicObstacles);
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