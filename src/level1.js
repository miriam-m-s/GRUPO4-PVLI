import BaseScene from './baseScene.js'

/**
 * @extends BaseScene
 */

export default class Level1 extends BaseScene {

  constructor() {
    let baseFant=[50,120];
    let basePers=[170, 150];
    let posIniFant=[180,200];
    let posIniPers=[180,40];
    let tilemap='tilemap01';
    let posBaseGhost=[120, 120];
    let posBaseHuman=[240, 150];
    let lightsInfo=[[75,0,50],[175,0,50],[170,75,50]];

    let furniturePos=null;
    let mirrorPos= null
    let candlePos= null; 
    let switchPos= null;
    let lampPos= null;
    super(tilemap, lightsInfo,posIniFant,posIniPers,posBaseGhost,posBaseHuman,furniturePos,mirrorPos,candlePos,lampPos,switchPos,'level1','level2');
  }

  //Creacion de los elementos de la escena principal de juego
  create() {
    super.create();
  }
}