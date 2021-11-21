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
  preload() 
  {
    this.load.setPath('assets/sprites/');
    this.load.image('platform', 'platform.png');
    this.load.image('base', 'base.png');
    //Players
    this.load.spritesheet('ghostSpriteSheet', 'ghostSpriteSheet.png',{frameWidth: 16, frameHeight: 16});
    this.load.image('player1', 'ghostSprite.png');
    this.load.image('player2', 'humanSprite.png');
    //Objects/Enviroment
    this.load.image('light', 'light.png');
    this.load.image('lampAct','lamparaSelected.png');
    this.load.image('lampDesact','lampara.png');
    this.load.image('lampEnc','lamparaEncendida.png');
    this.load.image('furniture','mueble.png');
    this.load.image('furnitureSelected','muebleSelected.png');
    this.load.image('furniturePossesed','mueblePoseido.png');

    this.load.setPath('assets/maps/');
    //Carga de Tilemap
    this.load.tilemapTiledJSON('tilemap01', 'Map01.json');
    //Carga de spritesheet
    this.load.image('mapSpriteSheet', 'spritesheets/mansionNes.png');
  }

  /**
   * Creación de la escena. En este caso, solo cambiamos a la escena que representa el
   * nivel del juego
   */
  
  create() 
  {
    //Animations
    this.anims.create({
      key: "ghostUp",
      frameRate: 2,
      frames: this.anims.generateFrameNumbers("ghostSpriteSheet", {start: 0, end:2}),
      repeat: -1
    });

    this.scene.start('level');
  }

  createScene() 
  {
      console.log("pinis");
  }
}