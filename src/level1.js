import Lights from './lights.js';
import BaseScene from './baseScene.js'

/**
 * @extends BaseScene
 */

export default class Level1 extends BaseScene {

  static TILE_SIZE = 16; //tamano de tiles de los tilemaps
  constructor() {
    let baseFant=[50,120];
    let basePers=[170, 150];
    let posIniFant=[180,200];
    let posIniPers=[180,40];
    let tilemap='tilemap01';
    let lampList=[];
    let ghostList=[];
    let humanList=[];
    let posBaseGhost=[120, 120];
    let posBaseHuman=[240, 150];
    let lightsInfo=[[75,0,50],[175,0,50],[170,75,50]];
    super(tilemap, lampList, lightsInfo, humanList, ghostList,posIniFant,posIniPers,posBaseGhost,posBaseHuman,"level1");
  }

  //Creacion de los elementos de la escena principal de juego
  
  create() {
    super.create();
  }
}