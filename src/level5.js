import BaseScene from './baseScene.js'
import Window from './window.js';

/**
 * @extends Phaser.Scene
 *  */

 export default class Level5 extends BaseScene {
  constructor() {

  let posIniFant=[20,200];
  let posIniPers=[170,230];
  let tilemap='tilemap05';
  
  let furniturePos=[30,200];
  let mirrorPos=null;
  let candlePos=[250,120]; 
  // let switchPos=[[150,100],[220,240]];
  let switchPos=[180,100];
  let lampPos=[270,220];

  let posBaseGhost=[285,90];
  let posBaseHuman=[335,120];
  let lightsInfo=[[80,70,80]];

  super(tilemap, lightsInfo,posIniFant,posIniPers,posBaseGhost,posBaseHuman,furniturePos,mirrorPos,candlePos,lampPos,switchPos,'level5','congrats');
}

  create() {
    super.create();
    this.raycaster = this.raycasterPlugin.createRaycaster();
    //objetos que reaccionan al raycast
    this.dynamicObstacles = [
        this.ghostPlayer,this.humanPlayer,this.extraLayer,this.candle, this.furniture
    ];

    this.raycaster.mapGameObjects(this.dynamicObstacles, true);

    this.window = new Window(this, 5, 120, 0);
  }

}  