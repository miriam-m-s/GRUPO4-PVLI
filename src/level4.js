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
  
  let mirrorPos=null;
  let candlePos=null; 
  let switchPos=[[150,100],[220,240]];
  let lampPos=[100,175];

  let posBaseGhost=[50,185];
  let posBaseHuman=[130,230];
  let lightsInfo=[[90,190,70],[50,-80,120]];

  super(tilemap, lightsInfo,posIniFant,posIniPers,posBaseGhost,posBaseHuman,mirrorPos,candlePos,lampPos,switchPos,'level4','congrats');
}

  create() {
    super.create();
    this.raycaster = this.raycasterPlugin.createRaycaster();
    //objetos que reaccionan al raycast
    this.dynamicObstacles = [
        this.ghostPlayer,this.humanPlayer,this.extraLayer
    ];

    this.raycaster.mapGameObjects(this.dynamicObstacles, true);

    this.window = new Window(this, 275, 55, 270);
  }

}  