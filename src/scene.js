import Player from './player.js';
import Platform from './platform.js';
import Lights from './lights.js';
import Lamp from './lamp.js';
import Furniture from './furniture.js';
import Human from './Human.js';
import Ghost from './Ghost.js'



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
      this.humanPlayer = new Human(this, new Phaser.Math.Vector2(130, 100), "Human", false);
      this.ghostPlayer = new Ghost(this, new Phaser.Math.Vector2(180, 100),"Ghost", true);//comienza el fantasma
    
      let humanList; //lista de objetos humanos
      let ghostList; //lista de objetos poseibles

      //Objetos Humano(lamparas/interruptores)
      this.lampCreated01 = 
      humanList = [
        new Lamp(this, this.humanPlayer, this.lampGroup, new Phaser.Math.Vector2(190,100)), 
        new Lamp(this, this.humanPlayer, this.lampGroup, new Phaser.Math.Vector2(190,150))];
      
      //Objetos Fantasma(muebles/espejo)
      ghostList = [new Furniture(this, this.ghostPlayer, this.furnitureGroup, 130, 135), 
        new Furniture(this, this.ghostPlayer, this.furnitureGroup, 150, 135),
        new Furniture(this, this.ghostPlayer, this.furnitureGroup, 170, 135)];
        for(let i = 0; i<3;i++)
      {
        ghostList[i].name = "Mueble 0" + i;
      } 

    //CAMBIAR ESTO EN FANTASMA / HUMANO
    this.humanPlayer.humanItems = humanList;
    this.ghostPlayer.ghostItems = ghostList;

    this.checkEnd();
  }
  
  //Check de final de nivel para ambos jugadores
  checkEnd(){
    if(this.humanPlayer.playerState && this.ghostPlayer.playerState){
        this.scene.start('end');
      }
    }
}