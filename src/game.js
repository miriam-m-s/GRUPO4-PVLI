import Boot from './boot.js';
import End from './end.js';
import Level from './scene.js';
import Intro from './intro.js'; 
import MainMenuScene from './mainMenuScene.js';

let config = 
{
    type: Phaser.WEBGL,
    parent:"mygame",
    roundPixels: true,
    scale: {

        height:300,
        width:400,
        //mode:Phaser.Scale.FIT,
        //autoCenter: Phaser.Scale.CENTER_BOTH,
        zoom: 2
    },
  
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
