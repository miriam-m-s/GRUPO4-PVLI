import BaseScene from './baseScene.js'

/**
 * @extends Phaser.Scene
 *  */

 export default class Level3 extends BaseScene {
  constructor() {

  let posIniFant=[175,250];
  let posIniPers=[85,185];
  let tilemap='tilemap03';
  
  let furniturePos=null;
  let mirrorPos=null;
  let candlePos=null;
  // let switchPos=[[100,185],[240,185]];
  let switchPos=[280,185];
  let lampPos=[180,180];

  let posBaseGhost=[180, 80];   
  let posBaseHuman=[30, 190];
  let lightsInfo=[[10,130,60],[220,130,60]];

  super(tilemap, lightsInfo,posIniFant,posIniPers,posBaseGhost,posBaseHuman,furniturePos,mirrorPos,candlePos,lampPos,switchPos,'level3','level4');
}

  create() {
    super.create();
  }

}  