/**
 
 * @extends Phaser.GameObjects.Sprite
 */
 export default class Lamp extends Phaser.GameObjects.Sprite {
  
    /**
     * Constructor de Star
     * @param {Scene} scene Escena en la que esta el objeto
     * @param {number} x coordenada x
     * @param {number} y coordenada y
     */
    
    constructor(scene, x, y) {
      super(scene, x, y, 'lamp');
      this.scene.add.existing(this);
      this.scene.physics.add.existing(this, true);
    }
   
}
  