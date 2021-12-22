import BaseScene from './baseScene.js'
import Window from './window.js';

/**
 * @extends Phaser.Scene
 *  */

export default class Level4 extends BaseScene {
  //Cuarto nivel del juego
  constructor() {

    // Asignar posiciones
    let posIniFant = [330, 150];
    let posIniPers = [170, 230];
    let tilemap = 'tilemap04';

    let furniturePos = null;
    let mirrorPos = [
      [40, 230, 180]
    ];
    let candlePos = [65, 165, 50];
    let switchPos = [195, 80];
    let lampPos = [140, 145];

    let posBaseGhost = [330, 90];
    let posBaseHuman = [30, 165];
    let lightsInfo = [
      [90, 190, 70],
      [145, 10, 65]
    ];

    super(tilemap, lightsInfo, posIniFant, posIniPers, posBaseGhost, posBaseHuman, furniturePos, mirrorPos, candlePos, lampPos, switchPos, 'level4', 'level5');
  }

  create() {
    super.create();

    // Creacion de Raycast
    this.raycaster = this.raycasterPlugin.createRaycaster();
    // Objetos que reaccionan al raycast
    this.dynamicObstacles = [
      this.ghostPlayer, this.humanPlayer, this.extraLayer
    ];
    
    // Añadir todos los objetos de ghostList
    for (let i = 0; i < this.ghostList.length; i++){
      this.dynamicObstacles.push(this.ghostList[i])
    }

    this.raycaster.mapGameObjects(this.dynamicObstacles, true);



    // Creacion de Window
    this.window = new Window(this, 265, 55, 270);
  }

}