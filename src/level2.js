import BaseScene from './baseScene.js'
import Window from './window.js';
/**
 * @extends Phaser.Scene
 */

export default class Level2 extends BaseScene {
  constructor() {

    // Asignar posiciones
    let posIniFant = [65, 140];
    let posIniPers = [60, 80];
    let tilemap = 'tilemap02';

    let furniturePos = null;
    let mirrorPos = [
      [250, 150, 0]
    ];
    let candlePos = [280, 150, 50];
    let switchPos = null;
    let lampPos = null;

    let posBaseGhost = [80, 170];
    let posBaseHuman = [320, 150];
    let lightsInfo = [
      [125, 30, 50],
      [20, 30, 60],
      [210, 30, 50]
    ];
    super(tilemap, lightsInfo, posIniFant, posIniPers, posBaseGhost, posBaseHuman, furniturePos, mirrorPos, candlePos, lampPos, switchPos, 'level2', 'level3');
  }

  create() {

    super.create();

    //CREACIÓN DEL RAYCAST
    this.raycaster = this.raycasterPlugin.createRaycaster();
    //objetos que reaccionan al raycast
    this.dynamicObstacles = [
      this.ghostPlayer, this.humanPlayer, this.extraLayer
    ];

    // Añadir todos los objetos de ghostList
    for (let i = 0; i < this.ghostList.length; i++) {
      this.dynamicObstacles.push(this.ghostList[i])
    }


    this.raycaster.mapGameObjects(this.dynamicObstacles, true);
    this.window = new Window(this, 193, 35, 270);
  }
}