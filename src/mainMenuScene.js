/**
 * @extends Phaser.Scene
 */

export default class MainMenuScene extends Phaser.Scene {

  constructor() {
    super({
      key: 'mainMenu'
    });
  }

  create() {
    let textConfig = {
      width: 20,
      height: 20
    }
    const screenCenterX = this.cameras.main.worldView.x + this.cameras.main.width / 2;
    const screenCenterY = this.cameras.main.worldView.y + this.cameras.main.height / 2;
    this.loadingText = this.add.text(screenCenterX, screenCenterY, 'Start Game').setOrigin(0.5)
      .setInteractive();

    this.loadingText.on('pointerdown', function () {
      this.scene.scene.start('level');
    })

    this.add.sprite(screenCenterX - 80, screenCenterY, 'CursorSelector');
  }
}