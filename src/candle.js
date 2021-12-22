import Lights from './lights.js';

export default class Candle extends Phaser.GameObjects.Sprite {

    /**
     * Constructor de la Vela
     * @param {Phaser.Scene} scene Escena a la que pertenece
     */
    constructor(scene, ghostPlayer, x, y, radius) {
      super(scene, x, y, 'UnselectedCandle');
  
      this.scene = scene;
      this.player = ghostPlayer;

      this.posX = x;
      this.posY = y;
      this.depth = 4;

      this.radius = radius; 
      this.scene.add.existing(this);
      this.scene.physics.add.existing(this);
  
      this.isPossesed = false;

      this.isOn = false;
    }

    Mirrordetect() {
      if (!this.isOn) {
        this.light = new Lights(this.scene, this.scene.humanPlayer, this.scene.ghostPlayer, this.x - this.radius, this.y - this.radius, this.radius, true);
        this.isOn = true;
        
        // Si el fantasma esta dentro de la vela reiniciar el nivel
        if (this.isPossesed) this.scene.ResetLevel();
      }
    }
    preUpdate(t, dt) {
        super.preUpdate(t, dt);

        if (this.isOn) this.play('_candleLighted', true);
    }

    SelectObject() {
      if (this.isPossesed) return;
      if (!this.isOn){
        this.scale = 1.05;
        this.setTexture('SelectedCandle');
      }
    }
  
    DeselectObject() {
      if (this.isPossesed) return;
      this.scale = 1;
      this.setTexture('UnselectedCandle');
    }
  
    Interact() {
      if (!this.isOn){this.isPossesed = !this.isPossesed;
        this.setTexture('PossesedCandle');
        this.body.depth = 3;
    
        this.scene.ghostPlayer.PossessObject(this);}
      
    }
  }