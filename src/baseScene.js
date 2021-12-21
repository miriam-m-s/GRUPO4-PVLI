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


export default class BaseScene extends Phaser.Scene {
    /**
     * Constructor de la Plataforma
     * @param {Phaser.Scene}
     * @param {string} tilemap nombre del tilemap para esa escena
     * @param {Array} lampList array de lamparas 
     * @param {Array} humanList array de objetos interactuables para el humano 
     * @param {Array} ghostList array de obbjetos interactuables para el fantasma
     * @param {Array} posIniFant posicion inicial del fantasma (x,y)
     * @param {Array} posIniPers posicion inicial del humano (x,y)
     * @param {Array} posBaseGhost posicion base fantasma (x,y)
     * @param {Array} posBaseGhost posicion base humano (x, y)
     */

    static TILE_SIZE = 16; //tamano de tiles de los tilemaps
    constructor(tilemap, lampList, lightsInfo, humanList, ghostList, posIniFant, posIniPers, posBaseGhost, posBaseHuman, level) {
        super({
            key: level
        });

        this.posBaseGhost = posBaseGhost;
        this.posBaseHUman = posBaseHuman;
        this.tilemap = tilemap;
        this.lampList = lampList;
        this.humanList = humanList;
        this.ghostList = ghostList;
        this.lightsInfo = lightsInfo;
        this.totaltime = 0;
        this.posIniFant = posIniFant;
        this.posIniPers = posIniPers;
    }


    init(datos) {
        this.totaltime = datos.time;
    }
    //Creacion de los elementos de la escena principal de juego
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
        this.backgroundLayer.depth = 1;


        this.colLayer = this.map.createLayer('ColLayer', [tileset1]);
        this.colLayer.depth = 3;
        this.extraLayer = this.map.createLayer('ExtraLayer', [tileset1]);
        this.extraLayer.depth = 4;

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


        // MUSIC
        this.music = this.sound.add("bckMusic", config);
        this.exit = this.sound.add('exit');
        this.music.play();

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


        // PAUSE
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

        //Lista de objetos interactuables para el humano
        humanList = [];

        //Lista de objetos interactuables para el fantasma
        ghostList = [];

        //CAMBIAR ESTO EN FANTASMA / HUMANO

        this.humanPlayer = new Human(this, this.posIniPers[0], this.posIniPers[1], true, humanList);

        this.ghostPlayer = new Ghost(this, this.posIniFant[0], this.posIniFant[1], false, ghostList);

        for (let i = 0; i < this.lightsInfo.length; i++) {
            new Lights(this, this.humanPlayer, this.ghostPlayer, this.lightsInfo[i][0], this.lightsInfo[i][1], this.lightsInfo[i][2]);
        }

        this.basepers = new Base(this, this.humanPlayer, 'basepers', this.posBaseHUman[0], this.posBaseHUman[1]);
        this.basefant = new Base(this, this.ghostPlayer, 'basefantas', this.posBaseGhost[0], this.posBaseGhost[1]);


        this.colLayer.setCollisionByProperty({
            colisiona: true
        });
        this.physics.add.collider(this.ghostPlayer, this.colLayer);
        this.physics.add.collider(this.ghostPlayer, this.extraLayer);

        this.extraLayer.setCollisionByProperty({
            colisiona: true
        });
        this.physics.add.collider(this.humanPlayer, this.colLayer);
        this.physics.add.collider(this.humanPlayer, this.extraLayer);

    }


    ResetLevel() {
        let tim = this.timer.getTotalSeconds();
        this.scene.start('end', {
            time: tim
        });
    }
    //Check the final de nivel para ambos jugadores
    update() {
        this.timer.updateTimer();
        if (this.basefant.isInbase() && this.basepers.isInbase()) {
            let tim = this.timer.getTotalSeconds();
            this.scene.start('end', {
                time: tim
            });
        }

    }

    levelPaused() {
        return this.isPaused;
    }
}