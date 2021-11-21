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

      this.map.x = 50;

      const tileset1 = this.map.addTilesetImage('MansionTileset01', 'mapSpriteSheet');

      this.backgroundLayer = this.map.createLayer('Tile Layer 1', [tileset1]);
      this.groundLayer  = this.map.createLayer('Tile Layer 2', [tileset1]);

    //OBJETOS DE LA ESCENA
      this.clock = new Phaser.Time.Clock(this);
      this.bases = this.add.group();
      //Grupos de objetos
      this.lampGroup = this.add.group();
      this.furnitureGroup=this.add.group();
      //Jugadores
      this.humanPlayer = new Human(this, 130, 100);//right
      this.humanPlayer.playerName = "Human";
      this.humanPlayer.beingControlled = false;
      this.ghostPlayer = new Ghost(this, 180, 100);//left
      this.ghostPlayer.playerName = "Ghost";
      //Texto bases (TEMPORAL)
      //this.add.text(475, 435, "Fantasma");
      //this.add.text(80, 135, "Estrella");
    
    //Creacion de Nivel Temporal
    /*
      //Plataformas
      new Platform(this, this.humanPlayer, this.bases, 150, 350);
      new Platform(this, this.humanPlayer, this.bases, 850, 350);
      new Platform(this, this.ghostPlayer, this.bases, 150, 350);
      new Platform(this, this.ghostPlayer, this.bases, 850, 350);
      
      //Luces
      this.lights = this.add.group();
      new Lights(this, this.humanPlayer, this.ghostPlayer, this.lights, 150, 350, 0.25);
    */
      let humanList; //lista de objetos humanos
      let ghostList; //lista de objetos poseibles

      //Objetos Humano(lamparas/interruptores)
      humanList = [new Lamp(this, this.humanPlayer, this.lampGroup, 500, 200), 
        new Lamp(this, this.humanPlayer, this.lampGroup, 600, 200), 
        new Lamp(this, this.humanPlayer, this.lampGroup, 700, 200)];
      for(let i = 0; i<3;i++)
      {
        humanList[i].name = "Lampara 0" + i;
      }    

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