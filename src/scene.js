import Player from './player.js';
import Platform from './platform.js';
import Light from './lights.js';
import Lamp from './lamp.js';
import Furniture from './furniture.js';
import Human from './Human.js';
import Ghost from './ghost.js';
import Base from './base.js';



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
    this.person = new Human(this, 300, 300);//right
    this.ghost = new Ghost(this, 700, 300);//left
    
    //Creacion de Nivel Temporal

      //Plataformas
      new Platform(this, this.person, this.bases, 150, 350);
      new Platform(this, this.person, this.bases, 850, 350);
      new Platform(this, this.ghost, this.bases, 150, 350);
      new Platform(this, this.ghost, this.bases, 850, 350);

      
       this.basefant=new Base(this,this.ghost,'basefantas',760,500);
      this.basepers=new Base(this,this.person,'basepers',350,450);
      
      //Luces
      this.lights = this.add.group();
      new Light(this, this.ghost, this.person, this.bases, 50, 50, 200);
      
      //Objetos Humano(lamparas/interruptores)
      new Lamp(this, this.person, this.lampGroup, 500, 200);
      let lampLight;
      lampLight=new Light(this,this.person,this.ghost,this.lights,500,200,0.10);
      lampLight.setVisible(false);
      new Lamp(this, this.person, this.lampGroup, 600, 200); 
      new Lamp(this, this.person, this.lampGroup, 700, 200);
      for(let i = 0; i<this.lampGroup.children.entries.length;i++)
      {
        this.lampGroup.children.entries[i].name = "Lampara 0" + i;
      }

      //Objetos Fantasma(muebles/espejo)
        new Furniture(this, this.ghost, this.furnitureGroup, 800, 100);
        new Furniture(this, this.ghost, this.furnitureGroup, 800, 250);
        new Furniture(this, this.ghost, this.furnitureGroup, 650, 400);
         for(let i = 0; i<this.furnitureGroup.children.entries.length;i++)
       {
        this.furnitureGroup.children.entries[i].name= "Mueble 0" + i;
       } 

    //CAMBIAR ESTO EN FANTASMA / HUMANO
    this.person.humanItems = this.lampGroup;
    this.ghost.ghostItems = this.furnitureGroup;
  }
  
  update()
  {
    
    
   //  console.log(this.basefant.ininbase());
     if(this.basefant.ininbase()&&this.basepers.ininbase()){

       console.log("cambio");
      this.scene.start('end');
     }
  }
}