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

    super({
      key: 'boot'
    });
    this.animationFrameRate = 3;
  }
  loadFont(name, url) {
    let newFont = new FontFace(name, `url(${url})`);
    newFont.load().then(function (loaded) {
        document.fonts.add(loaded);
    }).catch(function (error) {
        return error;
    });
}

  /**
   * Carga de los assets del juego
   */
  preload() {
    //font
    this.loadFont("men", "/assets/fonts/retroFont.ttf");
    //VIDEO
    this.load.video('vid','./assets/video/a.mp4');
    
    //MUSIC
    this.load.setPath('assets/audio/music/');
    this.load.audio('bckMusic', 'bckMusic.mp3');
    this.load.audio('possesion', 'possesion.mp3');
    this.load.audio('changeplayer', 'bubllepop.mp3');
    this.load.audio('light', 'light.mp3');
    this.load.audio('exit', 'exit.mp3')
    this.load.audio('menus', 'menus.mp3')

    //SPRITESHEETS
    this.load.setPath('assets/sprites/');
    //Cursor
    this.load.image('CursorSelector', 'cursorSelector.png');
    //Players
    this.load.spritesheet('GhostSpriteSheet', 'ghostSpriteSheet02.png', {
      frameWidth: 16,
      frameHeight: 16
    });
    this.load.spritesheet('HumanSpriteSheet', 'humanSpriteSheet02.png', {
      frameWidth: 16,
      frameHeight: 16
    });
    this.load.spritesheet('GhostSpriteSheetselect', 'ghostSpriteSheetselect02.png', {
      frameWidth: 16,
      frameHeight: 19
    });
    this.load.spritesheet('HumanSpriteSheetselect', 'humanSpriteSheetselect02.png', {
      frameWidth: 16,
      frameHeight: 18
    });
    this.load.spritesheet('candleSpriteSheet', 'candleSpriteSheet.png', {
      frameWidth: 16,
      frameHeight: 16
    });

    //IMAGES
    this.load.image('ghost', 'ghostSprite.png');
    this.load.image('human', 'humanSprite.png');
    // Objects/Enviroment
    this.load.image('lightCircleMedium', 'lightCircleMedium.png');
    this.load.image('lightCircleBig', 'lightCircleBig.png');
    // Lamp
    this.load.image('lampDefault', 'lampSpr01.png');
    this.load.image('lampSelected', 'lampSpr02.png'); 
    this.load.image('switchDefault', 'switchSprite01.png');
    this.load.image('switchSelected', 'switchSprite02.png');
    // Furniture
    this.load.image('furniture', 'furnitureSpr01.png');
    this.load.image('furnitureSelected', 'furnitureSpr02.png');
    this.load.image('furniturePossesed', 'furnitureSpr03.png');
    //Pause button
    this.load.image('pauseButton', 'pausebutton.png');
    this.load.image('pauseMenu', 'pausemenu.png');
    this.load.image('menu', 'menu.png');
    this.load.image('background', 'background.png');

    //Music button
    this.load.image('musicButton', 'music.png');
    this.load.image('stoppedMusicButton', 'stopmusic.png');
    // Light
    this.load.image('light', 'light.png');
    // Detected mirror
    this.load.image('mirrordetector', 'mirrordetector.png');
    // Window
    this.load.image('window', 'window.png');
    // Candle
    this.load.image('SelectedCandle', 'SelectedCandle.png');
    this.load.image('UnselectedCandle', 'UnselectedCandle.png');
    this.load.image('PossesedCandle', 'PossesedCandle.png');
    // Bases
    this.load.image('basefantas', 'basefant.png')
    this.load.image('basepers', 'Trapdoor.png')
    // Debug
    this.load.image('debugIndic', 'debugIndicator.png');


    this.load.setPath('assets/sprites/Mirrors/');
    // Mirror
    // Unselected
    this.load.image('mirror_Unsel_90', 'mirror_Unsel_Up.png');
    this.load.image('mirror_Unsel_270', 'mirror_Unsel_Down.png');
    this.load.image('mirror_Unsel_180', 'mirror_Unsel_Left.png');
    this.load.image('mirror_Unsel_0', 'mirror_Unsel_Right.png');
    // Selected
    this.load.image('mirror_Sel_90', 'mirror_Sel_Up.png');
    this.load.image('mirror_Sel_270', 'mirror_Sel_Down.png');
    this.load.image('mirror_Sel_180', 'mirror_Sel_Left.png');
    this.load.image('mirror_Sel_0', 'mirror_Sel_Right.png');
    // Possesed
    this.load.image('mirror_Pos_90', 'mirror_Pos_Up.png');
    this.load.image('mirror_Pos_270', 'mirror_Pos_Down.png');
    this.load.image('mirror_Pos_180', 'mirror_Pos_Left.png');
    this.load.image('mirror_Pos_0', 'mirror_Pos_Right.png');


    this.load.setPath('assets/maps/'); 
    // Carga de Tilemap
    this.load.tilemapTiledJSON('tilemap01', 'Map01.json');
    this.load.tilemapTiledJSON('tilemap02', 'Map02.json');
    this.load.tilemapTiledJSON('tilemap03', 'Map03.json');
    // Carga de spritesheet
    this.load.image('mapSpriteSheet', 'spritesheets/mansionNes.png');
  }

  /**
   * Creación de la escena. En este caso, solo cambiamos a la escena que representa el
   * nivel del juego
   */

  create() {

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

    
    //ANIMATIONS
    //------------Ghost-----------------
    this.anims.create({
      key: "_idleGhost",
      frameRate: this.animationFrameRate,
      frames: this.anims.generateFrameNumbers("GhostSpriteSheet", {
        start: 0,
        end: 2
      }),
      repeat: -1
    });

    //selected animations
    this.anims.create({
      key: "_idleGhostsel",
      frameRate: this.animationFrameRate,
      frames: this.anims.generateFrameNumbers("GhostSpriteSheetselect", {
        start: 0,
        end: 2
      }),
      repeat: -1
    });

    this.anims.create({
      key: "_downGhostsel",
      frameRate: this.animationFrameRate,
      frames: this.anims.generateFrameNumbers("GhostSpriteSheetselect", {
        start: 3,
        end: 5
      }),
      repeat: -1
    });

    this.anims.create({
      key: "_leftGhostsel",
      frameRate: this.animationFrameRate,
      frames: this.anims.generateFrameNumbers("GhostSpriteSheetselect", {
        start: 6,
        end: 8
      }),
      repeat: -1
    });

    this.anims.create({
      key: "_rightGhostsel",
      frameRate: this.animationFrameRate,
      frames: this.anims.generateFrameNumbers("GhostSpriteSheetselect", {
        start: 9,
        end: 11
      }),
      repeat: -1
    });

    this.anims.create({
      key: "_upGhostsel",
      frameRate: this.animationFrameRate,
      frames: this.anims.generateFrameNumbers("GhostSpriteSheetselect", {
        start: 12,
        end: 14
      }),
      repeat: -1
    });

    //------------Human-----------------
    this.anims.create({
      key: "_idleHuman",
      frameRate: this.animationFrameRate,
      frames: this.anims.generateFrameNumbers("HumanSpriteSheet", {
        start: 0,
        end: 2
      }),
      repeat: -1
    });

    //selected animations
    this.anims.create({
      key: "_idleHumansel",
      frameRate: this.animationFrameRate,
      frames: this.anims.generateFrameNumbers("HumanSpriteSheetselect", {
        start: 0,
        end: 2
      }),
      repeat: -1
    });

    this.anims.create({
      key: "_downHumansel",
      frameRate: this.animationFrameRate,
      frames: this.anims.generateFrameNumbers("HumanSpriteSheetselect", {
        start: 3,
        end: 5
      }),
      repeat: -1
    });

    this.anims.create({
      key: "_leftHumansel",
      frameRate: this.animationFrameRate,
      frames: this.anims.generateFrameNumbers("HumanSpriteSheetselect", {
        start: 6,
        end: 8
      }),
      repeat: -1
    });

    this.anims.create({
      key: "_rightHumansel",
      frameRate: this.animationFrameRate,
      frames: this.anims.generateFrameNumbers("HumanSpriteSheetselect", {
        start: 9,
        end: 11
      }),
      repeat: -1
    });

    this.anims.create({
      key: "_upHumansel",
      frameRate: this.animationFrameRate,
      frames: this.anims.generateFrameNumbers("HumanSpriteSheetselect", {
        start: 12,
        end: 14
      }),
      repeat: -1
    });

    //------------Candle-----------------
    this.anims.create({
      key: "_candleLighted",
      frameRate: this.animationFrameRate,
      frames: this.anims.generateFrameNumbers("candleSpriteSheet", {
        start: 0,
        end: 1
      }),
      repeat: -1
    });

    //Level creation
    this.scene.start('intros');
  }
}