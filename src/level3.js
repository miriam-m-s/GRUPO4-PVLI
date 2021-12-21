import Lights from './lights.js';
import Mirror from './mirror.js';
import Candle from './candle.js';
import Human from './human.js';
import Ghost from './ghost.js'
import Base from './base.js';
import Window from './window.js'
import Pause from './pause.js';
import Music from './music.js';
import Timer from './timer.js'
import BaseScene from './baseScene.js'

/**
 * @extends Phaser.Scene
 *  */

 export default class Level3 extends BaseScene {
  constructor() {

  let posIniFant=[175,250];
  let posIniPers=[50,185];
  let tilemap='tilemap03';
  
  let mirrorPos=null;
  let candlePos=null; 
  let switchPos=[110,180];
  let lampPos=[180,180];

  let posBaseGhost=[180, 80];
  let posBaseHuman=[300, 185];
  let lightsInfo=[[10,130,60],[220,130,60]];

  super(tilemap, lightsInfo,posIniFant,posIniPers,posBaseGhost,posBaseHuman,mirrorPos,candlePos,lampPos,switchPos,'level3','level3');
}

  create() {
    super.create();
  }

}  