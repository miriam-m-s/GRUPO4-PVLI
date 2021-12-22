import BaseScene from './baseScene.js'
import Window from './window.js';
/**
 * @extends Phaser.Scene
 */

export default class Level6 extends BaseScene {
    constructor() {
      let posIniFant=[80,170];
      let posIniPers=[330,160];
      let tilemap='tilemap02';
      
      let furniturePos=null;
      let mirrorPos=[[50,150,180], [90,110,0], [70,150,90]];
      let candlePos=[270,70,40];
      let switchPos=[310,160];
      let lampPos=[250,90];
  
      let posBaseGhost=[80, 170];
      let posBaseHuman=[210, 80];
      let lightsInfo=[[20,30,60],[300,130,30]];
      super(tilemap, lightsInfo,posIniFant,posIniPers,posBaseGhost,posBaseHuman,furniturePos, mirrorPos,candlePos,lampPos,switchPos,'level6','congrats');
  }

  create() {
    
    //Objetos Fantasma(muebles/espejo)
    
    super.create();

    //CREACIÓN DEL RAYCAST
    this.raycaster = this.raycasterPlugin.createRaycaster();
    //objetos que reaccionan al raycast
    this.dynamicObstacles = [
       this.candle,this.ghostPlayer,this.humanPlayer,this.extraLayer
    ];
    
    for (let i = 0; i < this.mirror.length; i++) {
        this.dynamicObstacles.push(this.mirror[i])
    }

    this.raycaster.mapGameObjects(this.dynamicObstacles, true);

    this.window = new Window(this, 193, 35, 270);
  }
}