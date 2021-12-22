 /**
 * @extends Phaser.GameObjects.Container
 */
 export default class Pause extends Phaser.GameObjects.Container {

    /** 
     * Constructor del menu de pausa. Genera una imagen con  textos interactuables, 
     * con las opciones de reiniciar el nivel, volver al menu o reanudar la partida.
     * @param {Phaser.Scene} scene Nivel en el que se crea elmenu de pausa
     * @param {int} x posicion x del menu
     * @param {int} y posicion y del menu
     * @param {int} alpha transparencia del menu al crearse
     * @param {string} levelName nombre del nivel en el que se va a crear el menu
     */

    constructor(scene, x, y, alpha, levelName) {

       //Asignacion de los parametros

       super(scene, x, y);

       this.alpha = alpha;
       this.scene = scene;

       //Creacion del fondo sobre el que se muestran las letras
       this.fondo = this.scene.add.image(0, 0, 'pauseMenu');
       this.fondo.scale = 0.3;

       //Configuracion del texto
       let textConfig = {
          fontSize: '20px',
          color: '#ffffff',
          fontFamily: 'Arial'
       };

       //Texto de pausa
       this.pauseText = this.scene.add.text(-35, -62, "Paused", textConfig);

       //Texto para reanudar nivel
       this.resumeText = this.scene.add.text(-25, -7, "Resume", textConfig).setInteractive();
       this.resumeText.scale = 0.6;
       this.resumeText.on('pointerdown', function () {
          this.scene.pauseMenu.clickPause();
       });

       //Texto para reiniciar nivel
       this.restartText = this.scene.add.text(-25, 8, "Restart", textConfig).setInteractive();
       this.restartText.scale = 0.6;
       this.restartText.on('pointerdown', function () {
          this.scene.scene.start(levelName);
       });

       //Texto para volver al menu
       this.quitText = this.scene.add.text(-25, 23, "Quit", textConfig).setInteractive();
       this.quitText.scale = 0.6;
       this.quitText.on('pointerdown', function () {
          this.scene.scene.start('mainMenu');
       });

       //Profundidad del menu
       this.depth = 100;

       //Se anaden todos los elementos al contenedor
       this.add([this.fondo, this.pauseText, this.resumeText, this.restartText, this.quitText]);

       //Se anade el contenedor a la escena
       this.scene.add.existing(this);
    }

    //Metodo que se ejecuta al pausar el juego
    clickPause() {

       //Cambia el alpha del menu y boton para que sea o no visible
       this.scene.pausa.alpha = !this.scene.pausa.alpha;
       this.scene.playButton.alpha = !this.scene.playButton.alpha;

       //Cambia la variable que indica si la pausa esta activa
       this.scene.isPaused = !this.scene.isPaused;

       if (this.scene.isPaused) {
          //Pausa todas las animaciones de la escena, lo activa y sube su alpha
          this.scene.anims.pauseAll();
          this.active = true;
          this.alpha = 1;

          //Para la musica y hace un sonido indicando que se ha activado el menu
          this.scene.music.stop();
          if (this.scene.musicOn) this.scene.exit.play();

       } else //Lo desactiva
       {
          //Visual
          this.active = false;
          this.alpha = 0;
          this.scene.anims.resumeAll(); //Reanuda las animaciones que habia activas al pausar la escena

          //Vuelve a sonar la musica
          if (this.scene.musicOn) this.scene.music.play();
       }

       //Avisa al timer de si el juego esta pausado o no
       this.scene.timer.change();
    }

 }