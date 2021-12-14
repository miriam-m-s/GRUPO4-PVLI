import Boot from './boot.js';
import End from './end.js';
import Platform from './platform.js';
import Level from './scene.js';
import MainMenuScene from './mainMenuScene.js';

let config = 
{
    type: Phaser.WEBGL,
    //NES aspect ratio es 8:7
    width:  400,
    height: 350,
    roundPixels: true,
    scale: {
        parent: 'mygame',
        autoCenter: Phaser.Scale.CENTER_BOTH
        //autoCenter: Phaser.Scale.CENTER_BOTH,
    },
    zoom: 1.4,
    pixelArt: true,
    scene: [Boot, MainMenuScene, Level, End],
    physics: { 
        default: 'arcade', 
        arcade: { 
            debug: false
        } 
    },
    plugins: {
        scene: [
            {
                key: 'PhaserRaycaster',
                plugin: PhaserRaycaster,
                mapping: 'raycasterPlugin'
            }
        ]
    },
    audio: {
        disableWebAudio: true
    }
};

new Phaser.Game(config);
