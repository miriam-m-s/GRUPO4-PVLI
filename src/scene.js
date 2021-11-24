import Player from './player.js';
// import LightXD from './platform.js';
// import Lights from './lights.js';
import Light from './light.js';
import Ghost from './ghost.js'
import Person from './person.js';
import Base from './base.js'


/**
 * Escena principal del juego. La escena se compone de una serie de plataformas 
 * sobre las que se sitúan las bases en las podrán aparecer las estrellas. 
 * El juego comienza generando aleatoriamente una base sobre la que generar una estrella. 
 * Cada vez que el jugador recoge la estrella, aparece una nueva en otra base.
 * El juego termina cuando el jugador ha recogido 10 estrellas.
 * @extends Phaser.Scene
 */
export default class Level extends Phaser.Scene {
  /**
   * Constructor de la escena
   * @param {Player} player Coordenada X

   */

  

  constructor() {
    super({ key: 'level' });
   }

  /**
   * Creación de los elementos de la escena principal de juego
   */
   preload() {
    this.load.plugin('rexraycasterplugin', 'https://raw.githubusercontent.com/rexrainbow/phaser3-rex-notes/master/dist/rexraycasterplugin.min.js', true);
   }
  create() {
    //this.clock=new Phaser.Time.Clock(this);
    this.stars = 10;
    this.bases = this.add.group();
  
    this.person=new Person(this,350,300);
    this.ghost=new Ghost(this,750,350);
  
    this.basefant=new Base(this,this.ghost,'basefantas',760,500);
   this.basepers=new Base(this,this.person,'basepers',350,450);
    //this.bashuman=new Base(this,400,400,'basepers',this.person);
    this.raycaster =this.plugins.get('rexraycasterplugin').add(config);

    ///new LightXD(this, this.player, this.bases, 150, 350);
    new Light(this, this.ghost, this.person, this.bases, 50, 50, 200);
    new Light(this, this.ghost, this.person, this.bases, 350, 200, 100);

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