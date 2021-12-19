import Boot from './boot.js';
import End from './end.js';
import Scene from './scene.js';
import Intro from './intro.js'; 
import MainMenuScene from './mainMenuScene.js';

let config = 
{
    type: Phaser.WEBGL,
    parent:"mygame",
    roundPixels: true,
    scale: {

        mode: Phaser.Scale.FIT,  
        autoCenter: Phaser.Scale.CENTER_BOTH,
        parent: 'GameContainer',
        max:{
            width: 1400,
            height: 800,
          }
    },
  
    pixelArt: true,
    scene: [Boot,Intro, MainMenuScene, Scene, End],
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
