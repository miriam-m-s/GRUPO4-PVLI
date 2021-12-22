/**
 * @extends Phaser.Scene
 */

export default class GUI extends Phaser.Scene {


  constructor() {
    super({
      key: 'level'
    });
  }

  create() {
    var textConfig = {
      fontSize: '20px',
      color: '#ff0000',
      fontFamily: 'Arial'
    };
    this.add.text(game.config.width / 2, game.config.height / 2, textConfig, "SomeText", textConfig);
  }
}