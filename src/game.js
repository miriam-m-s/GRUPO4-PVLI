import Boot from './boot.js';
import End from './end.js';
import MainMenuScene from './mainMenuScene.js';
import Level from './scene.js';
import Nivel from './scena1.js'

let config = {
    type: Phaser.WEBGL,
    //NES aspect ratio es 8:7
    width: 400,
    height: 350,
    roundPixels: true,
    scale: {
        mode: Phaser.Scale.FIT,
        autoCenter: Phaser.Scale.CENTER_BOTH,

    },
    zoom: 2.1,
    pixelArt: true,
    scene: [Boot,Nivel , End],
    physics: {
        default: 'arcade',
        arcade: {
            debug: true
        }
    },
    audio: {
        disableWebAudio: true
    }
};

new Phaser.Game(config);