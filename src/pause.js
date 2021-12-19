 export default class Pause extends Phaser.GameObjects.Container {

    /** 
     * Constructor del menu de pausa
     * @param {Phaser.Scene} scene Nivel en el que se crea elmenu de pausa
     * @param {int} x posicion x del menu
     * @param {int} y posicion y del menu
     */

    constructor(scene, x, y) {

       super(scene, x, y);
       this.setDepth(10);
       this.fondo = this.scene.add.image(0, 0, 'pauseMenu');
       this.fondo.scale = 0.3;
       let textConfig = {
          fontSize: '20px',
          color: '#ffffff',
          fontFamily: 'Arial'
       };
       this.pauseText = this.scene.add.text(-35, -60, "Paused", textConfig);
       this.resumeText = this.scene.add.text(-35, -7, "Resume", textConfig).setInteractive();
       this.resumeText.scale = 0.6;
       this.resumeText.on('pointerdown', function () {
          this.scene.pauseMenu.clickPause();
       });

       this.restartText = this.scene.add.text(-35, 8, "Restart", textConfig).setInteractive();
       this.restartText.scale = 0.6;
       this.restartText.on('pointerdown', function () {
          this.scene.scene.start('scene');
       });

       this.quitText = this.scene.add.text(-35, 23, "Quit", textConfig).setInteractive();
       this.quitText.scale = 0.6;
       this.quitText.on('pointerdown', function () {
          this.scene.scene.start('mainMenu');
       });

       this.add([this.fondo, this.pauseText, this.resumeText, this.restartText, this.quitText]);
       this.scene.add.existing(this);
    }

 }