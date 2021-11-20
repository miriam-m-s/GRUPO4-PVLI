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

  constructor() 
  {
    super({ key: 'level' });
  }

  //Creación de los elementos de la escena principal de juego
  
  create() 
  {
    this.clock = new Phaser.Time.Clock(this);
    this.bases = this.add.group();
    //Grupos de objetos
    this.lampGroup = this.add.group();
    this.furnitureGroup=this.add.group();
    //Jugadores
    this.humanPlayer = new Human(this, 300, 300);//right
    this.ghostPlayer = new Ghost(this, 700, 300);//left
    //Texto bases (TEMPORAL)
    this.add.text(475, 435, "Fantasma");
    this.add.text(80, 135, "Estrella");
    
    //Creacion de Nivel Temporal

      //Plataformas
      new Platform(this, this.humanPlayer, this.bases, 150, 350);
      new Platform(this, this.humanPlayer, this.bases, 850, 350);
      new Platform(this, this.ghostPlayer, this.bases, 150, 350);
      new Platform(this, this.ghostPlayer, this.bases, 850, 350);
      
      //Luces
      this.lights = this.add.group();
      new Lights(this, this.humanPlayer, this.ghostPlayer, this.lights, 150, 350, 0.25);
      
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
      ghostList = [new Furniture(this, this.ghostPlayer, this.furnitureGroup, 800, 100), 
        new Furniture(this, this.ghostPlayer, this.furnitureGroup, 800, 250),
        new Furniture(this, this.ghostPlayer, this.furnitureGroup, 650, 400)];
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