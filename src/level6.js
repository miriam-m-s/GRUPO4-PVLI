import BaseScene from './baseScene.js'
import Window from './window.js';
/**
 * @extends Phaser.Scene
 */

export default class Level6 extends BaseScene {
    constructor() {
      let posIniFant=[100,120];
      let posIniPers=[330,170];
      let tilemap='tilemap02';
      
      let furniturePos=null;
      let mirrorPos=[[80,90,180], [35,160,0], [120,90,270]];
      let candlePos=[280,90,40];
      let switchPos=[310,170];
      let lampPos=[260,90];
  
      let posBaseGhost=[100, 180];
      let posBaseHuman=[230, 90];
      let lightsInfo=[[-10,120,40],[300,145,30]];
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

    this.window = new Window(this, 192, 35, 270);
  }
}