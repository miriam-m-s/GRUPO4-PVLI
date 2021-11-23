/**
 * Escena para la precarga de los assets que se usarán en el juego.
 * Esta escena se puede mejorar añadiendo una imagen del juego y una 
 * barra de progreso de carga de los assets
 * @see {@link https://gamedevacademy.org/creating-a-preloading-screen-in-phaser-3/} como ejemplo
 * sobre cómo hacer una barra de progreso.
 */
export default class Boot extends Phaser.Scene {
  /**
   * Constructor de la escena
   */
  constructor() {
    super({ key: 'boot' });
  }

  /**
   * Carga de los assets del juego
   */
  preload() {
    // Con setPath podemos establecer el prefijo que se añadirá a todos los load que aparecen a continuación
    this.load.setPath('assets/sprites/');
    this.load.image('platform', 'platform.png');
    this.load.image('base', 'base.png');
    this.load.image('player1', 'fantasmacolor.png');
    this.load.image('player2', 'coloreada.png');
    this.load.image('light', 'light.png');
    this.load.image('lampAct','lamparaSelected.png');
    this.load.image('lampDesact','lampara.png');
    this.load.image('lampEnc','lamparaEncendida.png');
    this.load.image('furniture','mueble.png');
    this.load.image('furnitureSelected','muebleSelected.png');
    this.load.image('furniturePossesed','mueblePoseido.png');
    this.load.image('basefantas','basefant.png')
    this.load.image('basepers','basepers.png')
  }

  /**
   * Creación de la escena. En este caso, solo cambiamos a la escena que representa el
   * nivel del juego
   */
  create() {
    this.scene.start('level');
  }
}