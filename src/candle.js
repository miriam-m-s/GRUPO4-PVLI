import Lights from './lights.js';

export default class Candle extends Phaser.GameObjects.Sprite {

    /**
     * Constructor de la Plataforma
     * @param {Phaser.Scene} scene Escena a la que pertenece la plataforma
     * @param {Phaser.GameObjects.Group} furnitureGroup Grupo en el que se incluirán los muebles
     */
    constructor(scene, ghostPlayer, furnitureGroup, x, y, radius, sprite) {
      super(scene, x, y, sprite);
  
      this.scene = scene;
      this.player = ghostPlayer;

      this.posX = x;
      this.posY = y;

      this.radius = radius;

      //this.body.setSize(20, 20, false);

  
      this.scene.add.existing(this);
      this.scene.physics.add.existing(this);
  
      this.isPossesed = false;

      this.isOn = false;
      //this.debugIndicator = this.scene.physics.add.sprite(this.body.x, this.body.y, 'debugIndic');
    }

    Mirrordetect() {
      if (!this.isOn) {
        console.log("light candle");
        this.light = new Lights(this.scene, this.scene.humanPlayer, this.scene.ghostPlayer, this.scene.lights, this.x - this.radius, this.y - this.radius, this.radius, true);
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