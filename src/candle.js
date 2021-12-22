import Lights from './lights.js';
/**
 * @extends Phaser.GameObjects.Sprite
 */
export default class Candle extends Phaser.GameObjects.Sprite {

  /** La clase Candle representa a las velas de la escena. Pueden ser poseidas por el fantasma, 
   * cambiando asi su posicion, al igual que pueden interactuar con los rayos de luz generando 
   * zonas de luz por las que el humano puede pasar.
   * 
   * @param {Phaser.Scene} scene Escena a la que pertenece el lamp
   * @param {int} x posicion x del candle
   * @param {int} y posicion y del candle
   * @param {Lights} radius  tamano del radio de luz
   */


  constructor(scene, x, y, radius) {
    super(scene, x, y, 'UnselectedCandle');

    // SetUp variables
    this.scene = scene;
    this.x = x;
    this.y = y;
    this.radius = radius;
    this.depth = 5;

    // Fisicas
    this.scene.add.existing(this);
    this.scene.physics.add.existing(this);

    // Variables de Candle
    this.isPossesed = false; // Devuelve 'true' si la candle esta siendo poseida
    this.isOn = false; // Devuelve 'true' si la candle esta encendida
  }

  // Este metodo se ejecuta al ser tocado por un rayo de luz
  RayDetect() {
    if (!this.isOn) {
      // Crear la luz
      this.light = new Lights(this.scene, this.scene.humanPlayer, this.scene.ghostPlayer, this.x - this.radius, this.y - this.radius, this.radius, true);
      this.isOn = true;

      // Si el fantasma esta poseeyendo de la vela y a esta le alcanza un rayo, reiniciar
      if (this.isPossesed) this.scene.ResetLevel();
    }
  }

  preUpdate(t, dt) {
    super.preUpdate(t, dt);
    // Animacion de la vela encendida
    if (this.isOn) this.play('_candleLighted', true);
  }

  SelectObject() {
    if (this.isPossesed) return;
    if (!this.isOn) {
      this.setTexture('SelectedCandle');
    }
  }

  DeselectObject() {
    if (this.isPossesed) return;
    this.setTexture('UnselectedCandle');
  }

  // Este metodo se llama cuando el fantasma ha interactuado con la vela (poseyendola/desposeyendola)
  Interact() {
    if (!this.isOn) {
      this.isPossesed = !this.isPossesed;
      this.setTexture('PossesedCandle');
      this.scene.ghostPlayer.PossessObject(this);
    }
  }
}