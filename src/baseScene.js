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
    //PARAMETROS DEL CONSTRUCTOR

     * @param {string} tilemap nombre del tilemap para esa escena
     * @param {Array of Arrays} lightsInfo info luces
     * @param {Array} posIniFant posicion inicial del fantasma (x,y)
     * @param {Array} posIniPers posicion inicial del humano (x,y)
     * @param {Array} posBaseGhost posicion base fantasma (x,y)
     * @param {Array} posBaseHuman posicion base humano (x, y)
     * @param {Array} furniturePos posicion del furniture(x, y)
     * @param {Array} mirrorpos posicion del mirror(x, y)
     * @param {Array} candlepos posicion de la candle (x, y)
     * @param {Array} lampPos posicion de la lampara (x, y)
     * @param {Array} switchPos posicion de la lampara (x, y)
     * @param {string} level nombre del nivel actual
     * @param {string} nextLevel nombre del siguiente nivel
     * 
     */

    static TILE_SIZE = 16; //tamano de tiles de los tilemaps
    constructor(tilemap, lightsInfo, posIniFant, posIniPers, posBaseGhost, posBaseHuman, furniturePos, mirrorpos, candlepos, lampPos, switchPos, level, nextLevel) {
        super({
            key: level
        });

        //Asignacion de los parametros en el constructor
        this.totaltime = 0;
        this.level = level;
        this.nextLevel = nextLevel;
        this.tilemap = tilemap;
        this.posBaseGhost = posBaseGhost;
        this.posBaseHUman = posBaseHuman;
        this.posIniFant = posIniFant;
        this.posIniPers = posIniPers;
        this.furniturePos = furniturePos;
        this.lightsInfo = lightsInfo;

        this.candlepos = candlepos;
        this.mirrorpos = mirrorpos;
        this.lampPos = lampPos;
        this.switchPos = switchPos;
    }

    //Utilizado para acumular el tiempo hasta el final de la partida

    init(datos) {
        if (datos.time != null) {
            this.totaltime = datos.time;
        } else {
            this.totaltime = 0;
        }
    }

    //CREACION DE LOS ELEMENTOS PRINCIPALES DE LA ESCENA

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

        //Capa de fondo 
        this.backgroundLayer = this.map.createLayer('BackLayer', [tileset1]);
        this.backgroundLayer.depth = 1;

        //Capa de colision
        this.colLayer = this.map.createLayer('ColLayer', [tileset1]);
        this.colLayer.depth = 3;

        //Capa con objetos extra
        this.extraLayer = this.map.createLayer('ExtraLayer', [tileset1]);
        this.extraLayer.depth = 4;
        //CAMARA
        this.camera = this.cameras.main;
        this.camera.setBounds(0, 0, 8, 8);
        this.camera.zoom = 2.9;

        //TIMER
        this.timer = new Timer(this, this.camera.displayWidth - 50, 40);

        //MUSICA Y SONIDO
        this.sceneMusic();

        //PAUSA 
        this.pauseButton();

        //OBJETOS DE LA ESCENA
        let humanList;
        let ghostList; //lista de objetos poseibles
        let lampList;

        //Lista de objetos interactuables para el humano
        if (this.switchPos) {
            humanList = [
                this.switch = new Switch(this, this.switchPos[0], this.switchPos[1])
            ];
        } else humanList = [];

        //Lista de objetos interactuables para el fantasma
        //En caso de que en el nivel haya velas y espejos
        this.mirror = []
        if (this.candlepos && this.mirrorpos) {
            ghostList = [
                this.candle = new Candle(this, this.candlepos[0], this.candlepos[1], this.candlepos[2])
            ];
            for (let i = 0; i < this.mirrorpos.length; i++) {
                let m = new Mirror(this, this.mirrorpos[i][0], this.mirrorpos[i][1], this.mirrorpos[i][2])
                ghostList.push(m)
                this.mirror.push(m)
            }
        }
        //En caso de que solo haya velas
        else if (this.candlepos && this.furniturePos) {
            ghostList = [
                this.candle = new Candle(this, this.ghostPlayer, this.candlepos[0], this.candlepos[1], this.candlepos[2]),
                this.furniture = new Furniture(this, this.ghostPlayer, this.furniturePos[0], this.furniturePos[1])
            ];
        } else ghostList = [];


        this.humanPlayer = new Human(this, this.posIniPers[0], this.posIniPers[1], true, humanList);

        this.ghostPlayer = new Ghost(this, this.posIniFant[0], this.posIniFant[1], false, ghostList);
        if (this.lampPos) {
            this.lamp = new Lamp(this, this.lampPos[0], this.lampPos[1], 50);
        }

        for (let i = 0; i < this.lightsInfo.length; i++) {
            new Lights(this, this.humanPlayer, this.ghostPlayer, this.lightsInfo[i][0], this.lightsInfo[i][1], this.lightsInfo[i][2]);
        }

        this.basepers = new Base(this, this.humanPlayer, 'basepers', this.posBaseHUman[0], this.posBaseHUman[1]);
        this.basefant = new Base(this, this.ghostPlayer, 'basefantas', this.posBaseGhost[0], this.posBaseGhost[1]);

        //Colisiones con las cosas
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
        console.log(this.totaltime + tim);
        this.scene.start(this.level, {
            time: this.totaltime + Number(tim)
        });
    }
    //Check the final de nivel para ambos jugadores
    update() {
        this.timer.updateTimer();

        if (this.basefant.isInbase() && this.basepers.isInbase()) {
            let tim = this.timer.getTotalSeconds();
            this.scene.start(this.nextLevel, {
                time: this.totaltime + Number(tim),
            });
        }
    }

    levelPaused() {
        return this.isPaused;
    }

    pauseButton(){
        this.isPaused = false;
        this.pauseMenu = new Pause(this, this.camera.centerX / this.camera.zoom, this.camera.centerY / this.camera.zoom, 0, this.level);

        //Tecla ESC para activar el menu de pausa 
        this.escape = this.input.keyboard.addKey('ESC');
        this.escape.on('down', () => {
            this.pauseMenu.clickPause();
        });
        this.pausa = this.add.image(this.camera.displayWidth - 15, 20, 'pauseButton').setInteractive();
        this.pausa.depth = 10;
        this.playButton = this.add.image(this.camera.displayWidth - 15, 20, 'playButton').setInteractive();
        this.pausa.scale = 0.05;
        this.playButton.depth = 10;
        this.playButton.scale = 0.05;
        this.playButton.alpha = 0;
        this.pausa.on('pointerdown', function () {
            this.scene.pauseMenu.clickPause();
        });
        this.playButton.on('pointerdown', function () {
            this.scene.pauseMenu.clickPause();
        });

    }

    sceneMusic(){
        //Configuracion musica
        const config = {
            mute: false,
            volume: 0.2,
            rate: 1,
            detune: 0,
            seek: 0,
            loop: true,
            delay: 0,
        };
        this.music = this.sound.add("bckMusic", config); //sonido de fundal
        this.exit = this.sound.add('exit'); //sonido pausa
        this.music.play(); //empienza el sonido para el nivel

        //Boton para activar y desactivar la musica
        this.musicOn = true;
        this.musica = this.add.image(this.camera.displayWidth - 40, 20, 'musicButton').setInteractive();
        this.stoppedMusic = this.add.image(this.camera.displayWidth - 40, 20, 'stoppedMusicButton').setInteractive();
        this.musica.depth = 10;
        this.stoppedMusic.depth = 10;
        this.musica.scale = 0.01;
        this.stoppedMusic.scale = 0.01;
        this.stoppedMusic.alpha = 0;

        //Tecla 'M' para activar y desactivar la musica
        this.sceneSound = new Music(this, 190, 20);
        this.mkey = this.input.keyboard.addKey('M');
        this.mkey.on('down', () => {
            this.sceneSound.clickMusic();
        });
        this.musica.on('pointerdown', function () {
            this.scene.sceneSound.clickMusic();
        });
        this.stoppedMusic.on('pointerdown', function () {
            this.scene.sceneSound.clickMusic();
        });
    }
}