import Boot from './boot.js';
import Intro from './intro.js'; 
import IntroClip from './introClip.js'; 
import Level1 from './level1.js';
import Level2 from './level2.js';
import Level3 from './level3.js';
import Level4 from  './level4.js';
import Level5 from  './level5.js';
import Level6 from  './level6.js';
import Congrats from './congrats.js';
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
    scene: [Boot, Intro, MainMenuScene, IntroClip, Level1, Level2, Level3, Level4,Level5, Level6, Congrats],
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
