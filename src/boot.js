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
    this.animationFrameRate = 3;
  }

  /**
   * Carga de los assets del juego
   */
  preload() 
  {
     //MUSIC
     this.load.audio('bckMusic', [
      './assets/audio/music/bckMusic.mp3']);
    this.load.setPath('assets/sprites/');
    this.load.image('platform', 'platform.png');
    this.load.image('base', 'base.png');
    //Players
    this.load.spritesheet('GhostSpriteSheet', 'ghostSpriteSheet.png',{frameWidth: 16, frameHeight: 16});
    this.load.spritesheet('HumanSpriteSheet', 'humanSpriteSheet.png',{frameWidth: 16, frameHeight: 16});
    //Objects/Enviroment
    this.load.image('lightCircleMedium', 'lightCircleMedium.png');
    this.load.image('lightCircleBig', 'lightCircleBig.png');
    this.load.image('lamp01','lampSpr01.png');
    this.load.image('lamp02','lampSpr02.png');
    this.load.image('lamp03','lampSpr03.png');
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

    //MUSIC
    const audioConfig = {
      mute: false,
      volume: 1,
      rate: 1,
      detune: 0,
      seek: 0,
      loop: true,
      delay: 0,
    }; // config es opcional
    var music = this.sound.add('bckMusic', audioConfig);
    //music.play();

    //GHOST ANIMATIONS 
      this.anims.create({
        key: "_idleGhost",
        frameRate: this.animationFrameRate,
        frames: this.anims.generateFrameNumbers("GhostSpriteSheet", {start: 0, end:2}),
        repeat: -1
      });
      this.anims.create({
        key: "_downGhost",
        frameRate: this.animationFrameRate,
        frames: this.anims.generateFrameNumbers("GhostSpriteSheet", {start: 3, end:5}),
        repeat: -1
      });
      this.anims.create({
        key: "_leftGhost",
        frameRate: this.animationFrameRate,
        frames: this.anims.generateFrameNumbers("GhostSpriteSheet", {start: 6, end:8}),
        repeat: -1
      });
      this.anims.create({
        key: "_rightGhost",
        frameRate: this.animationFrameRate,
        frames: this.anims.generateFrameNumbers("GhostSpriteSheet", {start: 9, end:11}),
        repeat: -1
      });
      this.anims.create({
        key: "_upGhost",
        frameRate: this.animationFrameRate,
        frames: this.anims.generateFrameNumbers("GhostSpriteSheet", {start: 12, end:14}),
        repeat: -1
      });

      //HUMAN ANIMATIONS -------------------------------------------------------------
      this.anims.create({
        key: "_idleHuman",
        frameRate: this.animationFrameRate,
        frames: this.anims.generateFrameNumbers("HumanSpriteSheet", {start: 0, end:2}),
        repeat: -1
      });
      this.anims.create({
        key: "_downHuman",
        frameRate: this.animationFrameRate,
        frames: this.anims.generateFrameNumbers("HumanSpriteSheet", {start: 3, end:5}),
        repeat: -1
      });
      this.anims.create({
        key: "_leftHuman",
        frameRate: this.animationFrameRate,
        frames: this.anims.generateFrameNumbers("HumanSpriteSheet", {start: 6, end:8}),
        repeat: -1
      });
      this.anims.create({
        key: "_rightHuman",
        frameRate: this.animationFrameRate,
        frames: this.anims.generateFrameNumbers("HumanSpriteSheet", {start: 9, end:11}),
        repeat: -1
      });
      this.anims.create({
        key: "_upHuman",
        frameRate: this.animationFrameRate,
        frames: this.anims.generateFrameNumbers("HumanSpriteSheet", {start: 12, end:14}),
        repeat: -1
      });

    //CREACION DEL NIVEL
    this.scene.start('level');
  }
}