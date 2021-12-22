/**
 * @extends Phaser.GameObjects.Container
 */
export default class Timer extends Phaser.GameObjects.Container {

    /** La clase Timer crea un contador en la escena que va mostrando el paso del tiempo 
     * en el nivel, adaptadose tambien al paso de minutos.
     * Constructor del Timer 
     * @param {Phaser.Scene} scene Nivel en el que se crea el timer
     * @param {int} x posicion x del timer
     * @param {int} y posicion y del timer
     */

    constructor(scene, x, y) {
       super(scene, x, y);
       this.scene = scene
       this.gameTime = this.scene.add.text(x, y, "0s", {
        font: "15px",
        fill: "#fff",
        align: "right"
      });
      this.gameTime.depth=10;
      this.timer = this.scene.time.addEvent({
        delay: 999999,
        paused: false
      });
      this.totalSeconds=0;
    }

    updateTimer() {
        this.totalSeconds = this.timer.getElapsedSeconds().toFixed(0);
        this.gameTime.setText(this.totalSeconds);
        let minutes = Math.floor(this.totalSeconds / 60);
        let seconds = this.totalSeconds - 60 * minutes;
        if (this.totalSeconds < 60) {
          this.gameTime.setText(seconds + "s");
        } else {
          this.gameTime.setText(minutes + "m" + seconds + "s");
        }
      }

    change(){
        this.timer.paused = !this.timer.paused;
    }

    getTotalSeconds(){
      return this.totalSeconds;
    }

 }