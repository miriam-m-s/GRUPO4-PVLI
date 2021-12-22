import BaseScene from './baseScene.js'

/**
 * @extends BaseScene
 */

export default class Level1 extends BaseScene {
  //Primer nivel del juego
  constructor() {

      // Asignar posiciones
    let posIniFant=[180,200];
    let posIniPers=[120,60];
    let tilemap='tilemap01';
    let posBaseGhost=[120, 120];
    let posBaseHuman=[240, 150];
    let lightsInfo=[[75,0,50],[140,20,50],[170,75,50]];

    let furniturePos=null;
    let mirrorPos= null
    let candlePos= null; 
    let switchPos= null;
    let lampPos= null;
    super(tilemap, lightsInfo,posIniFant,posIniPers,posBaseGhost,posBaseHuman,furniturePos,mirrorPos,candlePos,lampPos,switchPos,'level1','level2');
  }

  create() {
    super.create();
  }
}