import BaseScene from './baseScene.js'
import Window from './window.js';

/**
 * @extends Phaser.Scene
 *  */

 export default class Level4 extends BaseScene {
  constructor() {

  let posIniFant=[330,120];
  let posIniPers=[170,230];
  let tilemap='tilemap04';
  
  let furniturePos=null;
  let mirrorPos=null;
  let candlePos=null;
  let switchPos=[195,80];
  let lampPos=[140,145];

  let posBaseGhost=[40,240];
  let posBaseHuman=[130,230];
  let lightsInfo=[[90,190,70],[145,-10,70]];

  super(tilemap, lightsInfo,posIniFant,posIniPers,posBaseGhost,posBaseHuman,furniturePos,mirrorPos,candlePos,lampPos,switchPos,'level4','level5');
}

  create() {
    super.create();
    this.raycaster = this.raycasterPlugin.createRaycaster();
    //objetos que reaccionan al raycast
    this.dynamicObstacles = [
        this.ghostPlayer,this.humanPlayer,this.extraLayer
    ];

    this.raycaster.mapGameObjects(this.dynamicObstacles, true);

    this.window = new Window(this, 265, 55, 270);
  }

}  