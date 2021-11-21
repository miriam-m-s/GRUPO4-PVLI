import Boot from './boot.js';
import End from './end.js';
import Platform from './platform.js';
import Level from './scene.js';

/**
 * Inicio del juego en Phaser. Creamos el archivo de configuración del juego y creamos
 * la clase Game de Phaser, encargada de crear e iniciar el juego.
 */
let config = 
{
    type: Phaser.ENVELOP,
    //NES aspect ratio es 8:7
    width:  400,
    height: 350,
    //roundPixels: true,
    scale: {
        mode: Phaser.Scale.FIT,  
        autoCenter: Phaser.Scale.CENTER_BOTH,
        zoom: 1
    },
    pixelArt: true,
    scene: [Boot, Level, End],
    physics: { 
        default: 'arcade', 
        arcade: { 
            debug: false
        } 
    }
};

new Phaser.Game(config);
