import Ghost from './ghost.js'
import Human from './human.js';
import Furniture from './furniture.js';
import Mirror from './mirror.js';
import Lamp from './lamp.js';
import Lights from './lights.js';
import Pause from './pause.js';
import Window from './window.js'
export default class Nivel extends Phaser.Scene {


    constructor() {
        super({
            key: 'nivel'
        });
    }
    preload() {
        this.load.plugin('rexraycasterplugin', 'https://raw.githubusercontent.com/rexrainbow/phaser3-rex-notes/master/dist/rexraycasterplugin.min.js', true);
      }
    create() {
        this.furnitureGroup = this.add.group();
        this.mirrorGroup = this.add.group();
        this.ghostList = [
            this.furniture = new Furniture(this, this.ghostPlayer, this.furnitureGroup, 130, 135, 'furniture'),
            this.furniture2 = new Furniture(this, this.ghostPlayer, this.furnitureGroup, 170, 135, 'furniture'),
            this.mirror = new Mirror(this, this.mirrorGroup, 20, 80, 0)
        ];

        this.humanList = [
            new Lamp(this, 60, 80, 'lampDefault', this.humanPlayer, this.ghostPlayer, this.lampGroup),
            new Lamp(this, 190, 150, 'lampDefault', this.humanPlayer, this.ghostPlayer, this.lampGroup)
        ];
        this.ghostPlayer = new Ghost(this, 180, 100, false, this.ghostList);
        this.humanPlayer = new Human(this, 130, 100, true, this.humanList);
        let textConfig = {
            fontSize: '20px',
            color: '#ffffff',
            fontFamily: 'Arial'
        };
        this.lights = this.add.group();
        new Lights(this, this.humanPlayer, this.ghostPlayer, this.lights, 60, 60, 50);
        this.HEY = this.add.text(100, 100, "Resume", textConfig).setInteractive();
        this.HEY.scale = 0.6;
        this.HEY.on('pointerdown', function () {
            this.scene.scene.start('end');

        });




        this.isPaused = false;
        this.escape = this.input.keyboard.addKey('ESC');
        this.escape.on('down', () => {
            this.exit.play();
            this.music.stop();
            this.isPaused = !this.isPaused;
            this.clickPause();
        });
        this.pausa = this.add.image(225, 20, 'pauseButton').setInteractive();
        this.pausa.scale = 0.05;

        this.pausa.on('pointerdown', function () {
            //this.scene.scene.pause();
            this.scene.isPaused = !this.scene.isPaused;
            this.scene.clickPause();

        });

        this.pauseMenu = null;
        //RAYCAST OBJECTS
        this.staticObstacles = [];


        this.dynamicObstacles = [
            this.humanPlayer,
            this.ghostPlayer, this.mirror, this.furniture2, this.furniture
        ];



        this.raycaster = this.plugins.get('rexraycasterplugin').add()
            .addObstacle(this.staticObstacles)
            .addObstacle(this.dynamicObstacles)


        this.window = new Window(this, this.graphics, 20, 200, this.raycaster, 90);
    }
    DoRaycast(x, y, angle, mirrorDetector, graphic) {

        RunRaycaster(this.raycaster,
            x, y, angle,
            graphic,
            mirrorDetector
        );
    }

    ResetLevel() {
        console.log("RESET LEVEL");
        this.scene.start('end');
    }
    //Check the final de nivel para ambos jugadores
    update() {
        //this.updateTimer();

        // if (this.basefant.ininbase() && this.basepers.ininbase()) {
        //     console.log("NEXT LEVEL");
        //     this.scene.start('end');
        // }
        this.raycaster.updateObstacle(this.dynamicObstacles);
    }
    clickPause() {
        if (this.isPaused) //Crea el menu con los botones
        {
            if (this.pauseMenu === null) {
                this.pauseMenu = new Pause(this, 120, 130);
            }
            this.pauseMenu.active = true;
            this.pauseMenu.alpha = 1;
            this.anims.pauseAll(); //Pausa todas las animaciones de la escena
        } else //Lo destruye
        {
            this.pauseMenu.active = false;
            this.pauseMenu.alpha = 0;
            this.music.play();
            this.anims.resumeAll(); //Reanuda las animaciones que habia activas al pausar la escena
        }
        this.timer.paused = !this.timer.paused;
    }

    levelPaused() {
        return this.isPaused;
    }

}
//raycaster calculate positions of rays
let RunRaycaster = function (raycaster, x, y, angle, debugGraphics, mirrorDetector) {
    debugGraphics
        .clear()
        .fillStyle(0xC4C400)


    const MaxReflectionCount = 1000;
    for (let i = 0; i < MaxReflectionCount; i++) {
        let result = raycaster.rayToward(x, y, angle);
        debugGraphics
            .lineStyle(2, 0xFFFFF)
            .strokeLineShape(raycaster.ray);


        mirrorDetector.setPosition(result.x, result.y);


        break;

    }
}