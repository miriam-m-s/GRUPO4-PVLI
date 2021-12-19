export default class Timer extends Phaser.GameObjects.Container {

    /** 
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
      this.timer = this.scene.time.addEvent({
        delay: 999999,
        paused: false
      });
    }

    updateTimer() {
        let totalSeconds = this.timer.getElapsedSeconds().toFixed(0);
        this.gameTime.setText(totalSeconds);
        let minutes = Math.floor(totalSeconds / 60);
        let seconds = totalSeconds - 60 * minutes;
        if (totalSeconds < 60) {
          this.gameTime.setText(seconds + "s");
        } else {
          this.gameTime.setText(minutes + "m" + seconds + "s");
        }
      }

    change(){
        this.timer.paused = !this.timer.paused;
    }

 }