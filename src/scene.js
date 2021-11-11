import Player from './player.js';
import Platform from './platform.js';
import Lights from './lights.js';


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

  create() {
    this.clock=new Phaser.Time.Clock(this);
    this.stars = 10;
    this.bases = this.add.group();
    this.firstPlayer = false;
    this.secondPlayer = false;
    this.player = new Player(this, 700, 300,'player1', true);
    this.player2 = new Player(this, 300, 300,'player2', false);
    this.add.text(475, 435, "Fantasma");
    this.add.text(80, 135, "Estrella");
    //this.add.
    new Platform(this, this.player, this.bases, 150, 350);
    new Platform(this, this.player, this.bases, 850, 350);

    new Platform(this, this.player2, this.bases, 150, 350);
     new Platform(this, this.player2, this.bases, 850, 350);

   // this.add.image(400, 300, 'light');

    this.lights = this.add.group();

    new Lights(this, this.player, this.player2, this.lights, 150, 350, 0.25);
  }
   
  /**
   * Genera una estrella en una de las bases del escenario
   * @param {Array<Base>} from Lista de bases sobre las que se puede crear una estrella
   * Si es null, entonces se crea aleatoriamente sobre cualquiera de las bases existentes
   */

  /**
   * Método que se ejecuta al coger una estrella. Se pasa la base
   * sobre la que estaba la estrella cogida para evitar repeticiones
   * @param {Base} base La base sobre la que estaba la estrella que se ha cogido
   */

}