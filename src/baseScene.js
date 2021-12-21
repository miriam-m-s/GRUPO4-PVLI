import Lights from './lights.js';
import Lamp from './lamp.js';
import Mirror from './mirror.js';
import Furniture from './furniture.js';
import Candle from './candle.js';
import Human from './human.js';
import Ghost from './ghost.js'
import Base from './base.js';
import Switch from './switch.js'
import Window from './window.js'
import Pause from './pause.js';
import Music from './music.js';
import Timer from './timer.js'


export class BaseScene extends Phaser.Scene {

    static TILE_SIZE = 16; //tamano de tiles de los tilemaps
    constructor(tilemap, lampList, humanList, ghostList) {
        super({
            key: 'baseScene'
        });

        this.tilemap = tilemap;
        this.lampList=lampList;
        this.humanList=humanList;
        this.ghostList=ghostList;
        this.totaltime=0;
    }

    init(datos) {
        this.totaltime = datos.time;
    }
    //Creación de los elementos de la escena principal de juego
    preload() {}

    create() {

        //MAPA TILESET

        //creacion del tilemap
        this.map = this.make.tilemap({
            key: this.tilemap,
            tileWidth: 8,
            tileHeight: 8
        });

        const tileset1 = this.map.addTilesetImage('mansionNes', 'mapSpriteSheet');

        //Capas del tilemap
        this.backgroundLayer = this.map.createLayer('BackLayer', [tileset1]);
        this.colLayer = this.map.createLayer('ColLayer', [tileset1]);
        this.extraLayer = this.map.createLayer('ExtraLayer', [tileset1]);

        //CAMERA
        this.camera = this.cameras.main;
        this.camera.setBounds(0, 0, 8, 8);
        this.camera.zoom = 2.9;

        //Timer
        this.timer = new Timer(this, this.camera.displayWidth - 50, 40); 

        //SOUND
        //Configuracion musica
        const config = {
            mute: false,
            volume: 0.2,
            rate: 1,
            detune: 0,
            seek: 0,
            loop: true,
            delay: 0,
        }; // config es opcional

        this.music = this.sound.add("bckMusic", config);
        this.exit = this.sound.add('exit');
        this.music.play();

        //MUSIC BUTTON
        this.musicOn = true;
        this.musica = this.add.image(this.camera.displayWidth - 40, 20, 'musicButton').setInteractive();
        this.stoppedMusic = this.add.image(this.camera.displayWidth - 40, 20, 'stoppedMusicButton').setInteractive();
        this.stoppedMusic.alpha = 0;
        this.musica.scale = 0.01;
        this.stoppedMusic.scale = 0.01;
        this.sceneSound = new Music(this, 190, 20);
        this.musica.on('pointerdown', function () {
            this.scene.sceneSound.clickMusic();
        });
        this.stoppedMusic.on('pointerdown', function () {
            this.scene.sceneSound.clickMusic();
        });

        //BOTON DE PAUSA Y ESC
        this.isPaused = false;
        this.pauseMenu = new Pause(this, this.camera.centerX / this.camera.zoom, this.camera.centerY / this.camera.zoom, 0, 'level1');
        this.escape = this.input.keyboard.addKey('ESC');
        this.escape.on('down', () => {
            this.pauseMenu.clickPause();
        });
        this.pausa = this.add.image(this.camera.displayWidth - 15, 20, 'pauseButton').setInteractive();
        this.playButton = this.add.image(this.camera.displayWidth - 15, 20, 'playButton').setInteractive();
        this.pausa.scale = 0.05;
        this.playButton.scale = 0.05;
        this.playButton.alpha = 0;
        this.pausa.on('pointerdown', function () {
            this.scene.pauseMenu.clickPause();
        });
        this.playButton.on('pointerdown', function () {
            this.scene.pauseMenu.clickPause();
        });


        //OBJETOS DE LA ESCENA
        
        let humanList; //lista de objetos humanos
        let ghostList; //lista de objetos poseibles
        let lampList;

        //Lista de lamparas base
        lampList = [];
        
        //Lista de 
        humanList = [];

        ghostList = [];

        //CAMBIAR ESTO EN FANTASMA / HUMANO

        this.humanPlayer = new Human(this, 130, 100, true, humanList);

        this.ghostPlayer = new Ghost(this, 180, 100, false, ghostList);

        this.basepers = new Base(this, this.humanPlayer, 'basepers', 70, 110);
        this.basefant = new Base(this, this.ghostPlayer, 'basefantas', 185, 75);

        
        this.colLayer.setCollisionByProperty({
            colisiona: true
        });

        this.physics.add.collider(this.ghostPlayer, this.colLayer);

        this.physics.add.collider(this.ghostPlayer, this.extraLayer);
        this.extraLayer.setCollisionByProperty({
            colisiona: true
        });
    }

    ResetLevel() {
        let tim=this.timer.getTotalSeconds();
        this.scene.start('end',{ time:tim });
    }
    //Check the final de nivel para ambos jugadores
    update() {
        this.timer.updateTimer();
        if (this.basefant.ininbase() && this.basepers.ininbase()) {
            let tim=this.timer.getTotalSeconds();
            this.scene.start('end',{ time: tim });
        }

    }

    levelPaused() {
        return this.isPaused;
    }
}