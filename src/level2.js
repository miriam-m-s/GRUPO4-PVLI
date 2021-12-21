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
 */

export default class Level2 extends BaseScene {
    constructor() {
      let baseFant=[65,170];
      let basePers=[310, 170];
      let posIniFant=[65,140];
      let posIniPers=[60,70];
      let tilemap='tilemap02';
      
      let mirrorPos=[250,120,0];
      let candlePos=[300,120,50];
      let switchPos= null;
      let lampPos= null;
  
      let posBaseGhost=[80, 150];
      let posBaseHuman=[280, 150];
      let lightsInfo=[[125,0,60],[10,0,60],[230,0,60]];
      super(tilemap, lightsInfo,posIniFant,posIniPers,posBaseGhost,posBaseHuman,mirrorPos,candlePos,lampPos,switchPos,'level2','level3');
  }

  create() {
    
    //Objetos Fantasma(muebles/espejo)
    
    super.create();

    //CREACIÓN DEL RAYCAST
    this.raycaster = this.raycasterPlugin.createRaycaster();
    //objetos que reaccionan al raycast
    this.dynamicObstacles = [
       this.mirror, this.candle,this.ghostPlayer,this.humanPlayer,this.extraLayer
    ];

    this.raycaster.mapGameObjects(this.dynamicObstacles, true);

    this.window = new Window(this, 193, 35, 270);
  }
}