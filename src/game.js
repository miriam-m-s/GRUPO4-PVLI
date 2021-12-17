import Boot from './boot.js';
import End from './end.js';
import Level from './scene.js';
import Intro from './intro.js'; 
import MainMenuScene from './mainMenuScene.js';

let config = 
{
    type: Phaser.WEBGL,
    //NES aspect ratio es 8:7
    width:  400,
    height: 220,
    roundPixels: true,
    scale: {
        parent: 'mygame',
        autoCenter: Phaser.Scale.CENTER_BOTH
    },
    zoom: 1.4,
    pixelArt: true,
    scene: [Boot,Intro, MainMenuScene, Level, End],
    physics: { 
        default: 'arcade', 
        arcade: { 
            debug: true
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
