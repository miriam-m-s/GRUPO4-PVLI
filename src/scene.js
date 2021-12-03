import Player from './player.js';
import Platform from './platform.js';
import Lights from './lights.js';
import Lamp from './lamp.js';
import Mirror from './mirror.js';
import Furniture from './furniture.js';
import Human from './human.js';
import Ghost from './ghost.js'



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


    this.lights = this.add.group();
    new Lights(this, this.humanPlayer, this.ghostPlayer, this.lights, 50, 50, 50);

    this.checkEnd();
  }
  
  //Check de final de nivel para ambos jugadores
  checkEnd(){
    if(this.humanPlayer.playerState && this.ghostPlayer.playerState){
        this.scene.start('end');
      }
    }
}